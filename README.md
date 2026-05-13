# Flixcentral+

Plataforma de streaming moderna con TMDB API, soporte multi-idioma.

## Stack

- **Vite 8** — Build tool ultrarrápido
- **Tailwind CSS v4** — Utility-first CSS
- **TMDB API** — Datos reales de películas y series
- **Firebase Hosting** — Hosting principal
- **GitHub Pages** — Espejo estático desde `docs/`
- **i18n** — Sistema de internacionalización EN/ES con persistencia

## Características

- Hero rotativo y carrusel Top 10 con datos reales de TMDB
- Fallback visual cuando TMDB no responde o falta el token local
- Diseño responsive con menú móvil y animaciones fluidas
- Selector de idioma Español/Inglés con persistencia en localStorage
- Acordeón FAQ interactivo
- Formulario de email con feedback animado
- Optimizado para SEO (sitemap.xml, robots.txt, meta tags)
- Build estático compatible con Firebase Hosting y GitHub Pages

## Desarrollo

```bash
npm install
npm run dev     # Servidor de desarrollo en localhost:3000
npm run build   # Build de producción en docs/
npm run preview # Vista previa del build
```

## Despliegue

**GitHub Pages**: publica el contenido generado en `docs/` desde `master` → https://publicityvisual.github.io/flixcentralplus/

**Firebase**:
```bash
python deploy.py
```

`deploy.py` construye y publica en Firebase. No hace commits ni push automáticamente; revisa cambios antes de subirlos al repo.

Sitios en vivo: [GitHub Pages](https://publicityvisual.github.io/flixcentralplus/) · [Firebase](https://flixcentralplus-33dc5.web.app)
