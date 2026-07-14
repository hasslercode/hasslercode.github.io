# Hassler Isaac — Portfolio

Portafolio personal en **Next.js 15** + **next-intl** (ES / EN), diseño bento.

## Stack

- Next.js 15 App Router
- TypeScript
- next-intl (locales `/es` y `/en` + middleware)
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

## Deploy

Producción en **Vercel**: [https://portafolio-hass.vercel.app](https://portafolio-hass.vercel.app)

```bash
vercel --prod
```

`https://hasslercode.github.io` no se puede apuntar por DNS a Vercel (GitHub controla `*.github.io`). El workflow `pages-redirect.yml` redirige ese dominio a Vercel.

## Assets

- Foto: `public/images/profile/hassler-principal.jpg`
- CV: `public/cv/CVHassler2026.pdf`
- Proyectos: `public/images/projects/`
