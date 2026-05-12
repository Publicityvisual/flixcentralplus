# Flixcentral+

Plataforma de streaming moderna con TMDB API, soporte multi-idioma y despliegue en Firebase.

## Stack

- **Vite 8** — Build tool ultrarrápido
- **Tailwind CSS v4** — Utility-first CSS
- **TMDB API** — Datos reales de películas y series
- **Firebase Hosting** — Despliegue y hosting
- **i18n** — Sistema de internacionalización EN/ES con persistencia

## Características

- Carrusel de tendencias y películas populares con datos reales de TMDB
- Diseño responsive con menú móvil y animaciones fluidas
- Selector de idioma Español/Inglés con persistencia en localStorage
- Acordeón FAQ interactivo
- Formulario de email con feedback animado
- Optimizado para SEO (sitemap.xml, robots.txt, meta tags)
- Despliegue continuo via Firebase Hosting

## Desarrollo

```bash
npm install
npm run dev     # Servidor de desarrollo en localhost:3000
npm run build   # Build de producción en dist/
npm run preview # Vista previa del build
```

## Despliegue

```bash
firebase deploy --only hosting
```

Sitio en vivo: [https://flixcentralplus-33dc5.web.app](https://flixcentralplus-33dc5.web.app)
