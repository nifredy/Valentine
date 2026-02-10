$(document).ready(function () {
  var envelope = $("#envelope");
  var btn_open = $("#open");
  var btn_reset = $("#reset");

  envelope.click(function () {
    open();
  });
  btn_open.click(function () {
    open();
  });
  btn_reset.click(function () {
    close();
  });

  function open() {
    envelope.addClass("open").removeClass("close");
  }
  function close() {
    envelope.addClass("close").removeClass("open");
  }
});







// const bgMusic = document.getElementById("bgMusic");
// const musicBtn = document.getElementById("musicBtn");

// bgMusic.volume = 0.5;
// bgMusic.muted = true;

// let musicStarted = false;

// // Start music on first user interaction
// function startMusicOnce() {
//   if (!musicStarted) {
//     bgMusic.play().then(() => {
//       musicStarted = true;
//     }).catch(() => {});
//   }
// }

// // Unlock audio on ANY interaction
// document.addEventListener("click", startMusicOnce, { once: true });
// document.addEventListener("keydown", startMusicOnce, { once: true });
// document.addEventListener("touchstart", startMusicOnce, { once: true });

// // Toggle mute
// musicBtn.addEventListener("click", (e) => {
//   e.stopPropagation(); // don't double-trigger

//   if (!musicStarted) {
//     startMusicOnce();
//   }

//   bgMusic.muted = !bgMusic.muted;
//   musicBtn.innerHTML = bgMusic.muted ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
// });




const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

// Initial setup
bgMusic.volume = 0.5;
bgMusic.muted = true;

// Track if music has ever started
let musicStarted = false;

// Start music safely
function startMusic() {
  bgMusic.play().then(() => {
    musicStarted = true;
  }).catch(() => {
    // Autoplay blocked, will start on first user interaction
  });
}

// Restore song progress & mute from sessionStorage
function restoreMusicState() {
  const time = sessionStorage.getItem("bgMusicTime");
  const muted = sessionStorage.getItem("bgMusicMuted");

  if (time) bgMusic.currentTime = parseFloat(time);
  if (muted !== null) bgMusic.muted = muted === 'true';

  // Update button icon
  musicBtn.innerHTML = bgMusic.muted ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';

  // Try to play
  startMusic();
}

// Save current state before leaving
function saveMusicState() {
  sessionStorage.setItem("bgMusicTime", bgMusic.currentTime);
  sessionStorage.setItem("bgMusicMuted", bgMusic.muted);
}

// Start music on first user interaction (required on some browsers)
function unlockMusicOnInteraction() {
  startMusic();
  document.removeEventListener("click", unlockMusicOnInteraction);
  document.removeEventListener("keydown", unlockMusicOnInteraction);
  document.removeEventListener("touchstart", unlockMusicOnInteraction);
}

// Toggle mute/unmute button
musicBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  if (!musicStarted) startMusic();

  bgMusic.muted = !bgMusic.muted;
   musicBtn.innerHTML = bgMusic.muted ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
});

// Event listeners
document.addEventListener("click", unlockMusicOnInteraction, { once: true });
document.addEventListener("keydown", unlockMusicOnInteraction, { once: true });
document.addEventListener("touchstart", unlockMusicOnInteraction, { once: true });

// Save state before leaving
window.addEventListener("beforeunload", saveMusicState);

// Restore state on back/forward navigation
window.addEventListener("pageshow", (event) => {
  restoreMusicState();
});

