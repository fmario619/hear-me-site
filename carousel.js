document.addEventListener('DOMContentLoaded', function () {
  var slides = document.querySelectorAll('.carousel-slide');
  var dotsContainer = document.querySelector('.carousel-dots');
  var prevBtn = document.querySelector('.carousel-prev');
  var nextBtn = document.querySelector('.carousel-next');
  var track = document.querySelector('.carousel-track');

  if (!slides.length) return;

  var current = 0;
  var startX = 0;
  var dragging = false;

  // Create dots
  slides.forEach(function (_, i) {
    var dot = document.createElement('span');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', function () { goTo(i); });
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    slides[current].classList.remove('active');
    dotsContainer.children[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dotsContainer.children[current].classList.add('active');
  }

  // Initialize first slide
  slides[0].classList.add('active');

  prevBtn.addEventListener('click', function () { goTo(current - 1); });
  nextBtn.addEventListener('click', function () { goTo(current + 1); });

  // Touch/swipe support
  track.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
    dragging = true;
  });

  track.addEventListener('touchend', function (e) {
    if (!dragging) return;
    dragging = false;
    var diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goTo(current + 1);
      else goTo(current - 1);
    }
  });

  // Mouse drag support
  track.addEventListener('mousedown', function (e) {
    startX = e.clientX;
    dragging = true;
    e.preventDefault();
  });

  document.addEventListener('mouseup', function (e) {
    if (!dragging) return;
    dragging = false;
    var diff = startX - e.clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goTo(current + 1);
      else goTo(current - 1);
    }
  });

  // Keyboard support
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });
});
