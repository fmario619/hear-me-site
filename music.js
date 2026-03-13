document.addEventListener('DOMContentLoaded', function () {
  // Create audio element
  var audio = document.createElement('audio');
  audio.id = 'bgMusic';
  audio.loop = true;
  audio.preload = 'auto';
  audio.volume = 0.3;
  audio.src = '/ambient.mp3';
  document.body.appendChild(audio);

  // Create button
  var btn = document.createElement('button');
  btn.className = 'music-toggle';
  btn.setAttribute('aria-label', 'Toggle music');
  var icon = document.createElement('span');
  icon.id = 'musicIcon';
  icon.textContent = '\u25B6';
  btn.appendChild(icon);
  document.body.appendChild(btn);

  // Restore state from previous page
  var wasPlaying = sessionStorage.getItem('musicPlaying') === 'true';
  var savedTime = parseFloat(sessionStorage.getItem('musicTime') || '0');

  if (wasPlaying) {
    audio.currentTime = savedTime;
    audio.play().then(function () {
      icon.textContent = '\u275A\u275A';
    }).catch(function () {});
  }

  // Autoplay on first interaction if not already playing
  function tryAutoplay() {
    if (audio.paused) {
      audio.play().then(function () {
        icon.textContent = '\u275A\u275A';
        sessionStorage.setItem('musicPlaying', 'true');
      }).catch(function () {});
    }
    document.removeEventListener('click', tryAutoplay);
    document.removeEventListener('touchstart', tryAutoplay);
    document.removeEventListener('scroll', tryAutoplay);
  }

  if (!wasPlaying) {
    document.addEventListener('click', tryAutoplay);
    document.addEventListener('touchstart', tryAutoplay);
    document.addEventListener('scroll', tryAutoplay);
  }

  // Toggle button
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (audio.paused) {
      audio.play();
      icon.textContent = '\u275A\u275A';
      sessionStorage.setItem('musicPlaying', 'true');
    } else {
      audio.pause();
      icon.textContent = '\u25B6';
      sessionStorage.setItem('musicPlaying', 'false');
    }
  });

  // Save position before navigating away
  window.addEventListener('beforeunload', function () {
    sessionStorage.setItem('musicTime', String(audio.currentTime));
  });
});
