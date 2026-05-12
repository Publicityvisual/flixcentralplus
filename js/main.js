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
    tr: { t: 'Trending Now', pop: 'Popular<br>Movies &rarr;', mov: 'Movie', ser: 'Series' },
    pl: { t: 'Choose Your Plan', d: 'Watch without limits.', b: 'Basic', s: 'Standard', p: 'Premium', pop: 'Most Popular', m: '/month', go: 'Get Started', ok: 'selected' },
    feat: { t: 'More Reasons to Join' },
    faq: { t: 'Frequently Asked Questions', c: 'Ready to watch? Enter your email to create or restart your membership.' },
    foot: { ph: 'Questions? Call', br: 'Flixcentral+ &copy; 2026', tmdb: 'Powered by TMDB' }
  },
  es: {
    nav: { t: 'Tendencias', p: 'Planes', f: 'Caracter&iacute;sticas', q: 'FAQ', si: 'Iniciar Sesi&oacute;n' },
    hero: { b: 'NUEVA TEMPORADA', t1: 'Pel&iacute;culas y', t2: 'Series Ilimitadas', s: 'Mira donde quieras. Cancela cuando quieras. Tu pr&oacute;ximo marat&oacute;n empieza aqu&iacute;.', c: 'Comenzar', n: '&iquest;Listo para mirar? Ingresa tu email para crear o reactivar tu membres&iacute;a.', pl: 'Ingresa tu email', al: 'Casi listo...', ch: '&iexcl;Revisa tu email!' },
    tr: { t: 'En Tendencia', pop: 'Pel&iacute;culas<br>Populares &rarr;', mov: 'Pel&iacute;cula', ser: 'Serie' },
    pl: { t: 'Elige tu Plan', d: 'Mira sin l&iacute;mites.', b: 'B&aacute;sico', s: 'Est&aacute;ndar', p: 'Premium', pop: 'M&aacute;s Popular', m: '/mes', go: 'Empezar', ok: 'seleccionado' },
    feat: { t: 'M&aacute;s Razones para Unirte' },
    faq: { t: 'Preguntas Frecuentes', c: '&iquest;Listo para mirar? Ingresa tu email para crear o reactivar tu membres&iacute;a.' },
    foot: { ph: '&iquest;Preguntas? Llama al', br: 'Flixcentral+ &copy; 2026', tmdb: 'Desarrollado por TMDB' }
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

  $$('.btn-plan[data-plan="basic"]').forEach(e => e.textContent = `${t.pl.go} ${t.pl.b}`);
  $$('.btn-plan[data-plan="standard"]').forEach(e => e.textContent = `${t.pl.go} ${t.pl.s}`);
  $$('.btn-plan[data-plan="premium"]').forEach(e => e.textContent = `${t.pl.go} ${t.pl.p}`);

  byId('feat.t').forEach(e => e.textContent = t.feat.t);

  byId('faq.t').forEach(e => e.textContent = t.faq.t);
  byId('faq.c').forEach(e => e.textContent = t.faq.c);

  byId('foot.ph').forEach(e => e.innerHTML = `${t.foot.ph} <a href="tel:+1234567890">1-234-567-890</a>`);
  byId('foot.br').forEach(e => e.textContent = t.foot.br);
  byId('foot.tmdb').forEach(e => e.textContent = t.foot.tmdb);

  const lbl = lang === 'en' ? 'English' : 'Espa&ntilde;ol';
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
  ham.addEventListener('click', () => { ham.classList.toggle('active'); mm.classList.toggle('open'); });
  $$('a', mm).forEach(l => l.addEventListener('click', () => { ham.classList.remove('active'); mm.classList.remove('open'); }));

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
    if (!email) return;
    const btn = e.target.querySelector('.btn-hero');
    const orig = btn.innerHTML;
    btn.innerHTML = TR[lang].hero.al;
    setTimeout(() => {
      btn.innerHTML = TR[lang].hero.ch;
      inp.value = '';
      setTimeout(() => { btn.innerHTML = orig; }, 2500);
    }, 1200);
  };
  $('#heroForm')?.addEventListener('submit', handleForm);
  $('#faqForm')?.addEventListener('submit', handleForm);

  $$('.btn-plan').forEach(btn => {
    btn.addEventListener('click', function() {
      const orig = this.innerHTML;
      this.innerHTML = '&hellip;';
      setTimeout(() => {
        this.innerHTML = `&#10003; ${TR[lang].pl.ok}`;
        this.style.background = '#2e7d32';
        setTimeout(() => { this.innerHTML = orig; this.style.background = ''; }, 2500);
      }, 800);
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
    const reg = lang === 'es' ? 'MX' : 'US';
    const [tr, pr] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/trending/all/week?language=${lp}`, { headers: { Authorization: `Bearer ${TMDB_TOKEN}` } }),
      fetch(`https://api.themoviedb.org/3/movie/popular?language=${lp}&region=${reg}&page=1`, { headers: { Authorization: `Bearer ${TMDB_TOKEN}` } })
    ]);
    const [td, pd] = await Promise.all([tr.json(), pr.json()]);
    const movies = td.results?.slice(0, 10);
    const popular = pd.results?.slice(0, 6);
    if (!movies?.length) return;

    trk.innerHTML = '';
    const isEs = lang === 'es';

    movies.forEach((item, i) => {
      const title = item.title || item.name;
      const year = (item.release_date || item.first_air_date || '').split('-')[0] || '';
      const type = item.media_type === 'tv' ? (isEs ? 'Serie' : 'Series') : (isEs ? 'Pel&iacute;cula' : 'Movie');
      const poster = item.poster_path ? `${TMDB_IMG}/w342${item.poster_path}` : null;
      const rating = item.vote_average ? Number(item.vote_average).toFixed(1) : '&mdash;';
      const colors = ['#e50914','#564d4d','#221f1f','#831010','#0f4c75','#4a0e4e','#1b4332','#5c2e16','#6b21a8','#1a1a2e'];

      const c = document.createElement('div'); c.className = 'card'; c.dataset.rank = i + 1;
      c.innerHTML = `<div class="card-img" style="background:${colors[i]}">${poster ? `<img src="${poster}" alt="${title}" loading="lazy" width="180" height="270" onerror="this.style.display='none'" />` : ''}<div class="card-img-overlay"></div><div class="card-rank">${i + 1}</div><div class="card-info"><div class="card-rating">&#9733; ${rating}</div><h4>${title}</h4><p>${type}${year ? ` - ${year}` : ''}</p></div></div>`;
      trk.appendChild(c);
    });

    const sep = document.createElement('div');
    sep.style.cssText = 'flex:0 0 auto;width:120px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;font-weight:800;color:#e50914;text-align:center;line-height:1.3';
    sep.innerHTML = TR[lang].tr.pop;
    trk.appendChild(sep);

    popular.forEach(item => {
      const title = item.title || item.name;
      const year = (item.release_date || '').split('-')[0] || '';
      const poster = item.poster_path ? `${TMDB_IMG}/w185${item.poster_path}` : null;
      const rating = item.vote_average ? Number(item.vote_average).toFixed(1) : '&mdash;';
      const c = document.createElement('div'); c.className = 'card'; c.style.cssText = 'flex:0 0 auto;width:140px';
      c.innerHTML = `<div class="card-img" style="background:#1a1a1a">${poster ? `<img src="${poster}" alt="${title}" onerror="this.style.display='none'" loading="lazy" width="140" height="210" />` : ''}<div class="card-img-overlay"></div><div class="card-info"><div class="card-rating">&#9733; ${rating}</div><h4>${title}</h4><p>${TR[lang].tr.mov}${year ? ` - ${year}` : ''}</p></div></div>`;
      trk.appendChild(c);
    });
  } catch (e) {}
}

async function fetchHero() {
  try {
    const lp = lang === 'es' ? 'es-MX' : 'en-US';
    const r = await fetch(`https://api.themoviedb.org/3/trending/all/week?language=${lp}`, { headers: { Authorization: `Bearer ${TMDB_TOKEN}` } });
    const d = await r.json();
    const top = d.results?.[0];
    if (top?.backdrop_path) {
      const hero = $('#hero');
      const img = new Image();
      img.fetchPriority = 'high';
      img.src = `${TMDB_IMG}/original${top.backdrop_path}`;
      img.onload = () => {
        hero.style.backgroundImage = `url(${img.src})`;
        hero.style.backgroundSize = 'cover';
        hero.style.backgroundPosition = 'center top';
      };
    }
  } catch (e) {}
}
