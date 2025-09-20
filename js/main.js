/* =======================================================
   La Dosha Hotel — Core UI Scripts (main.js)
   ======================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initRotatingTagline();
  initMealOfDayBadge();
});

/* -------------------------------------------------------
   Mobile menu toggle
------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('navMenu');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('show');
    // Animate icon toggle (optional)
    toggle.classList.toggle('active');
  });
}

<script>
  // Hamburger toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.getElementById('navMenu');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Scroll shadow effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
</script>


/* -------------------------------------------------------
   Rotating tagline for .animated-sub
------------------------------------------------------- */
function initRotatingTagline() {
  const el = document.querySelector('.animated-sub');
  if (!el) return;

  const words = ['Delicious', 'Fresh', 'Artful', 'God Mode'];
  let i = 0;

  setInterval(() => {
    el.textContent = words[i % words.length];
    el.classList.add("fade-in"); // optional small animation
    setTimeout(() => el.classList.remove("fade-in"), 600);
    i++;
  }, 2200);
}

/* -------------------------------------------------------
   Badge pulse + redirect to Meal of the Day
------------------------------------------------------- */
function initMealOfDayBadge() {
  const badge = document.querySelector('.badge');
  if (!badge) return;

  badge.addEventListener('click', () => {
    badge.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(1.08)' },
        { transform: 'scale(1)' }
      ],
      { duration: 600 }
    );

    // Redirect after pulse animation
    setTimeout(() => {
      location.href = 'explore.html#meal-of-day';
    }, 300);
  });
}

/* -------------------------------------------------------
   Lightbox overlay for gallery images
------------------------------------------------------- */
function openLightbox(src) {
  const overlay = document.createElement('div');
  overlay.className = "lightbox-overlay";

  const img = document.createElement('img');
  img.src = src;
  img.alt = "Preview";
  img.className = "lightbox-img";

  overlay.appendChild(img);
  overlay.addEventListener('click', () => overlay.remove());

  document.body.appendChild(overlay);
}
