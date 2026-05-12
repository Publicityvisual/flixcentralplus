# Flixcentral+

Plataforma de streaming moderna con TMDB API, soporte multi-idioma.

## Stack

- **Vite 8** — Build tool ultrarrápido
- **Tailwind CSS v4** — Utility-first CSS
- **TMDB API** — Datos reales de películas y series
- **GitHub Pages** — Hosting automático desde el repo
- **Firebase Hosting** — Hosting secundario
- **i18n** — Sistema de internacionalización EN/ES con persistencia

## Características

- Carrusel de tendencias y películas populares con datos reales de TMDB
- Diseño responsive con menú móvil y animaciones fluidas
- Selector de idioma Español/Inglés con persistencia en localStorage
- Acordeón FAQ interactivo
- Formulario de email con feedback animado
- Optimizado para SEO (sitemap.xml, robots.txt, meta tags)
- Despliegue automático via GitHub Pages

## Desarrollo

```bash
npm install
npm run dev     # Servidor de desarrollo en localhost:3000
npm run build   # Build de producción en docs/
npm run preview # Vista previa del build
```

## Despliegue

**GitHub Pages** (automático): pushea a master → https://publicityvisual.github.io/flixcentralplus/

**Firebase** (manual):
```bash
python deploy.py
```

Sitios en vivo: [GitHub Pages](https://publicityvisual.github.io/flixcentralplus/) · [Firebase](https://flixcentralplus-33dc5.web.app)
