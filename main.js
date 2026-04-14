// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ===== CURSOR ===== */
const cur = document.getElementById('cur'), ring = document.getElementById('ring');
let mx = 0, my = 0, rx = 0, ry = 0;

if (cur && ring) {
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
  
  document.querySelectorAll('a, button, .hoverable').forEach(el => {
    el.addEventListener('mouseenter', () => { cur.classList.add('hv'); ring.classList.add('hv'); });
    el.addEventListener('mouseleave', () => { cur.classList.remove('hv'); ring.classList.remove('hv'); });
  });
}

/* ===== NAV SCROLL ===== */
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => nav.classList.toggle('sc', scrollY > 70), { passive: true });
}

/* ===== PROGRESS ===== */
const prog = document.getElementById('prog');
if (prog) {
  window.addEventListener('scroll', () => {
    prog.style.width = (scrollY / (document.documentElement.scrollHeight - innerHeight) * 100) + '%';
  }, { passive: true });
}

/* ===== SCROLL TOP ===== */
const ftop = document.getElementById('ftop');
if (ftop) {
  window.addEventListener('scroll', () => ftop.classList.toggle('sh', scrollY > 500), { passive: true });
  ftop.addEventListener('click', () => gsap.to(window, { scrollTo: 0, duration: 1, ease: 'power3.inOut' }));
}

/* ===== MOBILE MENU ===== */
const ham = document.getElementById('ham'), mob = document.getElementById('mob');
if (ham && mob) {
  ham.addEventListener('click', () => {
    const o = mob.classList.toggle('op');
    ham.classList.toggle('op', o);
    ham.setAttribute('aria-expanded', o);
    document.body.style.overflow = o ? 'hidden' : '';
  });
  document.querySelectorAll('#mob a').forEach(a => a.addEventListener('click', () => {
    mob.classList.remove('op');
    ham.classList.remove('op');
    ham.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  }));
}

/* ===== SMOOTH ANCHOR ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  const href = a.getAttribute('href');
  if (href === '#') return;
  const t = document.querySelector(href);
  if (t) {
    e.preventDefault();
    gsap.to(window, { scrollTo: { y: t, offsetY: 80 }, duration: 1.1, ease: 'power3.inOut' });
  }
}));

/* ===== HERO SLIDESHOW ===== */
const slides = document.querySelectorAll('.sl'), dots = document.querySelectorAll('.hd'), cnt = document.getElementById('hcnt');
let cur_sl = 0, auto, paused = false;

function goTo(i) {
  if (!slides.length) return;
  slides[cur_sl].classList.remove('act');
  if (dots[cur_sl]) {
    dots[cur_sl].classList.remove('act');
    dots[cur_sl].setAttribute('aria-selected', false);
  }
  cur_sl = (i + slides.length) % slides.length;
  slides[cur_sl].classList.add('act');
  if (dots[cur_sl]) {
    dots[cur_sl].classList.add('act');
    dots[cur_sl].setAttribute('aria-selected', true);
  }
  if (cnt) cnt.textContent = String(cur_sl + 1).padStart(2, '0');
}

function startAuto() {
  if (auto) clearInterval(auto);
  auto = setInterval(() => goTo(cur_sl + 1), 6000);
}
function stopAuto() { if (auto) clearInterval(auto); }

if (slides.length) {
  startAuto();
  const hnext = document.getElementById('hnext');
  const hprev = document.getElementById('hprev');
  if (hnext) hnext.addEventListener('click', () => { stopAuto(); goTo(cur_sl + 1); if (!paused) startAuto(); });
  if (hprev) hprev.addEventListener('click', () => { stopAuto(); goTo(cur_sl - 1); if (!paused) startAuto(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { stopAuto(); goTo(i); if (!paused) startAuto(); }));
  
  const hero = document.getElementById('hero');
  if (hero) {
    hero.addEventListener('mouseenter', () => { paused = true; stopAuto(); });
    hero.addEventListener('mouseleave', () => { paused = false; startAuto(); });
    let tx = 0;
    hero.addEventListener('touchstart', e => tx = e.touches[0].clientX, { passive: true });
    hero.addEventListener('touchend', e => {
      const d = tx - e.changedTouches[0].clientX;
      if (Math.abs(d) > 50) { stopAuto(); d > 0 ? goTo(cur_sl + 1) : goTo(cur_sl - 1); startAuto(); }
    }, { passive: true });
  }
}

/* ===== THREE.JS LOCATION MAP ===== */
(function() {
  const c = document.getElementById('lc-cv');
  if (!c || typeof THREE === 'undefined') return;
  const w = c.offsetWidth || 580, h = c.offsetHeight || 480;
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
  
  const ringMesh = new THREE.Mesh(new THREE.RingGeometry(1.4, 1.7, 32), 
    new THREE.MeshBasicMaterial({ color: 0xe8521a, side: THREE.DoubleSide, transparent: true, opacity: .9 }));
  ringMesh.rotation.x = -Math.PI / 2;
  ringMesh.position.y = .05;
  scene.add(ringMesh);
  
  const rm = new THREE.LineBasicMaterial({ color: 0x2d8c4e, transparent: true, opacity: .5 });
  [[[-15, 0, 0], [15, 0, 0]], [[0, 0, -15], [0, 0, 15]], 
   [[-10, 0, -8], [-10, 0, 8]], [[10, 0, -8], [10, 0, 8]]].forEach(pts => {
    const g = new THREE.BufferGeometry().setFromPoints(pts.map(p => new THREE.Vector3(p[0], p[1], p[2])));
    scene.add(new THREE.Line(g, rm));
  });
  
  scene.add(new THREE.AmbientLight(0x1a3a2a, .9));
  const pl = new THREE.PointLight(0xe8521a, 2, 20);
  pl.position.set(0, 6, 0);
  scene.add(pl);
  const pl2 = new THREE.PointLight(0xc9a84c, 1, 30);
  pl2.position.set(-8, 8, -5);
  scene.add(pl2);
  
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
})();

/* ===== GSAP REVEALS ===== */
function initReveals() {
  gsap.utils.toArray('.rv').forEach((el, i) => gsap.fromTo(el, 
    { opacity: 0, y: 50 }, 
    { opacity: 1, y: 0, duration: .9, ease: 'power3.out', delay: i * .04, 
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } }));
  
  gsap.utils.toArray('.rv-l').forEach(el => gsap.fromTo(el, 
    { opacity: 0, x: -55 }, 
    { opacity: 1, x: 0, duration: 1, ease: 'power3.out', 
      scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' } }));
  
  gsap.utils.toArray('.rv-r').forEach(el => gsap.fromTo(el, 
    { opacity: 0, x: 55 }, 
    { opacity: 1, x: 0, duration: 1, ease: 'power3.out', 
      scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' } }));
  
  gsap.utils.toArray('.rv-s').forEach((el, i) => gsap.fromTo(el, 
    { opacity: 0, scale: .9 }, 
    { opacity: 1, scale: 1, duration: .85, ease: 'power3.out', delay: i * .07, 
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } }));
  
  /* Counters */
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    ScrollTrigger.create({
      trigger: el, start: 'top 88%',
      onEnter: () => {
        gsap.to({ v: 0 }, {
          v: target, duration: 2.2, ease: 'power2.out',
          onUpdate() { 
            el.textContent = Number.isInteger(target) ? Math.floor(this.targets()[0].v).toLocaleString() : this.targets()[0].v.toFixed(1); 
          }
        });
      }
    });
  });
  
  /* Hero parallax */
  ScrollTrigger.create({
    trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true,
    onUpdate: (s) => gsap.set('.h-c', { y: s.progress * 80 })
  });
  
  /* 3D tilt on cards */
  document.querySelectorAll('.feat, .sz-c, .rc-p, .pr, .nc').forEach(c => {
    c.addEventListener('mousemove', e => {
      const r = c.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / r.width;
      const y = (e.clientY - r.top - r.height / 2) / r.height;
      gsap.to(c, { rotateY: x * 8, rotateX: -y * 6, transformPerspective: 900, duration: .4, ease: 'power2.out' });
    });
    c.addEventListener('mouseleave', () => gsap.to(c, { rotateY: 0, rotateX: 0, duration: .6, ease: 'power3.out' }));
  });
  
  /* About cards parallax */
  document.querySelectorAll('.ac').forEach((c, i) => gsap.to(c, { 
    y: (i - 1) * 40, ease: 'none', 
    scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 1.5 } 
  }));
}

/* ===== NEWSLETTER FORM ===== */
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.nl-btn');
    if (btn) {
      const originalText = btn.textContent;
      btn.textContent = '...';
      setTimeout(() => {
        btn.textContent = '✓ Done!';
        btn.style.background = 'var(--gm)';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
        }, 3000);
      }, 1000);
    }
  });
}

/* Fallback for standalone nl-btn clicks */
document.querySelectorAll('.nl-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const form = this.closest('form');
    if (!form) {
      e.preventDefault();
      const o = this.textContent;
      this.textContent = '...';
      setTimeout(() => {
        this.textContent = '✓ Done!';
        this.style.background = 'var(--gm)';
        setTimeout(() => {
          this.textContent = o;
          this.style.background = '';
        }, 3000);
      }, 1000);
    }
  });
});

/* ===== PRELOADER ===== */
const loader = document.getElementById('loader'), ldb = document.getElementById('ldb'), 
      ldp = document.getElementById('ldp'), ldw = document.getElementById('ldw');

if (loader) {
  gsap.to(ldw, { opacity: 1, y: 0, duration: .7, delay: .1 });
  let p = 0;
  const iv = setInterval(() => {
    p += Math.random() * 14 + 4;
    if (p >= 100) {
      p = 100;
      clearInterval(iv);
      setTimeout(() => {
        gsap.to(loader, {
          yPercent: -100, duration: 1.1, ease: 'power4.inOut',
          onComplete: () => {
            loader.style.display = 'none';
            initReveals();
          }
        });
      }, 350);
    }
    if (ldb) ldb.style.width = p + '%';
    if (ldp) ldp.textContent = Math.floor(p) + '%';
  }, 100);
} else {
  // If no preloader, initialize reveals immediately
  window.addEventListener('load', initReveals);
}