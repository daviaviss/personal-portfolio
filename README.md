# daviaviss — Portfolio

Portfólio pessoal desenvolvido com Next.js 14, apresentando experiências, educação, habilidades, blog e formas de contato.

## Funcionalidades

- **PT/EN** — alternância de idioma via dock
- **Dark/Light mode** — tema alternável com persistência
- **Blog dinâmico** — posts em markdown hospedados no GitHub, com suporte a PT/EN
- **Syntax highlighting** — blocos de código com tema Nord e botão de copiar
- **Dock de navegação** — links para redes sociais, tema e idioma
- **Animações** — fade-in nas seções, cursor customizado e glow interativo com Framer Motion
- **Design responsivo** — adaptado para mobile e desktop

## Tecnologias

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) + [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)
- [Framer Motion](https://www.framer.com/motion/)
- [Radix UI](https://www.radix-ui.com/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [react-markdown](https://github.com/remarkjs/react-markdown) + [remark-gfm](https://github.com/remarkjs/remark-gfm)
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
- [gray-matter](https://github.com/jonschlinkert/gray-matter)

## Rodando localmente

```bash
git clone https://github.com/daviaviss/personal-portfolio.git
cd personal-portfolio
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Estrutura

```
├── app/
│   ├── layout.tsx              # Layout raiz e metadados
│   ├── page.tsx                # Página principal
│   ├── providers.tsx           # Providers de tema e idioma
│   └── blog/[slug]/page.tsx    # Página de leitura de post
├── components/
│   ├── Intro.tsx               # Apresentação
│   ├── WorkExperience.tsx      # Experiências profissionais
│   ├── Education.tsx           # Formação acadêmica
│   ├── Skills.tsx              # Habilidades técnicas
│   ├── Blog.tsx                # Listagem de posts do blog
│   ├── ContactMe.tsx           # Seção de contato
│   ├── FadeIn.tsx              # Wrapper de animação de entrada
│   ├── CustomDock.tsx          # Dock de navegação
│   ├── CustomCursor.tsx        # Cursor customizado
│   ├── MouseGlow.tsx           # Glow interativo que segue o mouse
│   └── magicui/dock.tsx        # Componente base do dock com magnify
└── context/
    └── LanguageContext.tsx     # Context de idioma (PT/EN)
```

## Blog

Os posts são arquivos Markdown hospedados no repositório público [daviaviss/blog-posts](https://github.com/daviaviss/blog-posts). Cada post suporta versão PT (`slug.md`) e EN (`slug.en.md`).

Frontmatter esperado:

```md
---
title: Título do post
description: Descrição curta
date: 2024-01-01
tags: [tag1, tag2]
---
```

## Contato

- **WhatsApp:** [+55 48 98461-6370](https://wa.me/5548984616370)
- **Email:** [daviaugustovissotto@gmail.com](mailto:daviaugustovissotto@gmail.com)
- **LinkedIn:** [linkedin.com/in/daviaviss](https://www.linkedin.com/in/daviaviss/)
- **Instagram:** [@daviaviss](https://www.instagram.com/daviaviss)
- **GitHub:** [github.com/daviaviss](https://github.com/daviaviss)
