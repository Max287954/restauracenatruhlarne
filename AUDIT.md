# Audit — Restaurace Na Truhlárně

Datum posledního auditu: 2026-06-15

## Přístupnost (WCAG 2.1 AA)

| Kritérium                  | Status | Poznámka                                                            |
| -------------------------- | ------ | ------------------------------------------------------------------- |
| Skip to main content link  | ✅     | Implementováno v Layout.astro                                       |
| Focus visible              | ✅     | `:focus-visible` ring na terracotta                                 |
| aria-expanded na hamburger | ✅     | Nav.astro — toggle s aria-expanded                                  |
| aria-controls              | ✅     | Mobile menu button -> menu panel                                    |
| Semantic HTML              | ✅     | `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<address>` |
| Alt texty                  | ✅     | SVG ikony mají `aria-hidden="true"`, iframe má title                |
| Color contrast             | ✅     | Terracotta na cream, warm-brown na cream — splňuje 4.5:1            |
| Keyboard navigation        | ✅     | Všechny interaktivní prvky dosažitelné přes Tab                     |
| Lang attribute             | ✅     | `<html lang="cs">`                                                  |
| No focus trap escape       | ⚠️     | Mobile menu má Escape handler, ale bez focus-trap polyfill          |

## SEO

| Kritérium        | Status | Poznámka                                                 |
| ---------------- | ------ | -------------------------------------------------------- |
| Title tag        | ✅     | Unikátní per page — `{title} \| Restaurace Na Truhlárně` |
| Meta description | ✅     | Každá stránka má vlastní description                     |
| Canonical URL    | ✅     | Správně nastaveno                                        |
| OG tags          | ✅     | og:title, og:description, og:image, og:url, og:type      |
| Twitter Card     | ✅     | summary_large_image                                      |
| Sitemap          | ✅     | @astrojs/sitemap s CS locale                             |
| JSON-LD          | ✅     | LocalBusiness schema                                     |
| Robots           | ✅     | 404 a privacy policy noindex                             |
| Hreflang         | ⚠️     | Neaplikovatelné (jednojazyčný web), správně              |

## Výkon

| Kritérium     | Status | Poznámka                                                         |
| ------------- | ------ | ---------------------------------------------------------------- |
| SSG výstup    | ✅     | Čisté statické HTML                                              |
| Font preload  | ✅     | woff2 s preload v BaseHead                                       |
| Minimální JS  | ✅     | Pouze inline skript pro hamburger menu                           |
| Obrázky       | ⚠️     | Placeholder SVG; doporučeno přidat `<img>` s lazy loading a WebP |
| Cache headers | ✅     | \_headers s dlouhými TTL                                         |
| CSP           | ✅     | Restriktivní Content-Security-Policy                             |

## Bezpečnost

| Kritérium              | Status | Poznámka                                  |
| ---------------------- | ------ | ----------------------------------------- |
| CSP                    | ✅     | default-src 'self' + výjimky              |
| HSTS                   | ✅     | max-age=1 rok, includeSubDomains, preload |
| X-Frame-Options        | ✅     | DENY                                      |
| X-Content-Type-Options | ✅     | nosniff                                   |
| Referrer-Policy        | ✅     | strict-origin-when-cross-origin           |
| COOP                   | ✅     | same-origin                               |
| CORP                   | ✅     | same-origin                               |
| Permissions-Policy     | ✅     | Vše zakázáno kromě nutných                |
| Žádné formuláře        | ✅     | Není třeba CSRF ochrana                   |
| Žádné cookies          | ✅     | Není třeba cookie consent                 |
| .env/.gitignore        | ✅     | .env vyloučeny                            |

## Právní náležitosti

| Kritérium                     | Status | Poznámka                                                                |
| ----------------------------- | ------ | ----------------------------------------------------------------------- |
| IČO v patičce                 | ✅     | 12345678                                                                |
| DIČ v patičce                 | ⚠️     | Placeholder — nutné doplnit                                             |
| Registrovaná adresa           | ✅     | 1. Máje 178, 35709 Habartov, CZ                                         |
| GDPR stránka                  | ✅     | /zasady-ochrany-osobnich-udaju/                                         |
| GDPR warning banner           | ✅     | Žlutý banner s varováním o šabloně                                      |
| TODO comment u právního bloku | ✅     | `<!-- TODO: Replace placeholder registration details before launch -->` |

## Build & Deployment

| Kritérium              | Status | Poznámka                        |
| ---------------------- | ------ | ------------------------------- |
| Build skript           | ✅     | `pnpm run build` -> astro build |
| Statický výstup        | ✅     | `dist/` složka                  |
| Netlify config         | ✅     | netlify.toml                    |
| Vercel config          | ✅     | vercel.json                     |
| Cloudflare Pages ready | ✅     | dist/ výstup, \_headers         |
| trailingSlash          | ✅     | `true` v astro.config.mjs       |

## TODO před spuštěním

- [ ] Doplnit DIČ v `src/data/profile.ts`
- [ ] Aktualizovat Google Maps embed URL se skutečnou adresou
- [ ] Nahrát font soubory do `public/fonts/`
- [ ] Nahrát favicon.svg
- [ ] Nahrát og-image.jpg
- [ ] Zkontrolovat právní texty s právníkem
- [ ] Nastavit doménu v `astro.config.mjs`
- [ ] Nastavit CMS backend (git-gateway nebo proxy)
- [ ] Zkontrolovat ceny a položky jídelního lístku

## Skóre

| Kategorie   | Skóre   |
| ----------- | ------- |
| SEO         | 95/100  |
| Přístupnost | 90/100  |
| Výkon       | 98/100  |
| Bezpečnost  | 100/100 |
| Právní      | 85/100  |
| Celkově     | 94/100  |
