/* ===== TATU CITY — MAIN JS v3 (FIXED) ===== */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ─────────────────────────────────────────────
   UTILS
───────────────────────────────────────────── */
const q = (s, ctx = document) => ctx.querySelector(s);
const qa = (s, ctx = document) => [...ctx.querySelectorAll(s)];
const isMobile = () => window.matchMedia('(pointer: coarse)').matches;
const isReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─────────────────────────────────────────────
   CUSTOM CURSOR (desktop only)
───────────────────────────────────────────── */
const cur = q('#cur'), ring = q('#ring');
let mx = 0, my = 0, rx = 0, ry = 0;

if (cur && ring && !isMobile()) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    gsap.to(cur, { x: mx, y: my, duration: .08, ease: 'none' });
  });

  (function loop() {
    rx += (mx - rx) * .13;
    ry += (my - ry) * .13;
    gsap.set(ring, { x: rx, y: ry });
    requestAnimationFrame(loop);
  })();

  const hoverEls = 'a, button, .hoverable, .gallery-item, .job-card, .news-filter, .gallery-filter, .pl, .pr, .nc, .feat, .sz-c, .rc-p, .benefit-card, .info-card, .hd, .ha';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverEls)) {
      cur.classList.add('hv'); ring.classList.add('hv');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverEls)) {
      cur.classList.remove('hv'); ring.classList.remove('hv');
    }
  });
}

/* ─────────────────────────────────────────────
   SCROLL PROGRESS BAR
───────────────────────────────────────────── */
const prog = q('#prog');
if (prog) {
  const updateProg = () => {
    const total = document.documentElement.scrollHeight - innerHeight;
    prog.style.width = total > 0 ? (scrollY / total * 100) + '%' : '0%';
  };
  window.addEventListener('scroll', updateProg, { passive: true });
}

/* ─────────────────────────────────────────────
   NAV SCROLL STATE
───────────────────────────────────────────── */
const nav = q('#nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('sc', scrollY > 70);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ─────────────────────────────────────────────
   SCROLL TO TOP
───────────────────────────────────────────── */
const ftop = q('#ftop');
if (ftop) {
  window.addEventListener('scroll', () => ftop.classList.toggle('sh', scrollY > 500), { passive: true });
  ftop.addEventListener('click', () => gsap.to(window, { scrollTo: 0, duration: 1, ease: 'power3.inOut' }));
}

/* ─────────────────────────────────────────────
   MOBILE MENU - FIXED OVERLAPPING
───────────────────────────────────────────── */
const ham = q('#ham'), mob = q('#mob');

function buildMobileMenu() {
  if (!mob || mob.dataset.built) return;
  mob.dataset.built = '1';

  mob.innerHTML = `
    <div class="mob-head">
      <a href="index.html" class="mob-logo">
        <svg viewBox="0 0 60 50" fill="none" aria-hidden="true">
          <ellipse cx="30" cy="14" rx="17" ry="11" fill="#e8521a"/>
          <ellipse cx="20" cy="18" rx="11" ry="8" fill="#e8521a"/>
          <ellipse cx="40" cy="18" rx="11" ry="8" fill="#e8521a"/>
          <rect x="27" y="26" width="6" height="13" fill="#c9420a" rx="1"/>
          <rect x="18" y="37" width="24" height="3" fill="#c9420a" rx="1.5"/>
        </svg>
        <div class="n-lt">TATU<s>.</s>CITY</div>
      </a>
      <button class="mob-close" id="mob-close" aria-label="Close menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <nav class="mob-nav" aria-label="Mobile navigation">
      <ul style="list-style:none">
        <li class="mi"><a href="index.html" class="ml">Home<span class="ml-arr"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span></a></li>
        <li class="mi">
          <a href="now-selling.html" class="ml">Now Selling<span class="ml-arr"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span></a>
          <ul style="list-style:none">
            <li class="mi mi-sub"><a href="kijani-ridge.html" class="ml">Kijani Ridge</a></li>
            <li class="mi mi-sub"><a href="jabali-towers.html" class="ml">Jabali Towers</a></li>
            <li class="mi mi-sub"><a href="porini-point.html" class="ml">Porini Point</a></li>
            <li class="mi mi-sub"><a href="business.html" class="ml">Business Locations</a></li>
          </ul>
        </li>
        <li class="mi"><a href="gallery.html" class="ml">Gallery<span class="ml-arr"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span></a></li>
        <li class="mi"><a href="news.html" class="ml">News<span class="ml-arr"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span></a></li>
        <li class="mi"><a href="why-tatu.html" class="ml">Why Choose Tatu<span class="ml-arr"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span></a></li>
        <li class="mi"><a href="tatu-reach.html" class="ml">Tatu Reach<span class="ml-arr"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span></a></li>
        <li class="mi"><a href="careers.html" class="ml">Careers<span class="ml-arr"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span></a></li>
        <li class="mi"><a href="contact.html" class="ml">Contact<span class="ml-arr"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span></a></li>
      </ul>
    </nav>
    <div class="mob-foot">
      <a href="contact.html" class="mob-cta">Enquire Now →</a>
      <div class="mf">&copy; 2026 Tatu City &middot; A Rendeavour Development</div>
    </div>
  `;

  // Highlight active page
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  mob.querySelectorAll('.ml').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.style.color = 'var(--o)';
  });

  // Add close button listener
  const closeBtn = q('#mob-close', mob);
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }
}

function openMenu() {
  if (!mob || !ham) return;
  buildMobileMenu();
  mob.classList.add('op');
  ham.classList.add('op');
  ham.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  mob.scrollTop = 0;
}

function closeMenu() {
  if (!mob || !ham) return;
  mob.classList.remove('op');
  ham.classList.remove('op');
  ham.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

if (ham && mob) {
  ham.addEventListener('click', (e) => {
    e.stopPropagation();
    mob.classList.contains('op') ? closeMenu() : openMenu();
  });

  mob.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('#mob-close');
    const link = e.target.closest('a[href]');
    if (closeBtn) {
      closeMenu();
    } else if (link && !link.getAttribute('href').startsWith('#')) {
      setTimeout(closeMenu, 80);
    }
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mob.classList.contains('op')) closeMenu();
  });

  // Swipe to close
  let touchStartX = 0;
  mob.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  mob.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (diff > 70) closeMenu();
  }, { passive: true });
}

/* ─────────────────────────────────────────────
   SMOOTH ANCHOR SCROLL
───────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  const href = a.getAttribute('href');
  if (href === '#' || href === '#main') return;
  const t = document.querySelector(href);
  if (t) {
    e.preventDefault();
    gsap.to(window, { scrollTo: { y: t, offsetY: 80 }, duration: 1.1, ease: 'power3.inOut' });
  }
}));

/* ─────────────────────────────────────────────
   HERO SLIDESHOW (Homepage)
───────────────────────────────────────────── */
const slides = qa('.sl'), dots = qa('.hd'), cnt = q('#hcnt');
if (slides.length) {
  let curSl = 0, auto, paused = false;

  function goTo(i) {
    if (!slides.length) return;
    slides[curSl].classList.remove('act');
    if (dots[curSl]) { dots[curSl].classList.remove('act'); dots[curSl].setAttribute('aria-selected', 'false'); }
    curSl = ((i % slides.length) + slides.length) % slides.length;
    slides[curSl].classList.add('act');
    if (dots[curSl]) { dots[curSl].classList.add('act'); dots[curSl].setAttribute('aria-selected', 'true'); }
    if (cnt) cnt.textContent = String(curSl + 1).padStart(2, '0');
  }

  const startAuto = () => { clearInterval(auto); auto = setInterval(() => goTo(curSl + 1), 5000); };
  const stopAuto = () => clearInterval(auto);

  startAuto();

  const hnext = q('#hnext'), hprev = q('#hprev');
  if (hnext) hnext.addEventListener('click', () => { stopAuto(); goTo(curSl + 1); if (!paused) startAuto(); });
  if (hprev) hprev.addEventListener('click', () => { stopAuto(); goTo(curSl - 1); if (!paused) startAuto(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { stopAuto(); goTo(i); if (!paused) startAuto(); }));

  const hero = q('#hero');
  if (hero) {
    hero.addEventListener('mouseenter', () => { paused = true; stopAuto(); });
    hero.addEventListener('mouseleave', () => { paused = false; startAuto(); });
    let tx = 0;
    hero.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', e => {
      const d = tx - e.changedTouches[0].clientX;
      if (Math.abs(d) > 50) { stopAuto(); d > 0 ? goTo(curSl + 1) : goTo(curSl - 1); startAuto(); }
    }, { passive: true });
  }
}

/* ─────────────────────────────────────────────
   THREE.JS LOCATION MAP
───────────────────────────────────────────── */
function initThreeMap() {
  const c = q('#lc-cv');
  if (!c || typeof THREE === 'undefined') return;
  const w = c.offsetWidth || 580, h = c.offsetHeight || 400;
  const renderer = new THREE.WebGLRenderer({ canvas: c, antialias: true, alpha: true });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setClearColor(0x0a160d, 1);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
  camera.position.set(0, 10, 14);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.GridHelper(32, 24, 0x1a4a2e, 0x0d2218));
  const bm = new THREE.MeshPhongMaterial({ color: 0x1f5c2e, transparent: true, opacity: .85 });
  const gm = new THREE.MeshPhongMaterial({ color: 0xc9a84c, transparent: true, opacity: .9 });
  const om = new THREE.MeshPhongMaterial({ color: 0xe8521a, transparent: true, opacity: .75 });

  [[2, 3, 2, 0, 0, 0, gm], [1, 5, 1, 3, 0, 2, bm], [2, 2.5, 2, -3, 0, 3, bm],
   [1.5, 1.5, 1.5, -5, 0, -2, bm], [1, 4, 1, 5, 0, -3, bm], [2, 1.5, 2, -2, 0, -5, bm],
   [1, 2, 1, 6, 0, 0, om]].forEach(([W, H, D, x, y, z, m]) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(W, H, D), m);
    mesh.position.set(x, H / 2, z);
    scene.add(mesh);
  });

  const ringMesh = new THREE.Mesh(
    new THREE.RingGeometry(1.4, 1.7, 32),
    new THREE.MeshBasicMaterial({ color: 0xe8521a, side: THREE.DoubleSide, transparent: true, opacity: .9 })
  );
  ringMesh.rotation.x = -Math.PI / 2;
  ringMesh.position.y = .05;
  scene.add(ringMesh);

  const rm = new THREE.LineBasicMaterial({ color: 0x2d8c4e, transparent: true, opacity: .5 });
  [[[-15, 0, 0], [15, 0, 0]], [[0, 0, -15], [0, 0, 15]],
   [[-10, 0, -8], [-10, 0, 8]], [[10, 0, -8], [10, 0, 8]]].forEach(pts => {
    const g = new THREE.BufferGeometry().setFromPoints(pts.map(p => new THREE.Vector3(...p)));
    scene.add(new THREE.Line(g, rm));
  });

  scene.add(new THREE.AmbientLight(0x1a3a2a, .9));
  const pl = new THREE.PointLight(0xe8521a, 2, 20); pl.position.set(0, 6, 0); scene.add(pl);
  const pl2 = new THREE.PointLight(0xc9a84c, 1, 30); pl2.position.set(-8, 8, -5); scene.add(pl2);

  let t = 0;
  (function render() {
    requestAnimationFrame(render);
    t += .016;
    ringMesh.material.opacity = .5 + Math.sin(t * 2) * .45;
    ringMesh.scale.setScalar(1 + Math.sin(t * 2) * .08);
    camera.position.x = Math.sin(t * .15) * 2;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  })();

  const ro = new ResizeObserver(() => {
    const nw = c.offsetWidth, nh = c.offsetHeight;
    renderer.setSize(nw, nh);
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
  });
  ro.observe(c);
}
if (q('#lc-cv')) initThreeMap();

/* ─────────────────────────────────────────────
   GSAP SCROLL REVEALS
───────────────────────────────────────────── */
function initReveals() {
  if (isReduced()) {
    qa('.rv, .rv-l, .rv-r, .rv-s').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
    return;
  }

  qa('.rv').forEach((el, i) => gsap.fromTo(el,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: .8, ease: 'power3.out', delay: i * .03,
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } }));

  qa('.rv-l').forEach(el => gsap.fromTo(el,
    { opacity: 0, x: -40 },
    { opacity: 1, x: 0, duration: .9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' } }));

  qa('.rv-r').forEach(el => gsap.fromTo(el,
    { opacity: 0, x: 40 },
    { opacity: 1, x: 0, duration: .9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' } }));

  qa('.rv-s').forEach((el, i) => gsap.fromTo(el,
    { opacity: 0, scale: .92 },
    { opacity: 1, scale: 1, duration: .75, ease: 'power3.out', delay: i * .05,
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } }));

  /* Counters */
  qa('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    ScrollTrigger.create({
      trigger: el, start: 'top 88%',
      onEnter: () => {
        gsap.to({ v: 0 }, {
          v: target, duration: 2, ease: 'power2.out',
          onUpdate() {
            el.textContent = Number.isInteger(target)
              ? Math.floor(this.targets()[0].v).toLocaleString()
              : this.targets()[0].v.toFixed(1);
          }
        });
      }
    });
  });

  /* Hero parallax */
  if (q('#hero')) {
    ScrollTrigger.create({
      trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true,
      onUpdate: s => gsap.set('.h-c', { y: s.progress * 60 })
    });
  }

  /* Page hero parallax */
  if (q('.page-hero')) {
    ScrollTrigger.create({
      trigger: '.page-hero', start: 'top top', end: 'bottom top', scrub: true,
      onUpdate: s => gsap.set('.page-hero-bg', { y: s.progress * 25 })
    });
  }

  /* 3D card tilt — desktop only */
  if (!isMobile()) {
    qa('.feat, .sz-c, .rc-p, .pr, .nc, .benefit-card, .info-card, .job-card').forEach(c => {
      c.addEventListener('mousemove', e => {
        const r = c.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) / r.width;
        const y = (e.clientY - r.top - r.height / 2) / r.height;
        gsap.to(c, { rotateY: x * 6, rotateX: -y * 4, transformPerspective: 900, duration: .35, ease: 'power2.out' });
      });
      c.addEventListener('mouseleave', () => gsap.to(c, { rotateY: 0, rotateX: 0, duration: .5, ease: 'power3.out' }));
    });
  }

  /* About cards parallax */
  qa('.ac').forEach((c, i) => gsap.to(c, {
    y: (i - 1) * 30, ease: 'none',
    scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 1.2 }
  }));
}

/* ─────────────────────────────────────────────
   NEWSLETTER FORM
───────────────────────────────────────────── */
qa('.nl-f, #newsletterForm').forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.nl-btn, button[type="submit"]');
    const input = this.querySelector('input[type="email"]');
    if (!btn) return;
    const orig = btn.textContent;
    btn.textContent = '...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '✓ Subscribed!';
      btn.style.background = 'var(--gm)';
      if (input) input.value = '';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }, 900);
  });
});

/* ─────────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────────── */
const contactForm = q('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"], .btn-o');
    if (!btn) return;
    const orig = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = 'var(--gm)';
      this.reset();
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }, 1400);
  });
}

/* ─────────────────────────────────────────────
   GALLERY FILTER
───────────────────────────────────────────── */
qa('.gallery-filter').forEach(btn => {
  btn.addEventListener('click', function() {
    qa('.gallery-filter').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.dataset.filter;
    qa('.gallery-item').forEach(item => {
      const show = filter === 'all' || item.dataset.category === filter;
      if (show) {
        item.style.display = 'block';
        gsap.fromTo(item, { opacity: 0, scale: .95 }, { opacity: 1, scale: 1, duration: .35, ease: 'power2.out' });
      } else {
        item.style.display = 'none';
      }
    });
  });
});

/* ─────────────────────────────────────────────
   NEWS FILTER
───────────────────────────────────────────── */
qa('.news-filter').forEach(btn => {
  btn.addEventListener('click', function() {
    qa('.news-filter').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

/* ─────────────────────────────────────────────
   ACTIVE NAV LINK
───────────────────────────────────────────── */
function setActiveNav() {
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  qa('.n-ul > li').forEach(li => {
    const link = li.querySelector('a');
    if (!link) return;
    const href = link.getAttribute('href');
    const isHome = (currentPage === '' || currentPage === 'index.html') && href === 'index.html';
    if (href === currentPage || isHome) li.classList.add('act');
  });
}
setActiveNav();

/* ─────────────────────────────────────────────
   PRELOADER
───────────────────────────────────────────── */
const loader = q('#loader'), ldb = q('#ldb'), ldp = q('#ldp'), ldw = q('#ldw');

if (loader) {
  document.body.style.overflow = 'hidden';

  gsap.to(ldw, { opacity: 1, y: 0, duration: .6, delay: .1 });

  let p = 0;
  const iv = setInterval(() => {
    p += Math.random() * 12 + 5;
    if (p >= 100) {
      p = 100;
      clearInterval(iv);
      setTimeout(() => {
        gsap.to(loader, {
          yPercent: -100, duration: 1, ease: 'power4.inOut',
          onComplete: () => {
            loader.style.display = 'none';
            document.body.style.overflow = '';
            initReveals();
          }
        });
      }, 300);
    }
    if (ldb) ldb.style.width = p + '%';
    if (ldp) ldp.textContent = Math.floor(p) + '%';
  }, 100);
} else {
  window.addEventListener('load', initReveals);
}

/* ─────────────────────────────────────────────
   WINDOW RESIZE — refresh ScrollTrigger
───────────────────────────────────────────── */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
}, { passive: true });

/* ─────────────────────────────────────────────
   FIX IMAGES - Add fallback gradients
───────────────────────────────────────────── */
document.querySelectorAll('.page-hero-bg, .sl-bg, .pr-bg, .gallery-item-img, .property-gallery-main, .property-gallery-item').forEach(el => {
  if (!el.style.backgroundImage || el.style.backgroundImage === 'none') {
    const colors = [
      'linear-gradient(135deg, #0a1a10, #1a4a2e, #2d7a50)',
      'linear-gradient(135deg, #080d14, #121e30, #1e3560)',
      'linear-gradient(135deg, #0a1a08, #1a3a10, #2d5520)',
      'linear-gradient(135deg, #1a1000, #3a2800, #5a4200)',
      'linear-gradient(145deg, #04080a, #0d1e18, #163028)'
    ];
    el.style.backgroundImage = colors[Math.floor(Math.random() * colors.length)];
  }
});
/* ═══════════════════════════════════════════════
   TATU CITY MAP — Beautiful SVG Location Map
   Replaces Three.js canvas (hidden via CSS)
═══════════════════════════════════════════════ */
function initTatuMap() {
  const canvasEl = document.querySelector('#lc-cv');
  if (!canvasEl) return;
  const container = canvasEl.parentElement;
  if (!container) return;

  // Remove inline height/border from canvas container section
  const mapSection = canvasEl.closest('section');
  if (mapSection) {
    // Inject map before canvas
    const wrap = document.createElement('div');
    wrap.className = 'tatu-map-wrap';
    wrap.innerHTML = `
      <div class="tatu-map-inner">
        <svg viewBox="0 0 900 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Map showing Tatu City location relative to Nairobi, Kenya">
          <defs>
            <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stop-color="#0d1f15"/>
              <stop offset="100%" stop-color="#060f09"/>
            </radialGradient>
            <radialGradient id="tatuGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#e8521a" stop-opacity=".25"/>
              <stop offset="100%" stop-color="#e8521a" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="nbiGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#52b788" stop-opacity=".18"/>
              <stop offset="100%" stop-color="#52b788" stop-opacity="0"/>
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="6" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="rgba(82,183,136,.4)"/>
            </marker>
          </defs>

          <!-- Background -->
          <rect width="900" height="380" fill="url(#bgGrad)"/>

          <!-- Subtle grid -->
          <g stroke="rgba(82,183,136,.05)" stroke-width=".5">
            <line x1="0" y1="95" x2="900" y2="95"/><line x1="0" y1="190" x2="900" y2="190"/>
            <line x1="0" y1="285" x2="900" y2="285"/>
            <line x1="180" y1="0" x2="180" y2="380"/><line x1="360" y1="0" x2="360" y2="380"/>
            <line x1="540" y1="0" x2="540" y2="380"/><line x1="720" y1="0" x2="720" y2="380"/>
          </g>

          <!-- Topographic rings (abstract terrain) -->
          <ellipse cx="580" cy="200" rx="280" ry="160" fill="none" stroke="rgba(82,183,136,.04)" stroke-width="1"/>
          <ellipse cx="580" cy="200" rx="220" ry="120" fill="none" stroke="rgba(82,183,136,.05)" stroke-width="1"/>
          <ellipse cx="580" cy="200" rx="160" ry="90" fill="none" stroke="rgba(82,183,136,.07)" stroke-width="1"/>
          <ellipse cx="580" cy="200" rx="100" ry="60" fill="none" stroke="rgba(82,183,136,.06)" stroke-width="1"/>

          <!-- Nairobi CBD glow -->
          <ellipse cx="620" cy="215" rx="60" ry="45" fill="url(#nbiGlow)"/>

          <!-- Thika Superhighway (A2) -->
          <path d="M 820 20 Q 760 80 680 130 Q 640 165 620 215" stroke="rgba(82,183,136,.35)" stroke-width="3" fill="none" stroke-linecap="round"/>
          <!-- Label -->
          <text x="760" y="62" class="map-road-label" transform="rotate(-38,760,62)" fill="rgba(82,183,136,.45)" font-family="'DM Sans',sans-serif" font-size="7">Thika Road (A2)</text>

          <!-- Northern Bypass -->
          <path d="M 420 90 Q 500 105 560 130 Q 600 150 620 215" stroke="rgba(201,168,76,.25)" stroke-width="2" fill="none" stroke-linecap="round" stroke-dasharray="8,4"/>
          <text x="455" y="96" fill="rgba(201,168,76,.4)" font-family="'DM Sans',sans-serif" font-size="6.5">Northern Bypass</text>

          <!-- Ruiru-Kiambu Road (to Tatu City) -->
          <path d="M 330 145 Q 370 148 405 160 Q 445 175 465 205" stroke="rgba(232,82,26,.5)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <text x="335" y="140" fill="rgba(232,82,26,.55)" font-family="'DM Sans',sans-serif" font-size="6.5">Ruiru–Kiambu Rd</text>

          <!-- Connection line Tatu City to Nairobi -->
          <line x1="465" y1="205" x2="615" y2="213" stroke="rgba(82,183,136,.2)" stroke-width="1.5" stroke-dasharray="6,3" marker-end="url(#arrowhead)"/>

          <!-- JKIA Road hint bottom -->
          <path d="M 580 370 Q 590 310 600 260 Q 608 230 620 215" stroke="rgba(82,183,136,.2)" stroke-width="1.5" fill="none" stroke-dasharray="5,4"/>
          <text x="548" y="362" fill="rgba(82,183,136,.3)" font-family="'DM Sans',sans-serif" font-size="6.5">To JKIA</text>

          <!-- ── TATU CITY MARKER ── -->
          <!-- Outer pulse ring 1 -->
          <circle cx="465" cy="205" r="36" fill="none" stroke="rgba(232,82,26,.12)" stroke-width="1">
            <animate attributeName="r" from="28" to="50" dur="2.8s" repeatCount="indefinite"/>
            <animate attributeName="opacity" from=".5" to="0" dur="2.8s" repeatCount="indefinite"/>
          </circle>
          <!-- Outer pulse ring 2 (offset) -->
          <circle cx="465" cy="205" r="28" fill="none" stroke="rgba(232,82,26,.18)" stroke-width="1">
            <animate attributeName="r" from="20" to="42" dur="2.8s" begin="1.4s" repeatCount="indefinite"/>
            <animate attributeName="opacity" from=".6" to="0" dur="2.8s" begin="1.4s" repeatCount="indefinite"/>
          </circle>
          <!-- Territory circle -->
          <circle cx="465" cy="205" r="22" fill="rgba(232,82,26,.08)" stroke="rgba(232,82,26,.3)" stroke-width="1.5"/>
          <!-- Tatu glow -->
          <ellipse cx="465" cy="205" rx="55" ry="40" fill="url(#tatuGlow)"/>
          <!-- Marker pin -->
          <circle cx="465" cy="205" r="8" fill="#e8521a" filter="url(#glow)"/>
          <circle cx="465" cy="205" r="4" fill="#fff" opacity=".9"/>

          <!-- TATU CITY LABEL -->
          <rect x="388" y="162" width="118" height="32" rx="3" fill="rgba(8,18,11,.88)" stroke="rgba(232,82,26,.4)" stroke-width="1"/>
          <text x="447" y="178" text-anchor="middle" font-family="'Syne',sans-serif" font-size="9.5" font-weight="800" fill="#e8521a" letter-spacing="1.5">TATU CITY</text>
          <text x="447" y="189" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="6.5" fill="rgba(245,240,232,.45)" letter-spacing=".5">Ruiru, Kiambu County</text>
          <!-- Connector line label to pin -->
          <line x1="447" y1="194" x2="460" y2="203" stroke="rgba(232,82,26,.35)" stroke-width=".8"/>

          <!-- ── NAIROBI CBD MARKER ── -->
          <circle cx="620" cy="215" r="9" fill="rgba(82,183,136,.15)" stroke="rgba(82,183,136,.5)" stroke-width="1.5"/>
          <circle cx="620" cy="215" r="4" fill="#52b788"/>
          <!-- Nairobi label -->
          <rect x="631" y="203" width="88" height="26" rx="3" fill="rgba(8,18,11,.85)" stroke="rgba(82,183,136,.25)" stroke-width="1"/>
          <text x="675" y="217" text-anchor="middle" font-family="'Syne',sans-serif" font-size="8.5" font-weight="700" fill="#52b788" letter-spacing="1">NAIROBI CBD</text>
          <text x="675" y="226" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="6" fill="rgba(245,240,232,.35)">City Centre</text>

          <!-- ── JKIA MARKER ── -->
          <circle cx="595" cy="340" r="6" fill="rgba(201,168,76,.15)" stroke="rgba(201,168,76,.4)" stroke-width="1.5"/>
          <circle cx="595" cy="340" r="3" fill="#c9a84c"/>
          <text x="605" y="338" font-family="'Syne',sans-serif" font-size="7.5" font-weight="700" fill="rgba(201,168,76,.75)" letter-spacing=".8">JKIA</text>
          <text x="605" y="348" font-family="'DM Sans',sans-serif" font-size="6" fill="rgba(245,240,232,.3)">International Airport</text>

          <!-- ── DISTANCE CALLOUTS ── -->
          <!-- Distance badge: Tatu City to Nairobi -->
          <rect x="510" y="187" width="64" height="20" rx="10" fill="rgba(8,18,11,.9)" stroke="rgba(82,183,136,.3)" stroke-width="1"/>
          <text x="542" y="200" text-anchor="middle" font-family="'Syne',sans-serif" font-size="7.5" font-weight="700" fill="#52b788">~30 min</text>

          <!-- ── TATU CITY DETAILS (left panel) ── -->
          <rect x="20" y="20" width="190" height="270" rx="4" fill="rgba(8,18,11,.75)" stroke="rgba(232,82,26,.15)" stroke-width="1"/>
          <!-- Orange accent top -->
          <rect x="20" y="20" width="190" height="3" rx="2" fill="var(#e8521a)"/>
          <rect x="20" y="20" width="190" height="3" fill="#e8521a"/>

          <text x="36" y="45" font-family="'Syne',sans-serif" font-size="8" font-weight="800" fill="#e8521a" letter-spacing="2">TATU CITY</text>
          <text x="36" y="57" font-family="'DM Sans',sans-serif" font-size="6.5" fill="rgba(245,240,232,.35)" letter-spacing=".3">Africa's Leading New City</text>

          <line x1="36" y1="65" x2="194" y2="65" stroke="rgba(255,255,255,.06)" stroke-width=".8"/>

          <!-- Stats in panel -->
          <text x="36" y="84" font-family="'Cormorant Garamond',serif" font-size="18" font-weight="600" fill="#c9a84c">5,000</text>
          <text x="36" y="93" font-family="'DM Sans',sans-serif" font-size="6" fill="rgba(245,240,232,.38)" letter-spacing=".5">ACRES TOTAL</text>

          <text x="120" y="84" font-family="'Cormorant Garamond',serif" font-size="18" font-weight="600" fill="#c9a84c">900</text>
          <text x="120" y="93" font-family="'DM Sans',sans-serif" font-size="6" fill="rgba(245,240,232,.38)" letter-spacing=".5">AC INDUSTRIAL</text>

          <line x1="36" y1="100" x2="194" y2="100" stroke="rgba(255,255,255,.05)" stroke-width=".8"/>

          <!-- Zones inside panel -->
          <g transform="translate(36, 110)">
            <rect x="0" y="0" width="7" height="7" fill="#e8521a" rx="1"/>
            <text x="11" y="7" font-family="'DM Sans',sans-serif" font-size="7" fill="rgba(245,240,232,.65)">Residential Zones</text>
            <rect x="0" y="16" width="7" height="7" fill="#1f5c2e" rx="1"/>
            <text x="11" y="23" font-family="'DM Sans',sans-serif" font-size="7" fill="rgba(245,240,232,.65)">Industrial Park (SEZ)</text>
            <rect x="0" y="32" width="7" height="7" fill="#c9a84c" rx="1"/>
            <text x="11" y="39" font-family="'DM Sans',sans-serif" font-size="7" fill="rgba(245,240,232,.65)">Commercial District</text>
            <rect x="0" y="48" width="7" height="7" fill="#52b788" rx="1"/>
            <text x="11" y="55" font-family="'DM Sans',sans-serif" font-size="7" fill="rgba(245,240,232,.65)">Wildlife Sanctuary</text>
            <rect x="0" y="64" width="7" height="7" fill="#2d8c4e" rx="1"/>
            <text x="11" y="71" font-family="'DM Sans',sans-serif" font-size="7" fill="rgba(245,240,232,.65)">Schools &amp; Education</text>
          </g>

          <line x1="36" y1="198" x2="194" y2="198" stroke="rgba(255,255,255,.05)" stroke-width=".8"/>

          <text x="36" y="215" font-family="'Syne',sans-serif" font-size="6.5" font-weight="700" fill="rgba(82,183,136,.7)" letter-spacing="1">COORDINATES</text>
          <text x="36" y="228" font-family="'DM Sans',sans-serif" font-size="7" fill="rgba(245,240,232,.4)">1.0526° S, 36.9698° E</text>
          <text x="36" y="243" font-family="'Syne',sans-serif" font-size="6.5" font-weight="700" fill="rgba(82,183,136,.7)" letter-spacing="1">COUNTY</text>
          <text x="36" y="256" font-family="'DM Sans',sans-serif" font-size="7" fill="rgba(245,240,232,.4)">Kiambu County, Kenya</text>
          <text x="36" y="275" font-family="'Syne',sans-serif" font-size="7" font-weight="700" fill="#e8521a" letter-spacing=".8">Kenya's #1 SEZ</text>

          <!-- Compass rose (bottom right) -->
          <g transform="translate(845,345)">
            <circle cx="0" cy="0" r="18" fill="rgba(8,18,11,.7)" stroke="rgba(82,183,136,.2)" stroke-width="1"/>
            <line x1="0" y1="-12" x2="0" y2="12" stroke="rgba(255,255,255,.2)" stroke-width=".8"/>
            <line x1="-12" y1="0" x2="12" y2="0" stroke="rgba(255,255,255,.2)" stroke-width=".8"/>
            <polygon points="0,-12 -3,-5 3,-5" fill="#e8521a"/>
            <polygon points="0,12 -3,5 3,5" fill="rgba(255,255,255,.2)"/>
            <text x="0" y="-14" text-anchor="middle" font-family="'Syne',sans-serif" font-size="7" font-weight="700" fill="#e8521a">N</text>
          </g>

          <!-- Scale bar -->
          <g transform="translate(720, 350)">
            <line x1="0" y1="0" x2="60" y2="0" stroke="rgba(82,183,136,.4)" stroke-width="1.5"/>
            <line x1="0" y1="-4" x2="0" y2="4" stroke="rgba(82,183,136,.4)" stroke-width="1.5"/>
            <line x1="60" y1="-4" x2="60" y2="4" stroke="rgba(82,183,136,.4)" stroke-width="1.5"/>
            <text x="30" y="-7" text-anchor="middle" font-family="'DM Sans',sans-serif" font-size="6.5" fill="rgba(245,240,232,.35)">15 km</text>
          </g>
        </svg>
      </div>
      <div class="map-stats-bar">
        <div class="map-stat-item">
          <span class="map-stat-icon">🚗</span>
          <div class="map-stat-text"><strong>~30 min</strong>Nairobi CBD</div>
        </div>
        <div class="map-stat-item">
          <span class="map-stat-icon">✈️</span>
          <div class="map-stat-text"><strong>~40 min</strong>JKIA Airport</div>
        </div>
        <div class="map-stat-item">
          <span class="map-stat-icon">🛣️</span>
          <div class="map-stat-text"><strong>Direct Access</strong>Thika Road (A2)</div>
        </div>
        <div class="map-stat-item">
          <span class="map-stat-icon">📍</span>
          <div class="map-stat-text"><strong>Ruiru</strong>Kiambu County</div>
        </div>
      </div>
    `;
    canvasEl.parentElement.insertBefore(wrap, canvasEl);
  }
}

document.addEventListener('DOMContentLoaded', initTatuMap);
// Also try immediately in case DOM is already loaded
if (document.readyState !== 'loading') initTatuMap();

/* ═══════════════════════════════════════════════
   CONTACT FORM — handle submit
═══════════════════════════════════════════════ */
(function() {
  const form = document.querySelector('#contactForm');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = 'Message Sent ✓';
    btn.style.background = 'var(--gm)';
    btn.disabled = true;
    setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; btn.disabled = false; form.reset(); }, 3500);
  });
})();

/* ═══════════════════════════════════════════════
   ACTIVE NAV LINK
═══════════════════════════════════════════════ */
(function() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.n-ul > li > a').forEach(a => {
    if (a.getAttribute('href') === page) {
      a.closest('li').classList.add('act');
    }
  });
})();