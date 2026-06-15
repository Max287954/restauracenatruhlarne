# Restaurace Na Truhlárně

Klasická lokální restaurace s kvalitním jídlem v Habartově.

**Majitel:** Jaroslav Šindelář

## O projektu

Webová prezentace restaurace postavená na frameworku [Astro](https://astro.build) s využitím Tailwind CSS. Statický web generovaný jako SSG, připravený pro nasazení na Cloudflare Pages.

## Rychlý start

```bash
# Instalace závislostí
pnpm install

# Vývojový server
pnpm dev

# Produkční build
pnpm build

# Náhled buildu
pnpm preview
```

## Struktura projektu

```
├── public/              # Statické soubory (fonty, obrázky, _headers, CMS)
│   ├── admin/           # Decap CMS administrace
│   └── fonts/           # Fonty (Playfair Display, Inter)
├── scripts/             # Pomocné skripty
├── src/
│   ├── components/      # Astro komponenty (Layout, Nav, Footer, SEO)
│   ├── content/         # Markdown kolekce (denní menu, jídelní lístek)
│   ├── data/            # Globální konfigurace webu
│   ├── pages/           # Stránky webu
│   └── styles/          # Globální CSS (Tailwind)
├── astro.config.mjs     # Konfigurace Astro
├── tsconfig.json        # TypeScript konfigurace
├── eslint.config.js     # ESLint pravidla
└── prettier.config.js   # Prettier formátování
```

## Technologie

- **Framework:** Astro 5 (SSG)
- **Styling:** Tailwind CSS
- **Jazyk:** TypeScript (strict)
- **CMS:** Decap CMS
- **Fonty:** Playfair Display (nadpisy), Inter (text)
- **Package manager:** pnpm

## Nasazení

Projekt je připraven pro nasazení na Cloudflare Pages:

1. Připojte GitHub repozitář k Cloudflare Pages
2. Build command: `pnpm run build`
3. Build output: `dist`
4. Framework preset: Astro

## CMS administrace

Decap CMS je dostupný na `/admin/`. Konfigurace je v `public/admin/config.yml`.

## Licence

Všechna práva vyhrazena — Restaurace Na Truhlárně, Jaroslav Šindelář.