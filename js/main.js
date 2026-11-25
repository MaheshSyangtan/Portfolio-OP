/* ============================================================
   CYBERSECURITY PORTFOLIO - MAIN JAVASCRIPT
   Handles: Navigation, Terminal Simulation, Counters,
            Particles, Scroll Reveal, Contact Form
   ============================================================ */

'use strict';

/* ==================== NAVIGATION ==================== */
const navHeader     = document.getElementById('nav-header');
const navToggle     = document.getElementById('nav-toggle');
const mobileNav     = document.getElementById('mobile-nav');
const mobileNavClose = document.getElementById('mobile-nav-close');
const mobileLinks   = document.querySelectorAll('.mobile-nav-link');
const navLinks      = document.querySelectorAll('.nav-link');
const backToTop     = document.getElementById('back-to-top');
const footerYear    = document.getElementById('footer-year');
const reduceMotion  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Set footer year
if (footerYear) footerYear.textContent = new Date().getFullYear();

// Sticky nav + scroll effects
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  navHeader.classList.toggle('scrolled', scrollY > 20);
  backToTop.classList.toggle('visible', scrollY > 400);
  updateActiveNavLink();
}, { passive: true });

// Active nav link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    const active = link.dataset.section === current;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
}

// The native dialog supplies focus management, Escape and focus restore
function openMobileNav() {
  mobileNav.showModal();
  navToggle.setAttribute('aria-expanded', 'true');
}
function closeMobileNav() {
  if (mobileNav.open) mobileNav.close();
}
navToggle.addEventListener('click', openMobileNav);
mobileNavClose.addEventListener('click', closeMobileNav);
mobileLinks.forEach(link => link.addEventListener('click', closeMobileNav));
mobileNav.addEventListener('click', (e) => {
  if (e.target === mobileNav) closeMobileNav();
});
mobileNav.addEventListener('close', () => navToggle.setAttribute('aria-expanded', 'false'));

// Back to top
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
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
  if (reduceMotion) {
    dynamicEl.textContent = titles[0];
    return;
  }
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
  { delay: 400,  type: 'output', content: 'mahesh_syangtan :: penetration tester :: threat hunter', cls: 'term-success' },
  { delay: 900,  type: 'cmd',    content: 'cat skills.txt | grep -i "top"' },
  { delay: 1100, type: 'output', content: 'Python · Bash · Burp Suite · Metasploit · Splunk · AWS', cls: 'term-info' },
  { delay: 1600, type: 'cmd',    content: 'cat certifications.txt' },
  { delay: 1800, type: 'output', content: 'eJPT (pursuing) · Security+ (pursuing) · THM · HTB', cls: 'term-info' },
  { delay: 2400, type: 'cmd',    content: 'echo "Open to security collaborations"' },
  { delay: 2600, type: 'output', content: 'Open to security collaborations', cls: 'term-success' },
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
  if (reduceMotion) {
    terminalScript.forEach(item => renderTerminalLine(item));
    return;
  }
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

/* ==================== COUNTER ANIMATION ==================== */
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  if (reduceMotion) {
    const suffix = el.dataset.suffix !== undefined ? el.dataset.suffix : (target >= 100 ? '+' : '');
    el.textContent = target + suffix;
    return;
  }
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
  const fields = {
    name: document.getElementById('contact-name'),
    email: document.getElementById('contact-email-input'),
    subject: document.getElementById('contact-subject'),
    message: document.getElementById('contact-message'),
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    let firstInvalid = null;

    if (!fields.name.value.trim()) {
      markError(fields.name, 'Enter your name.');
      firstInvalid = firstInvalid || fields.name;
    }
    if (!fields.email.value.trim() || !isValidEmail(fields.email.value)) {
      markError(fields.email, 'Enter a valid email address.');
      firstInvalid = firstInvalid || fields.email;
    }
    if (!fields.subject.value.trim()) {
      markError(fields.subject, 'Enter a subject.');
      firstInvalid = firstInvalid || fields.subject;
    }
    if (!fields.message.value.trim()) {
      markError(fields.message, 'Enter a message.');
      firstInvalid = firstInvalid || fields.message;
    }

    if (firstInvalid) {
      showFeedback('error-msg', 'Please fix the highlighted fields before submitting.');
      firstInvalid.focus();
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form),
      });
      setSubmitting(false);

      if (response.ok) {
        form.reset();
        clearErrors();
        showFeedback('success', 'Message sent. I will reply soon.');
      } else {
        showFeedback('error-msg', 'Submission failed. Please try again or email me directly.');
      }
    } catch {
      setSubmitting(false);
      showFeedback('error-msg', 'Network error. Check your connection and try again.');
    }
  });
}

function markError(field, message) {
  const errorId = field.dataset.error;
  const errorEl = errorId ? document.getElementById(errorId) : null;
  field.classList.add('error');
  field.setAttribute('aria-invalid', 'true');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add('visible');
    field.setAttribute('aria-describedby', errorId);
  }
  field.addEventListener('input', () => clearFieldError(field), { once: true });
}

function clearFieldError(field) {
  field.classList.remove('error');
  field.setAttribute('aria-invalid', 'false');
  field.removeAttribute('aria-describedby');
  const errorEl = field.dataset.error ? document.getElementById(field.dataset.error) : null;
  if (errorEl) {
    errorEl.textContent = '';
    errorEl.classList.remove('visible');
  }
}

function clearErrors() {
  if (!form) return;
  form.querySelectorAll('.error').forEach(field => clearFieldError(field));
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

console.log(
  '%c[+] Portfolio loaded successfully.',
  'color: #00ff66; font-family: monospace; font-size: 14px;'
);
console.log(
  '%c[*] Built with: HTML5 | CSS3 | Vanilla JS',
  'color: #00d4ff; font-family: monospace; font-size: 12px;'
);
