const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
if (!TMDB_TOKEN) {
  console.warn('TMDB token missing. Create .env with VITE_TMDB_TOKEN=your_token');
  console.warn('Get a token at: https://www.themoviedb.org/settings/api');
}
const TMDB_IMG = 'https://image.tmdb.org/t/p';

const TR = {
  en: {
    nav: { t: 'Trending', p: 'Plans', f: 'Features', q: 'FAQ', si: 'Sign In' },
    hero: { b: 'NEW SEASON', t1: 'Unlimited', t2: 'Movies & Series', s: 'Watch everywhere. Cancel anytime. Your next binge starts here.', c: 'Get Started', n: 'Ready to watch? Enter your email to create or restart your membership.', pl: 'Enter your email', al: 'Almost there...', ch: 'Check your email!' },
    tr: { t: 'Trending Now' },
    pl: { t: 'Choose Your Plan', d: 'Watch without limits.', b: 'Basic', s: 'Standard', p: 'Premium', pop: 'Most Popular', m: '/month', go: 'Get Started', ok: 'selected',
      f1: '720p', f2: '1 device', f3: 'Ad-free',
      s1: '1080p', s2: '2 devices', s3: 'Downloads', s4: 'Ad-free',
      p1: '4K + HDR', p2: '4 devices', p3: 'Downloads', p4: 'Dolby Atmos', p5: 'Ad-free' },
    feat: { t: 'More Reasons to Join',
      c1t: 'Watch on your TV', c1d: 'Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.',
      c2t: 'Download & go', c2d: 'Save your favorites and always have something to watch, even offline.',
      c3t: 'Watch everywhere', c3d: 'Stream on your phone, tablet, laptop, and TV - all included.',
      c4t: 'Zero ads', c4d: 'Enjoy unlimited movies and shows without a single commercial interruption.',
      c5t: 'Fresh daily', c5d: 'New movies, series, and exclusives added every single day.',
      c6t: 'Family ready', c6d: 'Multiple profiles with PIN-protected parental controls for kids.' },
    faq: { t: 'Frequently Asked Questions', c: 'Ready to watch? Enter your email to create or restart your membership.',
      q1: 'What is Flixcentral+?', a1: 'Flixcentral+ is a streaming service that offers award-winning movies, TV shows, anime, documentaries, and more on thousands of internet-connected devices. Watch as much as you want, whenever you want, without a single commercial - all for one low monthly price.',
      q2: 'How much does it cost?', a2: 'Plans range from $7.99 to $15.99 a month. No extra costs, no contracts, no hidden fees. Cancel online anytime.',
      q3: 'Where can I watch?', a3: 'Watch instantly from any smartphone, tablet, computer, or TV with the Flixcentral+ app. Available on Smart TVs, game consoles, streaming players, and more.',
      q4: 'How do I cancel?', a4: 'No contracts, no commitments. Cancel your account online with just two clicks. No cancellation fees - start or stop anytime.',
      q5: 'What can I watch?', a5: 'An extensive library of feature films, documentaries, TV shows, anime, and exclusive Flixcentral+ Originals. Updated daily.',
      q6: 'Is Flixcentral+ good for kids?', a6: 'The Flixcentral+ Kids experience is included. Parents stay in control with PIN-protected parental controls and dedicated kids profiles.' },
    foot: { ph: 'Questions? Call', br: 'Flixcentral+ © 2026', tmdb: 'Powered by TMDB' }
  },
  es: {
    nav: { t: 'Tendencias', p: 'Planes', f: 'Características', q: 'FAQ', si: 'Iniciar Sesión' },
    hero: { b: 'NUEVA TEMPORADA', t1: 'Películas y', t2: 'Series Ilimitadas', s: 'Mira donde quieras. Cancela cuando quieras. Tu próximo maratón empieza aquí.', c: 'Comenzar', n: '¿Listo para mirar? Ingresa tu email para crear o reactivar tu membresía.', pl: 'Ingresa tu email', al: 'Casi listo...', ch: '¡Revisa tu email!' },
    tr: { t: 'En Tendencia' },
    pl: { t: 'Elige tu Plan', d: 'Mira sin límites.', b: 'Básico', s: 'Estándar', p: 'Premium', pop: 'Más Popular', m: '/mes', go: 'Empezar', ok: 'seleccionado',
      f1: '720p', f2: '1 dispositivo', f3: 'Sin anuncios',
      s1: '1080p', s2: '2 dispositivos', s3: 'Descargas', s4: 'Sin anuncios',
      p1: '4K + HDR', p2: '4 dispositivos', p3: 'Descargas', p4: 'Dolby Atmos', p5: 'Sin anuncios' },
    feat: { t: 'Más Razones para Unirte',
      c1t: 'Mira en tu TV', c1d: 'Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, reproductores Blu-ray y más.',
      c2t: 'Descarga y disfruta', c2d: 'Guarda tus favoritos y siempre ten algo para ver, incluso sin conexión.',
      c3t: 'Mira donde sea', c3d: 'Transmite en tu teléfono, tablet, laptop y TV - todo incluido.',
      c4t: 'Cero anuncios', c4d: 'Disfruta de películas y series ilimitadas sin una sola interrupción comercial.',
      c5t: 'Nuevo cada día', c5d: 'Películas, series y exclusivas nuevas añadidas cada día.',
      c6t: 'Para toda la familia', c6d: 'Múltiples perfiles con controles parentales protegidos con PIN para niños.' },
    faq: { t: 'Preguntas Frecuentes', c: '¿Listo para mirar? Ingresa tu email para crear o reactivar tu membresía.',
      q1: '¿Qué es Flixcentral+?', a1: 'Flixcentral+ es un servicio de streaming que ofrece películas premiadas, series, anime, documentales y más en miles de dispositivos conectados a internet. Mira todo lo que quieras, cuando quieras, sin un solo comercial - todo por un precio mensual bajo.',
      q2: '¿Cuánto cuesta?', a2: 'Los planes van desde $7.99 hasta $15.99 al mes. Sin costos extra, sin contratos, sin cargos ocultos. Cancela en línea cuando quieras.',
      q3: '¿Dónde puedo ver?', a3: 'Mira al instante desde cualquier smartphone, tablet, computadora o TV con la app de Flixcentral+. Disponible en Smart TVs, consolas, reproductores de streaming y más.',
      q4: '¿Cómo cancelo?', a4: 'Sin contratos, sin compromisos. Cancela tu cuenta en línea con solo dos clics. Sin cargos de cancelación - empieza o detente cuando quieras.',
      q5: '¿Qué puedo ver?', a5: 'Una extensa biblioteca de largometrajes, documentales, series, anime y exclusivos Originales de Flixcentral+. Actualizado diariamente.',
      q6: '¿Es Flixcentral+ bueno para niños?', a6: 'La experiencia Flixcentral+ Kids está incluida. Los padres mantienen el control con controles parentales protegidos con PIN y perfiles dedicados para niños.' },
    foot: { ph: '¿Preguntas? Llama al', br: 'Flixcentral+ © 2026', tmdb: 'Desarrollado por TMDB' }
  }
};

let lang = localStorage.getItem('flix_lang') || (navigator.language || 'en').slice(0, 2);
if (!['en','es'].includes(lang)) lang = 'en';

const $ = (s, p) => (p || document).querySelector(s);
const $$ = (s, p) => [...((p || document).querySelectorAll(s))];

function applyLang() {
  const t = TR[lang];
  document.documentElement.lang = lang;

  const byId = (key) => $$(`[data-i18n="${key}"]`);

  byId('nav.t').forEach(e => e.textContent = t.nav.t);
  byId('nav.p').forEach(e => e.textContent = t.nav.p);
  byId('nav.f').forEach(e => e.textContent = t.nav.f);
  byId('nav.q').forEach(e => e.textContent = t.nav.q);
  byId('nav.si').forEach(e => e.textContent = t.nav.si);

  byId('hero.b').forEach(e => e.textContent = t.hero.b);
  byId('hero.t1').forEach(e => e.textContent = t.hero.t1);
  byId('hero.t2').forEach(e => e.textContent = t.hero.t2);
  byId('hero.s').forEach(e => e.textContent = t.hero.s);
  byId('hero.n').forEach(e => e.textContent = t.hero.n);
  byId('hero.pl').forEach(e => e.placeholder = t.hero.pl);
  byId('hero.c').forEach(e => e.innerHTML = `${t.hero.c} <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`);

  byId('tr.t').forEach(e => e.textContent = t.tr.t);

  byId('pl.t').forEach(e => e.textContent = t.pl.t);
  byId('pl.d').forEach(e => e.textContent = t.pl.d);
  byId('pl.b').forEach(e => e.textContent = t.pl.b);
  byId('pl.s').forEach(e => e.textContent = t.pl.s);
  byId('pl.p').forEach(e => e.textContent = t.pl.p);
  byId('pl.pop').forEach(e => e.textContent = t.pl.pop);
  byId('pl.m').forEach(e => e.textContent = t.pl.m);
  byId('pl.f1').forEach(e => e.textContent = t.pl.f1);
  byId('pl.f2').forEach(e => e.textContent = t.pl.f2);
  byId('pl.f3').forEach(e => e.textContent = t.pl.f3);
  byId('pl.s1').forEach(e => e.textContent = t.pl.s1);
  byId('pl.s2').forEach(e => e.textContent = t.pl.s2);
  byId('pl.s3').forEach(e => e.textContent = t.pl.s3);
  byId('pl.s4').forEach(e => e.textContent = t.pl.s4);
  byId('pl.p1').forEach(e => e.textContent = t.pl.p1);
  byId('pl.p2').forEach(e => e.textContent = t.pl.p2);
  byId('pl.p3').forEach(e => e.textContent = t.pl.p3);
  byId('pl.p4').forEach(e => e.textContent = t.pl.p4);
  byId('pl.p5').forEach(e => e.textContent = t.pl.p5);

  $$('.btn-plan[data-plan="basic"]').forEach(e => e.textContent = `${t.pl.go} ${t.pl.b}`);
  $$('.btn-plan[data-plan="standard"]').forEach(e => e.textContent = `${t.pl.go} ${t.pl.s}`);
  $$('.btn-plan[data-plan="premium"]').forEach(e => e.textContent = `${t.pl.go} ${t.pl.p}`);

  byId('feat.t').forEach(e => e.textContent = t.feat.t);
  byId('feat.c1t').forEach(e => e.textContent = t.feat.c1t);
  byId('feat.c1d').forEach(e => e.textContent = t.feat.c1d);
  byId('feat.c2t').forEach(e => e.textContent = t.feat.c2t);
  byId('feat.c2d').forEach(e => e.textContent = t.feat.c2d);
  byId('feat.c3t').forEach(e => e.textContent = t.feat.c3t);
  byId('feat.c3d').forEach(e => e.textContent = t.feat.c3d);
  byId('feat.c4t').forEach(e => e.textContent = t.feat.c4t);
  byId('feat.c4d').forEach(e => e.textContent = t.feat.c4d);
  byId('feat.c5t').forEach(e => e.textContent = t.feat.c5t);
  byId('feat.c5d').forEach(e => e.textContent = t.feat.c5d);
  byId('feat.c6t').forEach(e => e.textContent = t.feat.c6t);
  byId('feat.c6d').forEach(e => e.textContent = t.feat.c6d);

  byId('faq.t').forEach(e => e.textContent = t.faq.t);
  byId('faq.c').forEach(e => e.textContent = t.faq.c);
  byId('faq.q1').forEach(e => e.textContent = t.faq.q1);
  byId('faq.a1').forEach(e => e.innerHTML = t.faq.a1);
  byId('faq.q2').forEach(e => e.textContent = t.faq.q2);
  byId('faq.a2').forEach(e => e.innerHTML = t.faq.a2);
  byId('faq.q3').forEach(e => e.textContent = t.faq.q3);
  byId('faq.a3').forEach(e => e.innerHTML = t.faq.a3);
  byId('faq.q4').forEach(e => e.textContent = t.faq.q4);
  byId('faq.a4').forEach(e => e.innerHTML = t.faq.a4);
  byId('faq.q5').forEach(e => e.textContent = t.faq.q5);
  byId('faq.a5').forEach(e => e.innerHTML = t.faq.a5);
  byId('faq.q6').forEach(e => e.textContent = t.faq.q6);
  byId('faq.a6').forEach(e => e.innerHTML = t.faq.a6);

  byId('foot.ph').forEach(e => e.innerHTML = `${t.foot.ph} <a href="tel:+1234567890">1-234-567-890</a>`);
  byId('foot.br').forEach(e => e.textContent = t.foot.br);
  byId('foot.tmdb').forEach(e => e.textContent = t.foot.tmdb);

  const lbl = lang === 'en' ? 'English' : 'Español';
  $$('.lang-btn').forEach(b => b.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> ${lbl}`);
}

document.addEventListener('DOMContentLoaded', () => {
  applyLang();

  const toggleLang = () => {
    lang = lang === 'en' ? 'es' : 'en';
    localStorage.setItem('flix_lang', lang);
    applyLang();
    fetchTrending();
    fetchHero();
    // Restore plan selection
    const saved = localStorage.getItem('flix_plan');
    if (saved && {basic:'b',standard:'s',premium:'p'}[saved]) {
      $$('.btn-plan').forEach(b => { b.style.background = ''; b.textContent = `${TR[lang].pl.go} ${TR[lang].pl[{basic:'b',standard:'s',premium:'p'}[saved]]}`; });
      $$(`.btn-plan[data-plan="${saved}"]`).forEach(b => { b.innerHTML = `&#10003; ${TR[lang].pl.ok}`; b.style.background = '#2e7d32'; });
    }
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

  const ham = $('#hamburger'), mm = $('#mobileMenu');
  ham.addEventListener('click', () => {
    const open = mm.classList.contains('open');
    ham.classList.toggle('active'); mm.classList.toggle('open');
    ham.setAttribute('aria-expanded', !open);
  });
  $$('a', mm).forEach(l => l.addEventListener('click', () => { ham.classList.remove('active'); mm.classList.remove('open'); ham.setAttribute('aria-expanded', 'false'); }));

  const trk = $('#trendingTrack'), pv = $('.scroll-prev'), nx = $('.scroll-next');
  const sa = () => { const c = trk?.querySelector('.card'); return c ? c.offsetWidth + 12 : 200; };
  pv?.addEventListener('click', () => trk?.scrollBy({ left: -sa() * 2, behavior: 'smooth' }));
  nx?.addEventListener('click', () => trk?.scrollBy({ left: sa() * 2, behavior: 'smooth' }));

  $$('.faq-item').forEach(item => {
    item.querySelector('.faq-question')?.addEventListener('click', () => {
      const open = item.classList.contains('active');
      $$('.faq-item').forEach(i => i.classList.remove('active'));
      if (!open) item.classList.add('active');
    });
  });

  const handleForm = (e) => {
    e.preventDefault();
    const inp = e.target.querySelector('.hero-input');
    const email = inp?.value.trim();
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

  // Restore selected plan
  const savedPlan = localStorage.getItem('flix_plan');
  const planKey = {basic:'b',standard:'s',premium:'p'};
  if (savedPlan && planKey[savedPlan]) {
    $$(`.btn-plan[data-plan="${savedPlan}"]`).forEach(btn => {
      btn.textContent = `✓ ${TR[lang].pl.ok}`;
      btn.style.background = '#2e7d32';
    });
  }

  $$('.btn-plan').forEach(btn => {
    btn.addEventListener('click', function() {
      const plan = this.dataset.plan;
      localStorage.setItem('flix_plan', plan);
      $$('.btn-plan').forEach(b => {
        const key = planKey[b.dataset.plan];
        b.textContent = `${TR[lang].pl.go} ${TR[lang].pl[key]}`;
        b.style.background = '';
      });
      this.innerHTML = `&#10003; ${TR[lang].pl.ok}`;
      this.style.background = '#2e7d32';
    });
  });

  $$('a[href^="#"]').forEach(a => a.addEventListener('click', function(e) {
    const h = this.getAttribute('href');
    if (h !== '#') { e.preventDefault(); $(h)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }));

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; } });
  }, { threshold: 0.08 });
  $$('.plan-card, .feature-card, .faq-item').forEach(el => {
    el.style.opacity = '0'; el.style.transform = 'translateY(24px)'; el.style.transition = 'opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1)';
    obs.observe(el);
  });

  fetchTrending();
  fetchHero();
});

// ─── TMDB ───
async function fetchTrending() {
  const trk = $('#trendingTrack');
  if (!trk || !trk.children.length) return;

  try {
    const lp = lang === 'es' ? 'es-MX' : 'en-US';
    const r = await fetch(`https://api.themoviedb.org/3/trending/all/week?language=${lp}`, { headers: { Authorization: `Bearer ${TMDB_TOKEN}` } });
    const d = await r.json();
    const cutoff = new Date(Date.now() - 90 * 86400000).toISOString().split('T')[0];
    const movies = d.results?.filter(item => !item.release_date || item.release_date < cutoff).slice(0, 10);
    if (!movies?.length) return;

    trk.innerHTML = '';
    const isEs = lang === 'es';

    movies.forEach((item, i) => {
      const title = item.title || item.name;
      const year = (item.release_date || item.first_air_date || '').split('-')[0] || '';
      const type = item.media_type === 'tv' ? (isEs ? 'Serie' : 'Series') : (isEs ? 'Película' : 'Movie');
      const poster = item.poster_path ? `${TMDB_IMG}/w342${item.poster_path}` : null;
      const rating = item.vote_average ? Number(item.vote_average).toFixed(1) : '—';
      const colors = ['#e50914','#564d4d','#221f1f','#831010','#0f4c75','#4a0e4e','#1b4332','#5c2e16','#6b21a8','#1a1a2e'];

      const c = document.createElement('div'); c.className = 'card'; c.dataset.rank = i + 1;
      c.innerHTML = `<div class="card-rank">${i + 1}</div><div class="w-full max-h-full aspect-[5/8] rounded-card overflow-hidden" style="background:${colors[i]}"><figure class="m-0 leading-[0]"><picture class="inline-block align-top rounded-card w-full h-full object-cover [&_img]:w-full [&_img]:max-h-full [&_img]:object-cover">${poster ? `<source media="(max-width: 440px)" srcset="${poster} 1x, ${poster.replace('w342','w500')} 2x"><source media="(min-width: 441px) and (max-width: 768px)" srcset="${poster} 1x, ${poster.replace('w342','w500')} 2x"><source media="(min-width: 769px)" srcset="${poster.replace('w342','w500')} 1x, ${poster.replace('w342','w780')} 2x"><img src="${poster}" width="170" height="272" alt="${title}" loading="lazy" fetchpriority="auto" class="h-auto w-full max-w-full" onerror="this.parentElement.parentElement.parentElement.style.background='${colors[i]}'" style="display:block" />` : ''}</picture></figure><div class="card-overlay"></div></div>`;
      trk.appendChild(c);
    });

  } catch (e) { console.warn('TMDB trending failed:', e?.message); }
}

async function fetchHero() {
  try {
    const lp = lang === 'es' ? 'es-MX' : 'en-US';
    const r = await fetch(`https://api.themoviedb.org/3/trending/all/week?language=${lp}`, { headers: { Authorization: `Bearer ${TMDB_TOKEN}` } });
    const d = await r.json();
    const top = d.results?.[0];
    if (top?.backdrop_path) {
      const hero = $('#hero');
      if (!hero) return;
      const img = new Image();
      img.fetchPriority = 'high';
      img.src = `${TMDB_IMG}/original${top.backdrop_path}`;
      img.onload = () => {
        hero.style.backgroundImage = `url(${img.src})`;
        hero.style.backgroundSize = 'cover';
        hero.style.backgroundPosition = 'center top';
      };
    }
  } catch (e) { console.warn('TMDB trending failed:', e?.message); }
}
