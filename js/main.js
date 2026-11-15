/* ===================================
   Al-Noor Specialized Hospital
   Main JavaScript
   Developer: Ali Fathi
=================================== */

(function () {
  'use strict';

  // ===== Navbar Scroll Effect =====
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // ===== Mobile Menu Toggle =====
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
    menuToggle.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks?.classList.remove('open');
      menuToggle?.classList.remove('active');
    });
  });

  // ===== Language Toggle =====
  const langToggle = document.getElementById('langToggle');
  const langCurrent = document.querySelector('.lang-current');
  const htmlEl = document.documentElement;

  // Retrieve saved language
  let currentLang = localStorage.getItem('alnoor-lang') || 'ar';

  function applyLanguage(lang) {
    const isRTL = lang === 'ar';
    htmlEl.setAttribute('lang', lang);
    htmlEl.setAttribute('dir', isRTL ? 'rtl' : 'ltr');

    // Toggle all elements with data-ar / data-en
    document.querySelectorAll('[data-ar][data-en]').forEach((el) => {
      el.textContent = isRTL ? el.dataset.ar : el.dataset.en;
    });

    // Placeholders
    document.querySelectorAll('[data-ar-placeholder][data-en-placeholder]').forEach((el) => {
      el.setAttribute('placeholder', isRTL ? el.dataset.arPlaceholder : el.dataset.enPlaceholder);
    });

    // Button label
    if (langCurrent) langCurrent.textContent = isRTL ? 'EN' : 'AR';

    localStorage.setItem('alnoor-lang', lang);
    currentLang = lang;

    // Re-trigger counters if needed
    animateCounters();
  }

  langToggle?.addEventListener('click', () => {
    applyLanguage(currentLang === 'ar' ? 'en' : 'ar');
  });

  // Apply on load
  applyLanguage(currentLang);

  // ===== Scroll Reveal =====
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  // ===== Animated Counters =====
  function animateCounters() {
    document.querySelectorAll('[data-count]').forEach((counter) => {
      const target = parseInt(counter.dataset.count, 10);
      let current = 0;
      const step = Math.max(1, Math.floor(target / 60));
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target + '+';
          clearInterval(interval);
        } else {
          counter.textContent = current + '+';
        }
      }, 24);
    });
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          counterObserver.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );

  const firstStat = document.querySelector('.hero-stats');
  if (firstStat) counterObserver.observe(firstStat);

  // ===== Contact Form =====
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    formSuccess?.classList.add('show');
    contactForm.reset();
    setTimeout(() => formSuccess?.classList.remove('show'), 5000);
  });

  // ===== Smooth anchor offset for fixed navbar =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== Parallax Orbs on mouse move =====
  if (window.matchMedia('(pointer: fine)').matches) {
    const orbs = document.querySelectorAll('.gradient-orb');
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      orbs.forEach((orb, i) => {
        const factor = (i + 1) * 0.6;
        orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    });
  }
})();