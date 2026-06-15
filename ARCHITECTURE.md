# Architektura — Restaurace Na Truhlárně

## Přehled

Tento dokument popisuje technickou architekturu webové prezentace Restaurace Na Truhlárně. Web je postaven jako staticky generovaný (SSG) pomocí frameworku Astro 5 s nasazením na Cloudflare Pages.

## Technologický stack

| Vrstva          | Technologie  | Verze  |
| --------------- | ------------ | ------ |
| Framework       | Astro        | 5.x    |
| Styling         | Tailwind CSS | 4.x    |
| TypeScript      | Strict mode  | 5.7    |
| CMS             | Decap CMS    | 3.x    |
| Správce balíčků | pnpm         | 9+     |
| Runtime         | Node.js      | 20 LTS |

## Adresářová struktura

```
.
├── public/
│   ├── _headers              # Cloudflare Pages hlavičky (CSP, HSTS, atd.)
│   ├── admin/
│   │   ├── config.yml        # Decap CMS konfigurace
│   │   └── index.html        # Decap CMS vstupní bod
│   ├── favicon.svg            # Favicon
│   └── fonts/                 # SIL OFL fonty (Playfair Display, Inter)
├── scripts/
│   └── pre-launch-check.sh   # Před-spouštěcí validační skript
├── src/
│   ├── components/
│   │   ├── BaseHead.astro    # <head> — SEO, fonty, JSON-LD
│   │   ├── Footer.astro      # Patička s právními údaji
│   │   ├── Layout.astro      # Hlavní layout — skeleton HTML
│   │   └── Nav.astro         # Navigace — sticky, responzivní, aria
│   ├── content/
│   │   ├── config.ts         # Astro Content kolekce schémata
│   │   ├── daily-menu/       # Denní menu (Markdown + frontmatter)
│   │   └── menu/             # Jídelní lístek (Markdown + frontmatter)
│   ├── data/
│   │   └── profile.ts        # Centrální konfigurace webu
│   ├── pages/
│   │   ├── 404.astro         # Chybová stránka
│   │   ├── denni-menu.astro  # Denní menu — výpis z kolekce
│   │   ├── index.astro       # Homepage
│   │   ├── jidelnistek.astro # Jídelní lístek — výpis z kolekce
│   │   └── zasady-ochrany-osobnich-udaju.astro  # GDPR
│   └── styles/
│       └── global.css        # Tailwind + vlastní design systém
├── astro.config.mjs          # Astro konfigurace
├── eslint.config.js          # ESLint (flat config)
├── netlify.toml              # Netlify deployment
├── package.json              # Závislosti a skripty
├── prettier.config.js        # Prettier konfigurace
├── tsconfig.json             # TypeScript strict config
└── vercel.json               # Vercel deployment
```

## Datový tok

```
┌──────────────┐     ┌─────────────────┐     ┌──────────────┐
│ Markdown     │────▶│ Astro Content   │────▶│ Astro Pages  │
│ (CMS/edit)   │     │ Collection API  │     │ (.astro)     │
└──────────────┘     └─────────────────┘     └──────┬───────┘
                                                    │
┌──────────────┐     ┌─────────────────┐            │
│ profile.ts   │────▶│ Komponenty      │◀───────────┘
│ (konfigurace)│     │ (Layout, Nav)   │
└──────────────┘     └────────┬────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │ Statický HTML   │
                     │ (dist/)         │
                     └─────────────────┘
```

## Klíčové komponenty

### BaseHead

Injektuje do `<head>`:

- Meta tagy (title, description, canonical, OG, Twitter Card)
- Font preload
- JSON-LD strukturovaná data (LocalBusiness)
- CSP hlavičky (via \_headers na úrovni serveru)

### Nav

- Sticky navigace s `aria-expanded`, `aria-controls` pro přístupný mobile hamburger
- Escape key handler pro zavření menu
- Deklarativní `aria-[current]` pro zvýraznění aktivní stránky

### Footer

- Otevírací doba, kontakt, adresa
- Povinný právní blok (IČO, DIČ, registrovaná adresa)
- Odkaz na Zásady ochrany osobních údajů

### Layout

- Skeleton HTML5 s `lang="cs"`, skip-to-content link
- Obalení `<Nav />`, `<slot />`, `<Footer />`

## Design systém

- **Pozadí:** Off-white/cream (`#faf9f6`) — nikdy čistě bílá
- **Akcenty:** Terracotta (`#c67a4a`) pro tlačítka a CTA
- **Text:** Warm brown (`#5c3d2e`)
- **Sekundární:** Olive (`#7d8a5e`) pro subtilní prvky
- **Písmo:** Playfair Display (nadpisy), Inter (text)
- **Organické tvary:** CSS radiální gradienty jako SVG blob pozadí

## CMS

Decap CMS na `/admin/` umožňuje správu:

1. **Denní menu** — datum, polévka, hlavní jídla s cenami a alergeny
2. **Jídelní lístek** — kategorie, název, popis, cena, alergeny, pořadí

## Bezpečnost

- CSP hlavičky: `default-src 'self'` s explicitními výjimkami
- HSTS: `max-age=31536000; includeSubDomains; preload`
- X-Frame-Options: `DENY`
- X-Content-Type-Options: `nosniff`
- COOP/CORP: `same-origin`
- Žádné cookies, žádná analytika, žádné formuláře

## Nasazení

```
Git Push → Cloudflare Pages → pnpm run build → dist/
```

Build výstup: `dist/` složka se statickými HTML, CSS, JS a asset soubory.

## Konvence

- **Kód:** TypeScript strict, ESLint + Prettier, tabs=2 spaces
- **Commity:** `[type]: description` (např. `feat: add daily menu page`)
- **Pre-commit:** husky + lint-staged (ESLint + Prettier)
- **CSS:** Tailwind utility-first, vlastní komponenty v `@layer components`
