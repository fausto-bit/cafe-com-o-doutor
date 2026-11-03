// Regras da busca interna, compartilhadas entre a página /busca/ e os testes.
// Não importa nada: roda no navegador e no Node.

export interface Sinonimo {
  dizem: string[];
  procurar: string[];
}

export const STOP = new Set(
  'a o as os um uma uns umas de do da dos das em no na nos nas por para com sem e ou que se ao aos como mais mas ja eu me meu minha seu sua ele ela eles elas isso esse essa este esta ser ter foi sao tem'.split(
    ' ',
  ),
);

// minúsculas e sem acento
export function normaliza(s: string): string {
  return s
    .replace(/ç/gi, 'ss')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

// "Fonetiza": aproxima palavras que soam iguais mas se escrevem diferente
// (demencia/demensia, osteoporose/osteoporoze, exame/ezame, hospital/ospital).
// Aplicada igual no índice e na pergunta, então o que importa é ser consistente.
export function fonetiza(palavra: string): string {
  return normaliza(palavra)
    .replace(/ph/g, 'f')
    .replace(/ch/g, 'x')
    .replace(/(?<![ln])h/g, '')
    .replace(/^ex(?=[aeiou])/, 'ez')
    .replace(/sc(?=[ei])/g, 's')
    .replace(/c(?=[ei])/g, 's')
    .replace(/g(?=[ei])/g, 'j')
    .replace(/[zç]/g, 's')
    .replace(/y/g, 'i')
    .replace(/w/g, 'v')
    .replace(/([a-z])\1+/g, '$1');
}

// Quantos erros de letra perdoar, conforme o tamanho da palavra.
export const tolerancia = (termo: string) => (termo.length <= 3 ? 0 : termo.length <= 5 ? 1 : 2);

function distancia(a: string, b: string): number {
  if (a === b) return 0;
  const m = a.length;
  const n = b.length;
  let anterior = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const atual = [i];
    for (let j = 1; j <= n; j++) {
      atual[j] = Math.min(
        anterior[j] + 1,
        atual[j - 1] + 1,
        anterior[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    anterior = atual;
  }
  return anterior[n];
}

type Consulta =
  | string
  | { combineWith: 'AND' | 'OR'; queries: Consulta[]; fuzzy?: false; prefix?: (termo: string) => boolean };

interface Gatilho {
  palavras: string[]; // já fonetizadas
  procurar: string[];
}

export function prepararGatilhos(lista: Sinonimo[]): Gatilho[] {
  const gatilhos: Gatilho[] = [];
  for (const { dizem, procurar } of lista) {
    for (const d of dizem) {
      const palavras = d.split(/\s+/).map(fonetiza).filter(Boolean);
      if (palavras.length) gatilhos.push({ palavras, procurar });
    }
  }
  // frases mais longas primeiro, para "pressão alta" vencer "pressão"
  return gatilhos.sort((a, b) => b.palavras.length - a.palavras.length);
}

function bate(token: string, alvo: string, digitando: boolean): boolean {
  if (token === alvo) return true;
  if (digitando && token.length >= 4 && alvo.startsWith(token)) return true;
  return alvo.length >= 4 && distancia(token, alvo) <= tolerancia(alvo);
}

// Transforma o que a pessoa digitou numa consulta para o MiniSearch.
// Palavras que casam com o dicionário viram um "ou": a palavra dela OU os termos dos artigos.
export function montarConsulta(texto: string, gatilhos: Gatilho[], combinar: 'AND' | 'OR'): Consulta | null {
  const originais = texto
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean)
    .map((o) => ({ original: o, plana: normaliza(o), chave: fonetiza(o) }));
  const usadas = new Array(originais.length).fill(false);
  const partes: Consulta[] = [];

  for (const g of gatilhos) {
    const n = g.palavras.length;
    for (let i = 0; i + n <= originais.length; i++) {
      if (usadas.slice(i, i + n).some(Boolean)) continue;
      const ultima = i + n === originais.length;
      if (g.palavras.every((p, k) => bate(originais[i + k].chave, p, ultima && k === n - 1))) {
        for (let k = 0; k < n; k++) usadas[i + k] = true;
        // Termos do dicionário são exatos (sem erro de letra, só variações como plural).
        const alternativas: Consulta[] = [
          { combineWith: 'OR', queries: [...g.procurar], fuzzy: false, prefix: (t) => t.length >= 5 },
        ];
        if (n === 1) alternativas.push(originais[i].original);
        partes.push({ combineWith: 'OR', queries: alternativas });
      }
    }
  }

  originais.forEach((o, i) => {
    if (!usadas[i] && !STOP.has(o.plana)) partes.push(o.original);
  });

  if (partes.length === 0) return null;
  return { combineWith: combinar, queries: partes };
}

// Descarta o rabo da lista: resultados muito mais fracos que o melhor só atrapalham.
export function semCauda<T extends { score: number }>(achados: T[]): T[] {
  if (achados.length === 0) return achados;
  const corte = achados[0].score * 0.2;
  return achados.filter((a) => a.score >= corte);
}
