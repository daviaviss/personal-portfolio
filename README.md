# daviaviss.com

Personal portfolio with bilingual support, scroll animations, a custom cursor, interactive background, and a command palette — built with Next.js 16 and TypeScript.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + CSS Custom Properties |
| Content | Markdown via GitHub API + `gray-matter` |
| Fonts | Instrument Serif · IBM Plex Mono · IBM Plex Sans |
| Deploy | Vercel |

---

## Features

- **Bilingual** — Portuguese / English with `localStorage` persistence
- **Dark & light mode** — full design token system via CSS variables
- **Scroll animations** — `IntersectionObserver`-based reveal + timeline progress
- **Text scramble** — character-by-character animated reveal on section titles
- **Command palette** — `Cmd+K` keyboard-driven navigation
- **Custom cursor** — warm-toned SVG cursor (desktop only)
- **Animated background** — interactive grid sparks synced with scroll
- **Blog** — posts fetched from [`daviaviss/blog-posts`](https://github.com/daviaviss/blog-posts) with syntax highlighting

---

## Project Structure

```
├── app/
│   ├── page.tsx              # Home (all sections)
│   ├── layout.tsx            # Root layout + metadata
│   ├── globals.css           # Design tokens & global styles
│   └── blog/[slug]/          # Dynamic blog post pages
├── components/
│   ├── sections/             # Hero, About, Experience, Blog, Contact
│   ├── nav/                  # Navigation bar
│   └── ui/                   # Button, CommandPalette, Cursor, StatusLine, Divider
├── hooks/
│   ├── useLang.tsx           # Language context
│   ├── useScrollReveal.ts    # Scroll-triggered animations
│   ├── useTextScramble.ts    # Text scramble effect
│   └── useIsMobile.ts        # Viewport detection
└── public/assets/            # Images, video, icons
```

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

```bash
npm run dev      # Development server with Turbopack
npm run build    # Production build
npm run start    # Start production server
```

---

## Design System

All visual tokens live in `app/globals.css` as CSS custom properties:

- **Colors** — semantic tokens for both dark and light modes (espresso scale, sienna accent, cream neutrals)
- **Typography** — fluid scale from `11px` (micro) to `220px` (display) using `clamp()`
- **Spacing** — 4px base unit, 4px → 128px scale
- **Motion** — easing functions (`ease-out`, `spring`, `pop`) and durations (140ms → 700ms)

---

Made by [Davi Augusto Vissotto](https://github.com/daviaviss)
