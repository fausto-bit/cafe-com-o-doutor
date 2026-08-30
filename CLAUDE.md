# cafecomodoutor.com.br — Brief do site

Este arquivo reúne tudo o que foi decidido sobre o blog "Café com o Doutor". Serve como fonte única de verdade para o Claude Code construir o site. **O conteúdo dos artigos (texto, imagens, citações) já está pronto — não reescrever nem editar sem pedido explícito do Dr. Fausto.**

## Identidade

- **Nome:** Café com o Doutor
- **Domínio:** cafecomodoutor.com.br (já registrado)
- **Hospedagem:** Vercel
- **E-mail no domínio:** não precisa
- **Relação com o Substack:** tudo que for publicado no Substack passa primeiro por este site — o site é o "hub" onde os ensaios nascem; o Substack é a distribuição por e-mail, secundária.
- **Relação com drfaustoazambuja.com.br:** site irmão, mas com identidade visual deliberadamente diferente (ver seção Design). Os dois se linkam mutuamente no rodapé.
- **Logo:** arquivo `public/img/logo.jpg` — ícone de linha (rosto/xícara com sorriso vermelho + estetoscópio) + wordmark "Café com o Doutor" (com "o doutor" em coral).

## Stack técnica: Astro

Decidido migrar de HTML estático solto para **Astro**, porque a intenção é publicar muitos artigos ao longo do tempo. Motivo: hoje cada artigo é um HTML completo com o CSS inteiro duplicado dentro — funciona para 2-3 artigos de demonstração, mas não escala. Com Astro:

- O design (nav, header, footer, cores, tipografia) fica definido **uma única vez**, em um layout.
- Cada artigo novo é só um arquivo de conteúdo (Markdown + frontmatter) — sem repetir HTML/CSS.
- A Home lista os artigos **sozinha**, varrendo a pasta de conteúdo — não se edita a Home manualmente a cada publicação.
- Gera HTML/CSS estático no build, continua compatível com a Vercel do jeito que já está configurada.

### Estrutura de pastas esperada

```
cafe-com-o-doutor/
├── src/
│   ├── layouts/
│   │   └── ArtigoLayout.astro      ← nav, header do artigo, footer, CSS global
│   ├── pages/
│   │   └── index.astro             ← Home ("hoje no cardápio")
│   └── content/
│       ├── config.ts               ← schema da coleção "artigos" (ver abaixo)
│       └── artigos/
│           ├── contra-geras.md
│           ├── alimentacao-demencia.md
│           └── faxina-noturna-cerebro.md
├── public/
│   └── img/                        ← logo + todas as ilustrações dos artigos
└── astro.config.mjs
```

**Os 3 arquivos de conteúdo e todas as imagens já estão prontos** (ver seção "Conteúdo pronto para migrar" abaixo) — a tarefa do Claude Code é criar o projeto Astro, o layout, a Home, e importar esse conteúdo já existente, não reescrevê-lo.

### Schema de conteúdo sugerido (`src/content/config.ts`)

Cada artigo em Markdown usa este frontmatter:

```yaml
---
titulo: string
categoria: string        # ex.: "Longevidade", "Família", "Cérebro" — usado como tag/pílula
tempo_leitura: string    # ex.: "12 min"
autor: string            # sempre "Dr. Fausto Azambuja"
data: string             # data de publicação — definir na hora de publicar cada um
imagem_capa: string      # caminho da imagem de capa, ex.: "/img/img-geras-ampulheta.png"
fonte: string            # opcional — referências/bibliografia, quando houver
---
```

O corpo do Markdown usa:
- `##` para os subtítulos de seção
- `>` para citações em destaque (blockquote) — inclusive as caixas de alerta de segurança usam blockquote com **negrito** no início (ex.: `> **Alerta:** ...`); o layout deve estilizar blockquotes que começam com "**Alerta" com um fundo levemente diferente (caixa), e os demais como citação itálica normal com borda coral à esquerda
- `![alt](/img/arquivo.png)` seguido de uma linha em itálico como legenda, para as ilustrações
- Uma seção final `## ☕ Um café com o doutor` — sempre a última seção de todo artigo, funciona como assinatura/fechamento; o layout deve estilizar essa seção com um destaque visual (fundo levemente diferente, como um bloco de encerramento)

## Design

### Paleta
- `--ink: #241713` (tinta, texto principal)
- `--paper: #F6ECDD` (fundo)
- `--card: #FFFBF3` (fundo de cards/caixas)
- `--coral: #E64A34` (acento único — nunca usar em texto corrido, só em detalhes)
- `--coral-deep: #C43A26`
- `--clay: #8C6A52` (texto secundário, legendas, metadados)
- `--line: rgba(36,23,19,0.14)` (bordas, divisores)

Paleta deliberadamente diferente do drfaustoazambuja.com.br (pedra/nogueira) e do Cognisa (verde-azulado/dourado/marfim) — **não misturar as três identidades**.

### Tipografia
- **Fraunces** (serifada, itálico para destaque) — títulos, wordmark, citações
- **Karla** — corpo de texto, navegação, UI

### Elementos de assinatura visual
- **Divisor de vapor**: SVG animado (duas linhas onduladas em coral, `stroke-dasharray` com animação sutil de "waft") usado uma vez, logo abaixo do título de cada artigo. Não repetir dentro do corpo do texto.
- **Botões**: sempre pill (border-radius: 100px) — diferente do drfaustoazambuja.com.br, que usa cantos retos.
- **Tags de categoria**: pequena pílula com borda, uppercase, mono-ish, cor `--clay`.

### Componentes já validados (replicar no layout Astro)
- Nav fixa (sticky) com logo + wordmark + links (Ensaios, Sobre, Assinar) + CTA "Assinar"
- Cabeçalho de artigo: tag de categoria, título (Fraunces itálico), meta (autor · tempo de leitura)
- Corpo do artigo: parágrafo de abertura (`lede`) em itálico maior, `h2` com borda tracejada acima, blockquotes com borda coral à esquerda, caixas de alerta (`.alert`) com fundo card
- Figuras: imagem com `border-radius`, legenda em itálico centralizada abaixo
- Bloco de assinatura final (`.signature`): fundo card, borda, sem borda superior no h2 interno
- Faixa de assinatura do Substack antes do rodapé: título curto + descrição + botão "Assinar no Substack"
- Rodapé: logo + wordmark, links (drfaustoazambuja.com.br, WhatsApp, Instagram), nota de rodapé

## Home — "Hoje no cardápio"

A Home usa metáfora de cardápio, não lista genérica de posts:
- Hero: eyebrow ("um blog de bolso sobre envelhecer bem"), headline grande, subtexto, CTAs ("Ler o último ensaio" / "Sobre este espaço")
- Divisor de vapor
- Seção "Hoje no cardápio": cada artigo como um item de menu — título, descrição curta, tag de categoria, "tempo de leitura" no lugar de preço — **gerada automaticamente a partir da coleção de conteúdo**, ordenada por data (mais recente primeiro)
- Bloco "Sobre" (bio curta do Dr. Fausto)
- Faixa de assinatura do Substack
- Rodapé

## Conteúdo pronto para migrar

Três artigos já escritos, revisados e aprovados, com imagens já geradas e aprovadas. Estão em `src/content/artigos/` neste pacote, prontos para uso:

1. **Contra Geras: por que envelhecer bem é mais do que tratar doenças** (`contra-geras.md`) — categoria Longevidade, 12 min. Ensaio reflexivo sobre o Congresso Mineiro de Geriatria, a etimologia de "Geras" na mitologia grega, e a ideia de "Presbiatria".
2. **Comer com quem se ama: um guia prático para a hora da refeição na demência** (`alimentacao-demencia.md`) — categoria Família, 10 min. Guia prático para cuidadores, adaptado de um documento técnico (ESPEN/AGS) para linguagem cotidiana. Contém 2 caixas de alerta de segurança (engasgo, textura de alimentos) que devem manter destaque visual.
3. **Enquanto você dorme, o cérebro faz a faxina** (`faxina-noturna-cerebro.md`) — categoria Cérebro, 8 min. Ensaio sobre o sistema glinfático e sono profundo, com dicas práticas de higiene do sono.

Todas as imagens referenciadas nesses arquivos já estão em `public/img/`.

## O que evitar

- Não reescrever o texto dos 3 artigos — eles já foram revisados e aprovados pelo Dr. Fausto.
- Não usar a paleta ou tipografia do Cognisa nem do drfaustoazambuja.com.br neste site.
- Não usar botões de canto reto (isso é do drfaustoazambuja.com.br) — aqui é sempre pill.
- Não adicionar depoimentos, estatísticas ou dados que não vieram do Dr. Fausto.
