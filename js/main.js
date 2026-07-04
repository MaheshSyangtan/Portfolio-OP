/* ============================================================
   CYBERSECURITY PORTFOLIO — MAIN JAVASCRIPT
   Handles: Navigation, Terminal Simulation, Counters,
            Particles, Scroll Reveal, Contact Form
   ============================================================ */

'use strict';

/* ==================== NAVIGATION ==================== */
const navHeader   = document.getElementById('nav-header');
const navToggle   = document.getElementById('nav-toggle');
const mobileNav   = document.getElementById('mobile-nav-overlay');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');
const navLinks    = document.querySelectorAll('.nav-link');
const backToTop   = document.getElementById('back-to-top');
const footerYear  = document.getElementById('footer-year');

// Set footer year
if (footerYear) footerYear.textContent = new Date().getFullYear();

// Sticky nav + scroll effects
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Add 'scrolled' class
  navHeader.classList.toggle('scrolled', scrollY > 20);

  // Back to top visibility
  backToTop.classList.toggle('visible', scrollY > 400);

  // Active nav link highlighting
  updateActiveNavLink();

  lastScroll = scrollY;
}, { passive: true });

// Active nav link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}

// Mobile nav toggle
navToggle.addEventListener('click', () => {
  const isOpen = navToggle.classList.toggle('open');
  document.body.style.overflow = isOpen ? 'hidden' : '';

  if (isOpen) {
    mobileNav.style.display = 'flex';
    requestAnimationFrame(() => mobileNav.classList.add('open'));
  } else {
    closeMobileNav();
  }
});

function closeMobileNav() {
  navToggle.classList.remove('open');
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => {
    if (!mobileNav.classList.contains('open')) mobileNav.style.display = '';
  }, 300);
}

mobileLinks.forEach(link => {
  link.addEventListener('click', closeMobileNav);
});

mobileNav.addEventListener('click', (e) => {
  if (e.target === mobileNav) closeMobileNav();
});

// Back to top
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ==================== HERO TYPE ANIMATION ==================== */
const titles = [
  'Engineer',
  'Penetration Tester',
  'Threat Hunter',
  'AppSec Specialist',
  'GRC Analyst',
];
let titleIndex = 0;
let charIndex  = 0;
let isDeleting = false;
const dynamicEl = document.getElementById('hero-title-dynamic');

function typeTitle() {
  if (!dynamicEl) return;
  const current = titles[titleIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  dynamicEl.textContent = current.substring(0, charIndex);

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    delay = 2200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    delay = 400;
  }

  setTimeout(typeTitle, delay);
}

typeTitle();

/* ==================== TERMINAL SIMULATION ==================== */
const terminalOutput = document.getElementById('terminal-output');

const terminalScript = [
  { delay: 200,  type: 'cmd',    content: 'whoami' },
  { delay: 400,  type: 'output', content: '▸ mahesh_syangtan :: penetration_tester :: threat_hunter :: appsec', cls: 'term-success' },
  { delay: 900,  type: 'cmd',    content: 'nmap -sV --script vuln portfolio.local' },
  { delay: 1100, type: 'output', content: 'Starting Nmap 7.94 — https://nmap.org', cls: 'term-info' },
  { delay: 1300, type: 'output', content: 'Host: portfolio.local (127.0.0.1) — Status: Up', cls: 'term-output-line' },
  { delay: 1500, type: 'output', content: 'PORT    STATE  SERVICE   VERSION', cls: 'term-output-line' },
  { delay: 1700, type: 'output', content: '443/tcp  open  https    nginx 1.24.0 (TLS 1.3)', cls: 'term-output-line' },
  { delay: 2000, type: 'output', content: '| ssl-cert: Subject: CN=portfolio.local', cls: 'term-output-line' },
  { delay: 2200, type: 'output', content: '| Nmap done: 0 vulnerabilities found ✓', cls: 'term-success' },
  { delay: 2700, type: 'cmd',    content: 'cat skills.txt | grep -i "top"' },
  { delay: 2900, type: 'output', content: '★  Python · Bash · Burp Suite · Metasploit · Splunk · AWS · Wireshark', cls: 'term-output-line' },
  { delay: 3400, type: 'cmd',    content: 'cat certifications.txt' },
  { delay: 3600, type: 'output', content: '[*] eJPT (Pursuing)  |  Security+ (Pursuing)  |  THM Top 10%  |  HTB Active', cls: 'term-info' },
  { delay: 4200, type: 'cmd',    content: 'echo "Available for collaboration — let\'s build something secure."' },
  { delay: 4400, type: 'output', content: 'Available for collaboration — let\'s build something secure. 🔐', cls: 'term-success' },
];

function renderTerminalLine(item) {
  const span = document.createElement('span');
  span.classList.add('term-line');

  if (item.type === 'cmd') {
    span.innerHTML = `<span class="term-prompt">visitor@portfolio:~$</span> <span class="term-cmd">${escapeHtml(item.content)}</span>`;
  } else {
    span.classList.add(item.cls || 'term-output-line');
    span.textContent = item.content;
  }

  terminalOutput.appendChild(span);
  // Auto-scroll inside terminal
  const body = document.getElementById('terminal-body');
  if (body) body.scrollTop = body.scrollHeight;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function runTerminal() {
  if (!terminalOutput) return;
  terminalScript.forEach(item => {
    setTimeout(() => renderTerminalLine(item), item.delay);
  });
}

// Run terminal when hero is visible (IntersectionObserver)
const heroSection = document.getElementById('home');
let terminalHasRun = false;

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !terminalHasRun) {
      terminalHasRun = true;
      runTerminal();
    }
  });
}, { threshold: 0.2 });

if (heroSection) heroObserver.observe(heroSection);

/* ==================== PARTICLE SYSTEM ==================== */
const canvas  = document.getElementById('particle-canvas');
const ctx     = canvas ? canvas.getContext('2d') : null;
let particles = [];
let animFrame;

function resizeCanvas() {
  if (!canvas) return;
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas, { passive: true });

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x     = Math.random() * canvas.width;
    this.y     = Math.random() * canvas.height;
    this.size  = Math.random() * 1.5 + 0.5;
    this.vx    = (Math.random() - 0.5) * 0.3;
    this.vy    = (Math.random() - 0.5) * 0.3;
    this.alpha = Math.random() * 0.5 + 0.1;
    const hue  = Math.random() > 0.6 ? 150 : Math.random() > 0.5 ? 195 : 160;
    this.color = `hsla(${hue}, 100%, 60%, ${this.alpha})`;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function initParticles() {
  if (!ctx) return;
  const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
  particles = Array.from({ length: count }, () => new Particle());
  animateParticles();
}

function animateParticles() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });

  // Draw connecting lines
  particles.forEach((p1, i) => {
    particles.slice(i + 1).forEach(p2 => {
      const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 255, 102, ${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    });
  });

  animFrame = requestAnimationFrame(animateParticles);
}

initParticles();

/* ==================== COUNTER ANIMATION ==================== */
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start    = performance.now();

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else {
      const suffix = el.dataset.suffix !== undefined ? el.dataset.suffix : (target >= 100 ? '+' : '');
      el.textContent = target + suffix;
    }
  }

  requestAnimationFrame(update);
}

/* ==================== SCROLL REVEAL ==================== */
function setupScrollReveal() {
  // Add reveal class to key elements
  const revealTargets = [
    '.about-card', '.stat-card',
    '.skill-category-card', '.project-card',
    '.cert-card', '.education-item',
    '.contact-info-col', '.contact-form',
    '.section-header',
  ];

  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('reveal');
    });
  });

  const statNumbers = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Fire counters when stat card appears
        if (entry.target.classList.contains('stat-card')) {
          const num = entry.target.querySelector('.stat-number');
          if (num && num.textContent === '0') animateCounter(num);
        }

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

setupScrollReveal();

/* ==================== CONTACT FORM ==================== */
const form         = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');
const submitBtn    = document.getElementById('contact-submit');
const submitText   = submitBtn ? submitBtn.querySelector('.btn-submit-text') : null;

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const name    = document.getElementById('contact-name');
    const email   = document.getElementById('contact-email-input');
    const subject = document.getElementById('contact-subject');
    const message = document.getElementById('contact-message');

    let isValid = true;

    if (!name.value.trim()) {
      markError(name, 'Name is required.');
      isValid = false;
    }

    if (!email.value.trim() || !isValidEmail(email.value)) {
      markError(email, 'A valid email address is required.');
      isValid = false;
    }

    if (!subject.value.trim()) {
      markError(subject, 'Subject is required.');
      isValid = false;
    }

    if (!message.value.trim()) {
      markError(message, 'Message is required.');
      isValid = false;
    }

    if (!isValid) {
      showFeedback('error-msg', '⚠ Please fix the highlighted fields before submitting.');
      return;
    }

    // Submit form via Formspree
    setSubmitting(true);

    try {
      const formData = new FormData(form);

      const response = await fetch('https://formspree.io/f/xnjkowoq', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      setSubmitting(false);

      if (response.ok) {
        form.reset();
        showFeedback('success', '✓ Message sent securely. I\'ll respond within 24 hours.');
      } else {
        const result = await response.json();
        showFeedback('error-msg', `⚠ Error: ${result.errors ? result.errors.map(e => e.message).join(', ') : 'Submission failed.'}`);
      }
    } catch (error) {
      setSubmitting(false);
      showFeedback('error-msg', '⚠ Network error. Please check your internet connection and try again.');
    }
  });
}

function markError(field, _msg) {
  field.classList.add('error');
  field.addEventListener('input', () => field.classList.remove('error'), { once: true });
}

function clearErrors() {
  form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  if (formFeedback) {
    formFeedback.className = 'form-feedback';
    formFeedback.textContent = '';
  }
}

function showFeedback(type, msg) {
  if (!formFeedback) return;
  formFeedback.className = `form-feedback ${type}`;
  formFeedback.textContent = msg;

  if (type === 'success') {
    setTimeout(() => {
      formFeedback.className = 'form-feedback';
      formFeedback.textContent = '';
    }, 5000);
  }
}

function setSubmitting(loading) {
  if (!submitBtn || !submitText) return;
  submitBtn.disabled = loading;
  submitText.textContent = loading ? 'Sending…' : 'Send Message';
  submitBtn.style.opacity = loading ? '0.7' : '1';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ==================== SMOOTH SECTION LINKS ==================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ==================== KEYBOARD ACCESSIBILITY ==================== */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
    closeMobileNav();
  }
});

/* ==================== CURSOR GLOW EFFECT (Optional) ==================== */
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth)  * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  document.documentElement.style.setProperty('--cursor-x', `${x}%`);
  document.documentElement.style.setProperty('--cursor-y', `${y}%`);
}, { passive: true });

console.log(
  '%c[+] Portfolio loaded successfully.',
  'color: #00ff66; font-family: monospace; font-size: 14px;'
);
console.log(
  '%c[*] Built with: HTML5 | CSS3 | Vanilla JS',
  'color: #00d4ff; font-family: monospace; font-size: 12px;'
);
