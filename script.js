// DOM elements
const navbar = document.getElementById('navbar');
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-links a');

// Throttle helper – limits how often a function fires during scroll
function throttle(fn, wait) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
    }
  };
}

// Single combined scroll handler
window.addEventListener('scroll', throttle(() => {
  // Navbar shadow
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }

  // Active nav link highlighting
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });
  navLinkEls.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
}, 100));

// Mobile menu toggle
if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen.toString());
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (navbar && !navbar.contains(e.target) && navLinks) {
    navLinks.classList.remove('open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }
});

// Scroll-triggered fade-in animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

// Observe all animatable elements
document.querySelectorAll(
  '.skill-card, .project-card, .timeline-item, .about-text, .about-image-wrapper'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});
