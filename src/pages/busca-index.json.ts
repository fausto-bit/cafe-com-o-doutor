import { getCollection } from 'astro:content';
import { TEMAS, type TagKey } from '../data/tags';

// Índice da busca interna: um registro por artigo, lido pelo navegador em /busca/.
// Gerado no build, então artigo novo entra sozinho.

function textoPuro(md: string): string {
  return md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`|~-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function GET() {
  const artigos = await getCollection('artigos');
  const indice = artigos.map((a) => ({
    id: a.id,
    titulo: a.data.titulo,
    subtitulo: a.data.subtitulo ?? '',
    categoria: a.data.categoria,
    tempo: a.data.tempo_leitura,
    data: a.data.data ?? '',
    descricao: a.data.descricao ?? a.data.resumo ?? '',
    temas: (a.data.tags ?? []).map((t) => TEMAS[t as TagKey]?.rotulo ?? t).join(' '),
    corpo: textoPuro(a.body ?? ''),
  }));
  return new Response(JSON.stringify(indice), {
    headers: { 'Content-Type': 'application/json' },
  });
}
