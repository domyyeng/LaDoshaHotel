/* =======================================================
   La Dosha Hotel — Core UI Scripts (main.js)
   ======================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initRotatingTagline();
  initMealOfDayBadge();
});

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
