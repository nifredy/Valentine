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


const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

bgMusic.volume = 0.5;
bgMusic.muted = true;

let musicStarted = false;

// Start music on first user interaction
function startMusicOnce() {
  if (!musicStarted) {
    bgMusic.play().then(() => {
      musicStarted = true;
    }).catch(() => {});
  }
}

// Unlock audio on ANY interaction
document.addEventListener("click", startMusicOnce, { once: true });
document.addEventListener("keydown", startMusicOnce, { once: true });
document.addEventListener("touchstart", startMusicOnce, { once: true });

// Toggle mute
musicBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // don't double-trigger

  if (!musicStarted) {
    startMusicOnce();
  }

  bgMusic.muted = !bgMusic.muted;
  musicBtn.textContent = bgMusic.muted ? "🔊" : "🔇";
});

