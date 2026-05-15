import Lenis from 'lenis';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import LazyLoad from 'vanilla-lazyload';

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

// LazyLoad inteligente para imágenes
const lazyLoader = new LazyLoad({
  elements_selector: '[data-src]',
  threshold: 200,
  class_loaded: 'img-loaded'
});

// Manejo de error de imagen via data attributes (evita escapes en template literals)
window._onImgError = function (el) {
  const color = el.dataset.c;
  const title = el.dataset.t;
  el.closest('.card-poster').innerHTML = `<div class='poster-fallback' style='--poster-color:${color}'><span>${title}</span></div>`;
};

const storage = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      return false;
    }
    return true;
  }
};

if (!TMDB_TOKEN) {
  console.warn('TMDB token missing. Create .env with VITE_TMDB_TOKEN=your_token');
  console.warn('Get a token at: https://www.themoviedb.org/settings/api');
}
const TMDB_IMG = 'https://image.tmdb.org/t/p';
const apiCache = new Map();
const MAX_CACHE_SIZE = 20;
function trimCache() {
  if (apiCache.size > MAX_CACHE_SIZE) {
    const firstKey = apiCache.keys().next().value;
    apiCache.delete(firstKey);
  }
}

const TR = {
  en: {
    nav: { t: 'Trending', p: 'Plans', f: 'Features', q: 'FAQ', si: 'Sign In' },
    hero: { b: 'NOW STREAMING', t1: 'Stories That', t2: 'Move You', s: 'Unlimited movies, series & originals. Any screen. Any time.', c: 'Start Watching', n: 'Join millions. No contracts. Cancel anytime.', pl: 'Enter your email', al: 'Almost there...', ch: 'Check your email!' },
    tr: { t: 'Trending Now' },
    pop: { t: 'Popular Now' },
    top: { t: 'Top Rated' },
    pl: {
      t: 'Pick Your Plan', d: 'Watch without limits.', b: 'Basic', s: 'Standard', p: 'Premium', pop: 'Most Popular', m: '/month', go: 'Subscribe', ok: 'selected',
      f1: '720p', f2: '1 device', f3: 'Ad-free',
      s1: '1080p', s2: '2 devices', s3: 'Downloads', s4: 'Ad-free',
      p1: '4K + HDR', p2: '4 devices', p3: 'Downloads', p4: 'Dolby Atmos', p5: 'Ad-free'
    },
    feat: {
      t: 'More Reasons to Join',
      c1t: 'Watch on your TV', c1d: 'Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.',
      c2t: 'Download & go', c2d: 'Save your favorites and always have something to watch, even offline.',
      c3t: 'Watch everywhere', c3d: 'Stream on your phone, tablet, laptop, and TV - all included.',
      c4t: 'Zero ads', c4d: 'Enjoy unlimited movies and shows without a single commercial interruption.',
      c5t: 'Fresh daily', c5d: 'New movies, series, and exclusives added every single day.',
      c6t: 'Family ready', c6d: 'Multiple profiles with PIN-protected parental controls for kids.'
    },
    faq: {
      t: 'Frequently Asked Questions', c: 'Ready to watch? Enter your email to create or restart your membership.',
      q1: 'What is Flixcentral+?', a1: 'Flixcentral+ is a streaming service that offers award-winning movies, TV shows, anime, documentaries, and more on thousands of internet-connected devices. Watch as much as you want, whenever you want, without a single commercial - all for one low monthly price.',
      q2: 'How much does it cost?', a2: 'Plans range from $7.99 to $15.99 a month. No extra costs, no contracts, no hidden fees. Cancel online anytime.',
      q3: 'Where can I watch?', a3: 'Watch instantly from any smartphone, tablet, computer, or TV with the Flixcentral+ app. Available on Smart TVs, game consoles, streaming players, and more.',
      q4: 'How do I cancel?', a4: 'No contracts, no commitments. Cancel your account online with just two clicks. No cancellation fees - start or stop anytime.',
      q5: 'What can I watch?', a5: 'An extensive library of feature films, documentaries, TV shows, anime, and exclusive Flixcentral+ Originals. Updated daily.',
      q6: 'Is Flixcentral+ good for kids?', a6: 'The Flixcentral+ Kids experience is included. Parents stay in control with PIN-protected parental controls and dedicated kids profiles.'
    },
    foot: { ph: 'Questions? Call', br: 'Flixcentral+ © 2026', tmdb: 'Powered by TMDB' }
  },
  es: {
    nav: { t: 'Tendencias', p: 'Planes', f: 'Características', q: 'FAQ', si: 'Iniciar Sesión' },
    hero: { b: 'YA DISPONIBLE', t1: 'Historias Que', t2: 'Te Conmueven', s: 'Películas, series y originales ilimitados. Cualquier pantalla. Cualquier momento.', c: 'Ver Ahora', n: 'Únete a millones. Sin contratos. Cancela cuando quieras.', pl: 'Ingresa tu email', al: 'Casi listo...', ch: '¡Revisa tu email!' },
    tr: { t: 'En Tendencia' },
    pop: { t: 'Populares Ahora' },
    top: { t: 'Mejor Valoradas' },
    pl: {
      t: 'Elige tu Plan', d: 'Mira sin límites.', b: 'Básico', s: 'Estándar', p: 'Premium', pop: 'Más Popular', m: '/mes', go: 'Suscribirse', ok: 'seleccionado',
      f1: '720p', f2: '1 dispositivo', f3: 'Sin anuncios',
      s1: '1080p', s2: '2 dispositivos', s3: 'Descargas', s4: 'Sin anuncios',
      p1: '4K + HDR', p2: '4 dispositivos', p3: 'Descargas', p4: 'Dolby Atmos', p5: 'Sin anuncios'
    },
    feat: {
      t: 'Más Razones para Unirte',
      c1t: 'Mira en tu TV', c1d: 'Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, reproductores Blu-ray y más.',
      c2t: 'Descarga y disfruta', c2d: 'Guarda tus favoritos y siempre ten algo para ver, incluso sin conexión.',
      c3t: 'Mira donde sea', c3d: 'Transmite en tu teléfono, tablet, laptop y TV - todo incluido.',
      c4t: 'Cero anuncios', c4d: 'Disfruta de películas y series ilimitadas sin una sola interrupción comercial.',
      c5t: 'Nuevo cada día', c5d: 'Películas, series y exclusivas nuevas añadidas cada día.',
      c6t: 'Para toda la familia', c6d: 'Múltiples perfiles con controles parentales protegidos con PIN para niños.'
    },
    faq: {
      t: 'Preguntas Frecuentes', c: '¿Listo para mirar? Ingresa tu email para crear o reactivar tu membresía.',
      q1: '¿Qué es Flixcentral+?', a1: 'Flixcentral+ es un servicio de streaming que ofrece películas premiadas, series, anime, documentales y más en miles de dispositivos conectados a internet. Mira todo lo que quieras, cuando quieras, sin un solo comercial - todo por un precio mensual bajo.',
      q2: '¿Cuánto cuesta?', a2: 'Los planes van desde $7.99 hasta $15.99 al mes. Sin costos extra, sin contratos, sin cargos ocultos. Cancela en línea cuando quieras.',
      q3: '¿Dónde puedo ver?', a3: 'Mira al instante desde cualquier smartphone, tablet, computadora o TV con la app de Flixcentral+. Disponible en Smart TVs, consolas, reproductores de streaming y más.',
      q4: '¿Cómo cancelo?', a4: 'Sin contratos, sin compromisos. Cancela tu cuenta en línea con solo dos clics. Sin cargos de cancelación - empieza o detente cuando quieras.',
      q5: '¿Qué puedo ver?', a5: 'Una extensa biblioteca de largometrajes, documentales, series, anime y exclusivos Originales de Flixcentral+. Actualizado diariamente.',
      q6: '¿Es Flixcentral+ bueno para niños?', a6: 'La experiencia Flixcentral+ Kids está incluida. Los padres mantienen el control con controles parentales protegidos con PIN y perfiles dedicados para niños.'
    },
    foot: { ph: '¿Preguntas? Llama al', br: 'Flixcentral+ © 2026', tmdb: 'Desarrollado por TMDB' }
  }
};

let lang = storage.get('flix_lang') || (navigator.language || 'en').slice(0, 2);
if (!['en', 'es'].includes(lang)) lang = 'en';

const $ = (s, p) => (p || document).querySelector(s);
const $$ = (s, p) => [...((p || document).querySelectorAll(s))];
const PLAN_KEY = { basic: 'b', standard: 's', premium: 'p' };
const FALLBACK_TITLES = {
  en: ['Red Night', 'Final Signal', 'Shadow City', 'Northern Lights', 'Deep Orbit', 'The Last Run', 'After Midnight', 'Wild Coast', 'Neon Code', 'Family Vault'],
  es: ['Noche Roja', 'Señal Final', 'Ciudad Sombra', 'Luces del Norte', 'Orbita Profunda', 'La Última Ruta', 'Después de Medianoche', 'Costa Salvaje', 'Código Neon', 'Bóveda Familiar']
};
const FALLBACK_COLORS = ['#e50914', '#564d4d', '#221f1f', '#831010', '#0f4c75', '#4a0e4e', '#1b4332', '#5c2e16', '#6b21a8', '#1a1a2e'];
let heroInterval;

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[char]));
}

function getFallbackTrending() {
  return (FALLBACK_TITLES[lang] || FALLBACK_TITLES.en).map(title => ({ title }));
}

function tmdbLanguage() {
  return lang === 'es' ? 'es-MX' : 'en-US';
}

function fetchTMDB(endpoint) {
  const lp = tmdbLanguage();
  const key = `${lp}:${endpoint}`;
  if (!apiCache.has(key)) {
    const request = fetch(`https://api.themoviedb.org/3/${endpoint}?language=${lp}`, { headers: { Authorization: `Bearer ${TMDB_TOKEN}` } })
      .then(r => {
        if (!r.ok) throw new Error(`TMDB ${r.status}`);
        return r.json();
      })
      .catch(error => {
        apiCache.delete(key);
        throw error;
      });
    apiCache.set(key, request);
    trimCache();
  }
  return apiCache.get(key);
}

function updatePlanButtons() {
  const saved = storage.get('flix_plan');
  $$('.btn-plan').forEach(btn => {
    btn.style.background = '';
    btn.textContent = TR[lang].pl.go;
  });

  if (saved && PLAN_KEY[saved]) {
    $$(`.btn-plan[data-plan="${saved}"]`).forEach(btn => {
      btn.innerHTML = `&#10003; ${TR[lang].pl.ok}`;
      btn.style.background = '#2e7d32';
    });
  }
}

function renderCards(trackId, items, showNumbers = false) {
  const trk = document.getElementById(trackId);
  if (!trk) return;
  trk.innerHTML = '';
  items.slice(0, 8).forEach((item, i) => {
    const rawTitle = item.title || item.name || (FALLBACK_TITLES[lang] || FALLBACK_TITLES.en)[i] || 'Flixcentral+ Original';
    const safeTitle = escapeHTML(rawTitle);
    const poster = item.poster_path ? `${TMDB_IMG}/w154${item.poster_path}` : '';
    const color = FALLBACK_COLORS[i % FALLBACK_COLORS.length];
    const card = document.createElement('div');
    card.className = 'swiper-slide card';
    card.dataset.rank = i + 1;
    card.setAttribute('aria-label', `${i + 1}. ${rawTitle}`);
    const year = item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4) || '';
    const rating = item.vote_average ? item.vote_average.toFixed(1) : '';

    const posterHtml = `<div class="card-poster">
      ${poster ? `<img data-src="${poster}" alt="${safeTitle}" width="154" height="231" data-c="${color}" data-t="${safeTitle}" onerror="_onImgError(this)" />` : `<div class="poster-fallback" style="--poster-color:${color}"><span>${safeTitle}</span></div>`}
      ${rating ? `<div class="card-rating"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>${rating}</div>` : ''}
      ${showNumbers ? `<div class="number-bg"></div><div class="number">${i + 1}</div>` : ''}
    </div>`;

    const infoHtml = `<div class="card-title">${safeTitle}</div>${year ? `<div class="card-year">${year}</div>` : ''}`;

    card.innerHTML = `<div class="card-inner">${posterHtml}${infoHtml}</div>`;
    trk.appendChild(card);
  });

  // Actualizar vanilla-lazyload para nuevas imágenes
  lazyLoader.update();
}

function setHeroFallback() {
  clearInterval(heroInterval);
  const hero = $('#hero');
  if (!hero) return;
  hero.style.backgroundImage = 'radial-gradient(circle at 72% 18%, rgba(229,9,20,.28), transparent 32%), radial-gradient(circle at 20% 32%, rgba(255,255,255,.08), transparent 28%), linear-gradient(135deg, #190205 0%, #07070b 48%, #000 100%)';
  hero.style.backgroundSize = 'cover';
  hero.style.backgroundPosition = 'center top';
  const overlay = document.getElementById('heroOverlay');
  if (overlay) overlay.style.opacity = '0';
}

function applyLang() {
  const t = TR[lang];
  document.documentElement.lang = lang;

  // Single DOM scan for all i18n elements (performance fix)
  $$('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const parts = key.split('.');
    let val = t;
    for (const p of parts) { val = val?.[p]; if (!val) break; }
    if (!val) return;
    if (el.tagName === 'INPUT' && el.placeholder) el.placeholder = val;
    else if (key === 'hero.c') el.innerHTML = `${val} <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;
    else if (key.startsWith('faq.a') || key === 'foot.ph') el.innerHTML = val;
    else el.textContent = val;
  });

  const lbl = lang === 'en' ? 'English' : 'Español';
  $$('.lang-btn').forEach(b => b.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> ${lbl}`);
}

document.addEventListener('DOMContentLoaded', () => {
  applyLang();
  updatePlanButtons();

  // Lenis smooth scroll
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);

  const toggleLang = () => {
    lang = lang === 'en' ? 'es' : 'en';
    storage.set('flix_lang', lang);
    applyLang();
    updatePlanButtons();
    // Re-fetch all carousels with new language titles
    fetchTrending();
    fetchSection('movie/popular', 'popularTrack', 10, false);
    fetchSection('movie/top_rated', 'topratedTrack', 10, false);
    fetchHero();
  };
  $$('.lang-btn').forEach(b => b.addEventListener('click', toggleLang));

  const nav = $('#navbar');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => { nav.classList.toggle('scrolled', window.scrollY > 50); ticking = false; });
      ticking = true;
    }
  });

  // Swiper profesional para carousels
  const swiperInstances = {};
  const createSwiper = (id, prevBtn, nextBtn) => {
    const el = document.getElementById(id);
    if (!el) return;
    swiperInstances[id] = new Swiper(el, {
      modules: [Navigation, FreeMode],
      slidesPerView: 'auto',
      spaceBetween: 14,
      freeMode: true,
      grabCursor: true,
      mousewheel: { forceToAxis: true },
      navigation: {
        prevEl: prevBtn,
        nextEl: nextBtn
      },
      breakpoints: {
        320: { slidesPerView: 2.2, spaceBetween: 10 },
        480: { slidesPerView: 3.2, spaceBetween: 12 },
        768: { slidesPerView: 4.2, spaceBetween: 14 },
        1024: { slidesPerView: 5.5, spaceBetween: 14 },
        1400: { slidesPerView: 6.5, spaceBetween: 14 }
      },
      watchSlidesProgress: true,
      lazyPreloadPrevNext: 2
    });
  };

  createSwiper('trendingSwiper', '#trending .scroll-prev', '#trending .scroll-next');
  createSwiper('popularSwiper', '#popular .scroll-prev', '#popular .scroll-next');
  createSwiper('topratedSwiper', '#toprated .scroll-prev', '#toprated .scroll-next');

  $$('.faq-item').forEach((item, index) => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    const answerId = `faq-answer-${index + 1}`;
    answer.id = answerId;
    btn.type = 'button';
    btn.setAttribute('aria-controls', answerId);
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', () => {
      const open = item.classList.contains('active');
      $$('.faq-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });
      if (!open) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  const handleForm = (e) => {
    e.preventDefault();
    const inp = e.target.querySelector('.hero-input');
    const email = (inp?.value ?? '').trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      inp.style.borderColor = '#e50914';
      inp.placeholder = TR[lang].hero.pl;
      setTimeout(() => { inp.style.borderColor = ''; }, 2000);
      return;
    }
    inp.style.borderColor = '#2e7d32';
    const btn = e.target.querySelector('.btn-hero');
    const orig = btn.innerHTML;
    btn.innerHTML = TR[lang].hero.al;
    setTimeout(() => {
      btn.innerHTML = TR[lang].hero.ch;
      inp.value = '';
      inp.style.borderColor = '';
      setTimeout(() => { btn.innerHTML = orig; }, 2500);
    }, 1200);
  };
  $('#heroForm')?.addEventListener('submit', handleForm);
  $('#faqForm')?.addEventListener('submit', handleForm);

  $$('.btn-plan').forEach(btn => {
    btn.addEventListener('click', function () {
      const plan = this.dataset.plan;
      storage.set('flix_plan', plan);
      $$('.btn-plan').forEach(b => {
        b.textContent = TR[lang].pl.go;
        b.style.background = '';
      });
      this.innerHTML = `&#10003; ${TR[lang].pl.ok}`;
      this.style.background = '#2e7d32';
    });
  });

  $$('a[href^="#"]').forEach(a => a.addEventListener('click', function (e) {
    const h = this.getAttribute('href');
    if (!h || h === '#' || h === '#0') { e.preventDefault(); return; }
    try {
      const target = $(h);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -68 });
      }
    } catch {
      e.preventDefault();
    }
  }));

  // Scroll progress con Lenis
  const prog = document.getElementById('scrollProgress');
  if (prog) {
    lenis.on('scroll', () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.width = h > 0 ? `${(lenis.scroll / h) * 100}%` : '0';
    });
  }

  // Staggered reveal
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.08 });
  $$('.plan-card, .feature-card, .faq-item, .section-header, .hero-content').forEach((el, i) => {
    el.classList.add('reveal');
    if (i > 0) el.classList.add(`reveal-delay-${Math.min(i, 6)}`);
    revealObs.observe(el);
  });

  // Carga inmediata del hero y trending (arriba de la página)
  fetchHero();
  fetchTrending();

  // Lazy load para carousels que están abajo — solo cargan cuando son visibles
  const lazyCarousel = (selector, endpoint, trackId, limit, showNumbers) => {
    const el = document.querySelector(selector);
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fetchSection(endpoint, trackId, limit, showNumbers);
          obs.disconnect();
        }
      });
    }, { rootMargin: '200px' });
    obs.observe(el);
  };

  lazyCarousel('#popular', 'movie/popular', 'popularTrack', 8, false);
  lazyCarousel('#toprated', 'movie/top_rated', 'topratedTrack', 8, false);

  // Cleanup hero slideshow when tab hidden or page unloaded
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearInterval(heroInterval);
  });
  window.addEventListener('beforeunload', () => { clearInterval(heroInterval); });
  window.addEventListener('pagehide', () => { clearInterval(heroInterval); });
});

// ─── TMDB ───
async function fetchSection(endpoint, trackId, limit = 10, showNumbers = false) {
  const track = document.getElementById(trackId);
  if (!track) return;
  if (!TMDB_TOKEN) {
    renderCards(trackId, getFallbackTrending(), showNumbers);
    return;
  }
  try {
    const d = await fetchTMDB(endpoint);
    const movies = d.results?.filter(item => item.poster_path).slice(0, limit);
    if (!movies?.length) throw new Error('no results');
    renderCards(trackId, movies, showNumbers);
  } catch (e) {
    console.warn(`TMDB ${endpoint} failed:`, e?.message);
    renderCards(trackId, getFallbackTrending(), showNumbers);
  }
}

async function fetchTrending() {
  await fetchSection('trending/all/week', 'trendingTrack', 8, true);
}

async function fetchHero() {
  if (!TMDB_TOKEN) {
    setHeroFallback();
    return;
  }

  try {
    const d = await fetchTMDB('trending/all/week');
    const backdrops = d.results?.filter(item => item.backdrop_path).slice(0, 6) || [];
    if (!backdrops.length) throw new Error('TMDB returned no backdrop results');

    const hero = $('#hero');
    if (!hero) return;
    hero.style.backgroundSize = 'cover';
    hero.style.backgroundPosition = 'center top';

    // Create overlay for crossfade
    let overlay = document.getElementById('heroOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'heroOverlay';
      overlay.style.cssText = 'position:absolute;inset:0;z-index:0;background-size:cover;background-position:center top;opacity:0;transition:opacity 1.2s ease';
      const heroBg = hero.querySelector('.hero-bg');
      if (heroBg) {
        hero.insertBefore(overlay, heroBg);
      } else {
        hero.insertBefore(overlay, hero.firstChild);
      }
    }

    let i = 0;
    const heroImgSize = '/w780';

    const preload = (idx, cb) => {
      const img = new Image();
      img.onload = cb;
      img.onerror = cb;
      img.src = `${TMDB_IMG}${heroImgSize}${backdrops[idx].backdrop_path}`;
      return img;
    };

    preload(0, () => {
      hero.style.backgroundImage = `url(${TMDB_IMG}${heroImgSize}${backdrops[0].backdrop_path})`;
    });

    clearInterval(heroInterval);
    heroInterval = setInterval(() => {
      i = (i + 1) % backdrops.length;
      preload(i, () => {
        overlay.style.backgroundImage = `url(${TMDB_IMG}${heroImgSize}${backdrops[i].backdrop_path})`;
        overlay.style.opacity = '1';
        setTimeout(() => {
          hero.style.backgroundImage = `url(${TMDB_IMG}${heroImgSize}${backdrops[i].backdrop_path})`;
          overlay.style.opacity = '0';
        }, 1200);
      });
    }, 6000);
  } catch (e) {
    console.warn('TMDB hero failed:', e?.message);
    setHeroFallback();
  }
}
