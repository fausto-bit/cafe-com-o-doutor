// Vocabulário fechado de temas do Café com o Doutor.
// Cada artigo leva de 3 a 6 destas tags (campo `tags` no frontmatter).
// Para criar um tema novo, acrescente aqui; o schema e as páginas /temas/* acompanham.

export interface Tema {
  rotulo: string;
  frase: string;
}

export const TEMAS = {
  quedas: { rotulo: 'Quedas', frase: 'Artigos sobre como entender e prevenir as quedas na velhice.' },
  equilíbrio: { rotulo: 'Equilíbrio', frase: 'Artigos sobre equilíbrio, firmeza ao andar e segurança para se movimentar.' },
  força: { rotulo: 'Força muscular', frase: 'Artigos sobre manter e recuperar a força dos músculos com o passar dos anos.' },
  sarcopenia: { rotulo: 'Sarcopenia', frase: 'Artigos sobre a perda de massa e de força dos músculos que vem com a idade.' },
  fragilidade: { rotulo: 'Fragilidade', frase: 'Artigos sobre fragilidade na velhice: como reconhecer e como se antecipar.' },
  exercício: { rotulo: 'Exercício', frase: 'Artigos sobre atividade física e exercícios para quem envelhece.' },
  osteoporose: { rotulo: 'Ossos e osteoporose', frase: 'Artigos sobre a saúde dos ossos e a osteoporose.' },
  memória: { rotulo: 'Memória', frase: 'Artigos sobre memória, esquecimentos e saúde do cérebro.' },
  demência: { rotulo: 'Demência', frase: 'Artigos sobre demência, incluindo o Alzheimer, para quem vive com a doença e para quem cuida.' },
  delirium: { rotulo: 'Confusão aguda (delirium)', frase: 'Artigos sobre a confusão de início recente no idoso, o delirium, e como a família pode ajudar.' },
  sono: { rotulo: 'Sono', frase: 'Artigos sobre o sono e a sua relação com a saúde ao envelhecer.' },
  alimentação: { rotulo: 'Alimentação', frase: 'Artigos sobre o que, quando e como comer ao longo da vida.' },
  nutrição: { rotulo: 'Nutrição', frase: 'Artigos sobre nutrientes, proteína e o que o corpo precisa para se manter forte.' },
  disfagia: { rotulo: 'Engasgo e dificuldade de engolir', frase: 'Artigos sobre dificuldade para engolir e engasgos, e como tornar a refeição mais segura.' },
  constipação: { rotulo: 'Intestino e constipação', frase: 'Artigos sobre prisão de ventre, laxantes e o funcionamento do intestino na pessoa idosa.' },
  pele: { rotulo: 'Pele', frase: 'Artigos sobre os cuidados com a pele de quem envelhece.' },
  medicamentos: { rotulo: 'Medicamentos', frase: 'Artigos sobre o uso seguro de medicamentos na velhice.' },
  polifarmácia: { rotulo: 'Muitos remédios', frase: 'Artigos sobre o uso de muitos remédios ao mesmo tempo e quando vale revisá-los.' },
  prescrição: { rotulo: 'Prescrição e receita', frase: 'Artigos sobre receitas, prescrições e como acompanhar as mudanças.' },
  internação: { rotulo: 'Internação e hospital', frase: 'Artigos sobre preparar e acompanhar uma internação.' },
  altaHospitalar: { rotulo: 'Alta do hospital', frase: 'Artigos sobre o que perguntar e organizar na alta e na volta para casa.' },
  acompanhante: { rotulo: 'Acompanhante', frase: 'Artigos sobre o papel de quem acompanha a pessoa idosa, em casa, na consulta ou no hospital.' },
  emergência: { rotulo: 'Emergência', frase: 'Artigos sobre situações que pedem atendimento de urgência.' },
  sinaisDeAlerta: { rotulo: 'Sinais de alerta', frase: 'Artigos sobre sinais que a família deve reconhecer e não deixar para depois.' },
  cuidador: { rotulo: 'Cuidador', frase: 'Artigos para quem cuida de uma pessoa idosa, e sobre cuidar de quem cuida.' },
  longevidade: { rotulo: 'Longevidade', frase: 'Artigos sobre viver mais e viver bem.' },
  envelhecimento: { rotulo: 'Envelhecer bem', frase: 'Artigos sobre o que significa envelhecer bem.' },
  prevenção: { rotulo: 'Prevenção', frase: 'Artigos sobre o que dá para fazer antes que o problema apareça.' },
  funcionalidade: { rotulo: 'Autonomia e funcionalidade', frase: 'Artigos sobre manter a autonomia e a capacidade de fazer as coisas do dia a dia.' },
  consulta: { rotulo: 'Consulta geriátrica', frase: 'Artigos sobre a consulta com o geriatra e como aproveitá-la.' },
} as const satisfies Record<string, Tema>;

export type TagKey = keyof typeof TEMAS;
export const TAG_KEYS = Object.keys(TEMAS) as [TagKey, ...TagKey[]];

// altaHospitalar -> alta-hospitalar; emergência -> emergencia; força -> forca
export function slugTema(tag: string): string {
  return tag
    .replace(/([a-zà-ú])([A-Z])/g, '$1-$2')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Temas em uso (com contagem), mais frequentes primeiro, desempate alfabético pelo rótulo.
export function temasEmUso(artigos: { data: { tags?: string[] } }[]) {
  const contagem = new Map<TagKey, number>();
  for (const a of artigos) {
    for (const t of (a.data.tags ?? []) as TagKey[]) {
      contagem.set(t, (contagem.get(t) ?? 0) + 1);
    }
  }
  return [...contagem.entries()]
    .map(([tag, n]) => ({ tag, n, ...TEMAS[tag], slug: slugTema(tag) }))
    .sort((a, b) => b.n - a.n || a.rotulo.localeCompare(b.rotulo, 'pt-BR'));
}
