// Smooth scrolling for anchor links (fallback for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var targetId = this.getAttribute('href');
    var target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Close mobile menu if open
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

// Navbar scroll behaviour
var navbar = document.getElementById('navbar');

function onScroll() {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveLink();
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load

// Active nav link highlighting
var sections = document.querySelectorAll('section[id]');
var navLinkEls = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  var scrollY = window.scrollY + 100;
  sections.forEach(function (section) {
    var top = section.offsetTop;
    var height = section.offsetHeight;
    var id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinkEls.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Mobile menu toggle
var navToggle = document.getElementById('navToggle');
var navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', function () {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Update footer year
var yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
