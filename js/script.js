// ---- Opening (letter-unfold) animation ----
const cover = document.getElementById('cover');
const main = document.getElementById('main');
document.documentElement.classList.add('locked');

// ---- Background music ----
const audio = document.getElementById('bg-music');
const muteBtn = document.getElementById('mute-btn');
const iconSound = document.getElementById('icon-sound');
const iconMuted = document.getElementById('icon-muted');

let userMuted = false;

function playMusic() {
  if (!audio || userMuted) return;
  audio.volume = 0.5;
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      if (iconSound && iconMuted) {
        iconSound.style.display = '';
        iconMuted.style.display = 'none';
      }
    }).catch((err) => {
      console.log('Audio autoplay prevented:', err);
    });
  }
}

let opened = false;
function openInvite() {
  if (opened) return;
  opened = true;
  cover.classList.add('open');
  main.classList.add('show');
  document.documentElement.classList.remove('locked');
  setTimeout(() => { cover.classList.add('hidden'); }, 1250);

  // Play wedding song when opening invitation
  playMusic();
}

document.getElementById('tapToOpen').addEventListener('click', openInvite);
cover.addEventListener('click', openInvite);

// Fallback user interaction triggers
function onFirstGesture() {
  if (opened && audio && audio.paused && !userMuted) {
    playMusic();
  }
}
document.addEventListener('click', onFirstGesture);
document.addEventListener('touchstart', onFirstGesture);
document.addEventListener('scroll', onFirstGesture);

// Mute / unmute toggle
muteBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (audio.paused) {
    userMuted = false;
    playMusic();
  } else {
    userMuted = true;
    audio.pause();
    if (iconSound && iconMuted) {
      iconSound.style.display = 'none';
      iconMuted.style.display = '';
    }
  }
});

// ---- Countdown timer ----
const target = new Date('2026-10-18T10:00:00+05:30').getTime();
function tick() {
  const now = Date.now();
  let diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const pad = n => String(n).padStart(2, '0');
  document.getElementById('cd-days').textContent = pad(d);
  document.getElementById('cd-hours').textContent = pad(h);
  document.getElementById('cd-mins').textContent = pad(m);
  document.getElementById('cd-secs').textContent = pad(s);
}
tick();
setInterval(tick, 1000);

// ---- Smooth fade out of hero photo on scroll ----
const heroBg = document.querySelector('.hero-photo-bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroH = window.innerHeight;
    const fade = Math.max(0, 1 - (scrollY / (heroH * 0.75)));
    heroBg.style.opacity = (0.42 * fade).toString();
  }, { passive: true });
}
