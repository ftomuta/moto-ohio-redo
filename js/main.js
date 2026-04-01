/* ============================================================
   MOTO OHIO — main.js
   ============================================================ */

// ── Nav scroll effect ─────────────────────────────────────────
const nav = document.querySelector('.site-nav');
const isHeroPage = !!document.querySelector('.hero');

function applyNavScroll() {
  if (!nav) return;
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
    nav.classList.remove('hero-nav');
  } else {
    // Only go transparent on pages that have a full-bleed hero image.
    // On all other pages, always keep the solid dark background.
    if (isHeroPage) {
      nav.classList.remove('scrolled');
      nav.classList.add('hero-nav');
    }
    // non-hero pages: leave 'scrolled' class in place (set in HTML)
  }
}
window.addEventListener('scroll', applyNavScroll, { passive: true });
applyNavScroll();

// ── Mark active nav link ──────────────────────────────────────
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// ── Hamburger / mobile drawer ─────────────────────────────────
const toggle = document.getElementById('nav-toggle');
const drawer = document.getElementById('nav-drawer');
if (toggle && drawer) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    drawer.classList.toggle('open', !open);
    document.body.style.overflow = open ? '' : 'hidden';
  });
  // Close on drawer link click
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── Accordion ─────────────────────────────────────────────────
document.querySelectorAll('.accordion-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const panel = btn.nextElementSibling;
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    // Close all others in same accordion
    const accordion = btn.closest('.accordion');
    if (accordion) {
      accordion.querySelectorAll('.accordion-btn').forEach(other => {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          other.nextElementSibling.classList.remove('open');
        }
      });
    }
    btn.setAttribute('aria-expanded', String(!expanded));
    panel.classList.toggle('open', !expanded);
  });
});

// ── Scroll-triggered fade-up ──────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.animationPlayState = 'running';
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});

// ── Contact form ──────────────────────────────────────────────
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = '✔ Message Sent!';
    btn.disabled = true;
    btn.style.background = '#2d6a4f';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      btn.style.background = '';
      contactForm.reset();
    }, 3500);
  });
}
