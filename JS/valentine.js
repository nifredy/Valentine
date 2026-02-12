const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const isMobile = window.matchMedia("(pointer: coarse)").matches;


const noMessages = [
  "Come on 😏",
  "Stop joking 😁",
  "Are you being serious right now? 🤭",
  "Ohhh!! you're serious 🙆🏾‍♂️",
  "Babeeeee!!! 😢",
  "You're breaking my heart 😭 ",
  "Are you really sure??? 😟",
  "Think again… 🥺",
  "Last chance 💖",
  "Barakubeshyeeee Babe 😂😘😆" // last message triggers escape
];

let clickCount = 0;
let yesSize = 18;
let escapeMode = false;

// NO button click
noBtn.addEventListener("click", () => {
  if (escapeMode) return; // can't click when escaping

  // Grow YES button
  yesSize += 6;
  yesBtn.style.fontSize = yesSize + "px";
  yesBtn.style.padding = (10 + clickCount * 2) + "px " + (20 + clickCount * 3) + "px";

  // Change NO button text
  if (clickCount < noMessages.length - 1) {
    noBtn.textContent = noMessages[clickCount];
  } else {
    // Last message reached → enable escape mode
    noBtn.textContent = noMessages[noMessages.length - 1];

    if (isMobile) {
      // 📱 MOBILE → explode effect

      noBtn.style.transition = "transform 0.5s ease, opacity 0.5s ease";
      noBtn.style.transform = "scale(2)";
      noBtn.style.opacity = "0";
      noBtn.style.animation = "explode 0.5s ease forwards";

      setTimeout(() => {
        const explosion = document.createElement("div");
        explosion.textContent = "😂😂😂😂😂";
        explosion.style.fontSize = "1.5rem";
        explosion.style.textAlign = "center";

        noBtn.parentNode.replaceChild(explosion, noBtn);
      }, 500);

    } else {
      // 💻 DESKTOP → escape mode
      escapeMode = true;
      noBtn.style.position = "absolute";
      document.addEventListener("mousemove", chaseMouse);
    }
  }

  clickCount++;
});

// YES click → go to happy page
yesBtn.addEventListener("click", () => {
  window.location.href = "yes.html";
});

// Function to make NO escape from mouse
function chaseMouse(event) {
  if (!escapeMode) return;

  const padding = 20; // minimum distance from edges
  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;

  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const btnX = noBtn.offsetLeft + noBtn.offsetWidth / 2;
  const btnY = noBtn.offsetTop + noBtn.offsetHeight / 2;

  // Distance from mouse to button
  const dx = btnX - mouseX;
  const dy = btnY - mouseY;
  const distance = Math.sqrt(dx*dx + dy*dy);

  // Only move if mouse is too close
  if (distance < 100) {
    // move away gradually
    const moveStep = 500; // how much it moves per mousemove
    let newX = noBtn.offsetLeft + (dx / distance) * moveStep;
    let newY = noBtn.offsetTop + (dy / distance) * moveStep;

    // clamp to screen bounds
    newX = Math.min(Math.max(padding, newX), maxX);
    newY = Math.min(Math.max(padding, newY), maxY);

    noBtn.style.left = newX + "px";
    noBtn.style.top = newY + "px";
  }
}






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

// // Handle back/forward cache restore
// window.addEventListener("pageshow", (event) => {
//   if (event.persisted) {
//     // Page restored from cache → make sure music continues
//     startMusicOnce();
//   }
// });

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



