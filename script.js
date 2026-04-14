/* ════════════════════════════════════════════════
   KODEKREATIF — SCRIPT
   21st.dev inspired interactions
════════════════════════════════════════════════ */

/* ─── Cursor glow ────────────────────────────── */
const glow = document.createElement('div');
glow.className = 'cursor-glow';
document.body.appendChild(glow);
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
});
function animateGlow() {
  glowX += (mouseX - glowX) * 0.08;
  glowY += (mouseY - glowY) * 0.08;
  glow.style.left = glowX + 'px';
  glow.style.top  = glowY + 'px';
  requestAnimationFrame(animateGlow);
}
animateGlow();

/* ─── Nav scroll ─────────────────────────────── */
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });

/* ─── Mobile menu ────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const menuClose  = document.getElementById('menuClose');
hamburger.addEventListener('click',  () => mobileMenu.classList.add('open'));
menuClose.addEventListener('click',  () => mobileMenu.classList.remove('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

/* ─── Scroll reveal ──────────────────────────── */
const revealTargets = document.querySelectorAll([
  '.service-card', '.work-card', '.testimonial-card',
  '.client-logo', '.process-step', '.tech-item',
  '.about__text', '.about__visual', '.contact__text',
  '.contact__form', '.section-header',
  '.testimonials__grid', '.footer__brand', '.footer__links'
].join(', '));

revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => revealObserver.observe(el));

/* ─── 3D Tilt on service cards ───────────────── */
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 14;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -14;
    card.style.transform = `translateY(-8px) perspective(600px) rotateX(${y}deg) rotateY(${x}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform .5s ease';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform .1s ease, border-color .3s ease, box-shadow .3s ease';
  });
});

/* ─── Magnetic buttons ───────────────────────── */
document.querySelectorAll('.btn--primary').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width  / 2);
    const dy = e.clientY - (rect.top  + rect.height / 2);
    btn.style.transform = `translate(${dx * 0.18}px, ${dy * 0.18 - 2}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    btn.style.transition = 'all .4s cubic-bezier(.4,0,.2,1)';
  });
  btn.addEventListener('mouseenter', () => {
    btn.style.transition = 'all .1s ease';
  });
});

/* ─── Counter animation ──────────────────────── */
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

function animateValue(el, target, duration = 1800) {
  const raw   = el.textContent;
  const hasPct = raw.includes('%');
  const hasPlus = raw.includes('+');
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const val = Math.round(target * easeOutCubic(progress));
    el.textContent = val + (hasPlus ? '+' : '') + (hasPct ? '%' : '');
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statsBlock = document.querySelector('.hero__stats');
let statsAnimated = false;
if (statsBlock) {
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      statsBlock.querySelectorAll('.stat__number').forEach(el => {
        const n = parseInt(el.textContent.replace(/\D/g, ''));
        animateValue(el, n);
      });
    }
  }, { threshold: 0.5 }).observe(statsBlock);
}

/* ─── Typing effect — hero sub ───────────────── */
(function () {
  const phrases = [
    'Web Applications & APIs',
    'Mobile Experiences',
    'Cloud Architecture',
    'Scalable Backend Systems',
  ];
  const target = document.querySelector('.hero__sub');
  if (!target) return;

  const baseText = 'Kodekreatif is a software development studio specializing in ';
  let pi = 0, ci = 0, deleting = false;

  function type() {
    const phrase = phrases[pi];
    if (!deleting) {
      target.innerHTML = baseText + '<span class="typing-span">' + phrase.slice(0, ci + 1) + '<span class="cursor-blink">|</span></span>';
      ci++;
      if (ci === phrase.length) { deleting = true; setTimeout(type, 2200); return; }
    } else {
      target.innerHTML = baseText + '<span class="typing-span">' + phrase.slice(0, ci - 1) + '<span class="cursor-blink">|</span></span>';
      ci--;
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(type, deleting ? 40 : 65);
  }
  setTimeout(type, 1200);
})();

/* Inject cursor blink style */
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
  .cursor-blink {
    display: inline-block;
    width: 2px;
    background: rgba(255,255,255,.85);
    margin-left: 2px;
    animation: blink .8s step-start infinite;
    border-radius: 1px;
    vertical-align: text-bottom;
    height: 1em;
  }
  @keyframes blink {
    50% { opacity: 0; }
  }
  .typing-span { color: #93c5fd; font-weight: 600; }
`;
document.head.appendChild(cursorStyle);

/* ─── Spotlight effect on work cards ─────────── */
document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    card.querySelector('.work-card__img').style.setProperty('--mx', x + '%');
    card.querySelector('.work-card__img').style.setProperty('--my', y + '%');
  });
});

/* Inject spotlight style */
const spotlightStyle = document.createElement('style');
spotlightStyle.textContent = `
  .work-card__img {
    --mx: 50%; --my: 50%;
  }
  .work-card:hover .work-card__img::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,.12) 0%, transparent 55%);
    pointer-events: none;
    z-index: 0;
    transition: none;
  }
`;
document.head.appendChild(spotlightStyle);

/* ─── Smooth active nav highlighting ─────────── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  const isScrolled = nav.classList.contains('scrolled');
  navLinks.forEach(link => {
    const isActive = link.getAttribute('href') === `#${current}`;
    if (isActive) {
      link.style.color = isScrolled ? 'var(--blue)' : 'var(--white)';
    } else {
      link.style.color = '';
    }
  });
}, { passive: true });

/* ─── Form submit ────────────────────────────── */
const form    = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const origHTML = btn.innerHTML;
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="animation:spin .7s linear infinite"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2.5" stroke-dasharray="60" stroke-dashoffset="20" stroke-linecap="round"/></svg> Sending…';
    btn.disabled = true;

    const spinStyle = document.createElement('style');
    spinStyle.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
    document.head.appendChild(spinStyle);

    setTimeout(() => {
      success.classList.add('show');
      form.reset();
      btn.innerHTML = origHTML;
      btn.disabled = false;
      setTimeout(() => success.classList.remove('show'), 5000);
    }, 1500);
  });
}

/* ─── Parallax hero grid ─────────────────────── */
const heroGrid = document.querySelector('.hero__bg-grid');
if (heroGrid) {
  window.addEventListener('scroll', () => {
    heroGrid.style.transform = `translateY(${window.scrollY * 0.25}px)`;
  }, { passive: true });
}
