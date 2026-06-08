/* ============================================
   GAUTIER OWEN ADOULE — PORTFOLIO JS
   ============================================ */

// ---- CUSTOM CURSOR ----
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateCursor() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

// ---- ACTIVE NAV LINK ----
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

// ---- MOBILE MENU ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ---- TYPEWRITER ----
const twTexts = [
  'decisions.',
  'insights.',
  'stories.',
  'value.'
];
let twIndex = 0;
let twChar = 0;
let twDeleting = false;
const twEl = document.getElementById('twText');

function typewriter() {
  const current = twTexts[twIndex];
  if (!twDeleting) {
    twEl.textContent = current.slice(0, twChar + 1);
    twChar++;
    if (twChar === current.length) {
      twDeleting = true;
      setTimeout(typewriter, 1800);
      return;
    }
    setTimeout(typewriter, 90);
  } else {
    twEl.textContent = current.slice(0, twChar - 1);
    twChar--;
    if (twChar === 0) {
      twDeleting = false;
      twIndex = (twIndex + 1) % twTexts.length;
      setTimeout(typewriter, 400);
      return;
    }
    setTimeout(typewriter, 45);
  }
}
setTimeout(typewriter, 1200);

// ---- SCROLL REVEAL ----
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

// ---- SKILL BARS ----
const skillBars = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const w = entry.target.getAttribute('data-w');
      entry.target.style.width = w + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
skillBars.forEach(bar => skillObserver.observe(bar));

// ---- CONTACT FORM (Formspree) ----
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    const data = new FormData(form);
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Message sent!';
        btn.style.background = '#22c55e';
        form.reset();
      } else {
        btn.innerHTML = '<i class="fa-solid fa-xmark"></i> Error — try again';
        btn.style.background = '#ef4444';
      }
    } catch {
      btn.innerHTML = '<i class="fa-solid fa-xmark"></i> Error — try again';
      btn.style.background = '#ef4444';
    }
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.disabled = false;
    }, 3500);
  });
}

// ---- SMOOTH SCROLL for all anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- TESTIMONIALS auto-scroll (carousel on mobile) ----
function initTestiCarousel() {
  if (window.innerWidth > 768) return;
  const grid = document.getElementById('testiGrid');
  if (!grid) return;
  const cards = grid.querySelectorAll('.testi-card:not(.testi-add)');
  if (cards.length < 2) return;

  let current = 0;
  grid.style.overflow = 'hidden';
  grid.style.position = 'relative';

  grid.style.display = 'flex';
  grid.style.flexDirection = 'column';
  grid.style.gap = '1rem';
}

initTestiCarousel();
window.addEventListener('resize', initTestiCarousel);

// ---- STAR RATING ----
const stars = document.querySelectorAll('.star');
const ratingInput = document.getElementById('ratingInput');
if (stars.length) {
  stars.forEach(star => {
    star.addEventListener('click', () => {
      const val = parseInt(star.getAttribute('data-v'));
      ratingInput.value = val;
      stars.forEach(s => {
        s.classList.toggle('active', parseInt(s.getAttribute('data-v')) <= val);
      });
    });
    star.addEventListener('mouseenter', () => {
      const val = parseInt(star.getAttribute('data-v'));
      stars.forEach(s => {
        s.classList.toggle('active', parseInt(s.getAttribute('data-v')) <= val);
      });
    });
  });
  document.getElementById('starRating').addEventListener('mouseleave', () => {
    const val = parseInt(ratingInput.value);
    stars.forEach(s => {
      s.classList.toggle('active', parseInt(s.getAttribute('data-v')) <= val);
    });
  });
  // Set default 5 stars active
  stars.forEach(s => s.classList.add('active'));
}

// ---- REVIEW FORM ----
const reviewForm = document.getElementById('reviewForm');
if (reviewForm) {
  reviewForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = reviewForm.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    const data = new FormData(reviewForm);
    try {
      const res = await fetch(reviewForm.action, {
        method: 'POST', body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Review sent — thank you!';
        btn.style.background = '#22c55e';
        reviewForm.reset();
        stars.forEach(s => s.classList.add('active'));
        ratingInput.value = 5;
      } else {
        btn.innerHTML = '<i class="fa-solid fa-xmark"></i> Error — try again';
        btn.style.background = '#ef4444';
      }
    } catch {
      btn.innerHTML = '<i class="fa-solid fa-xmark"></i> Error — try again';
      btn.style.background = '#ef4444';
    }
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);
  });
}
