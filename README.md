# Hassler Isaac — Portfolio

Portafolio personal en **Next.js 15** + **next-intl** (ES / EN), diseño bento.

## Stack

- Next.js App Router (static export)
- TypeScript
- next-intl (locales `/es` y `/en`)
- CSS propio (bento + light/dark)

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). La raíz redirige a `/es` (locale por defecto). Switcher ES ↔ EN en el header.

## Idiomas y SEO

| Ruta | Idioma |
|------|--------|
| `/es/` | Español (default / x-default) |
| `/en/` | English |

- Prefijo de locale siempre presente (`localePrefix: always`)
- `hreflang` + canonical por locale
- `sitemap.xml` y `robots.txt`
- JSON-LD: Person + WebSite + ProfessionalService

## Contenido editable

- Textos UI: `src/i18n/messages/es.json` y `en.json`
- Datos del sitio: `src/lib/site.ts`
- Estilos: `src/app/globals.css`
- Componentes: `src/components/`

## Deploy (GitHub Pages)

El sitio es un user Pages repo (`hasslercode.github.io`), servido en la raíz:

**https://hasslercode.github.io/**

Build estático (`output: "export"`) vía GitHub Actions (`.github/workflows/deploy-pages.yml`).

```bash
npm run build   # genera out/
```

Notas para static export:

- Sin middleware (incompatible con export estático)
- `images.unoptimized: true`
- `trailingSlash: true` (rutas amigables en Pages)

## Assets

- Foto: `public/images/profile/hassler-principal.jpg`
- CV: `public/cv/CVHassler2026.pdf`
- Proyectos: `public/images/projects/`
