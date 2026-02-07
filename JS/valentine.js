const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

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
    escapeMode = true;

    // Make NO button escape
    noBtn.style.position = "absolute";
    document.addEventListener("mousemove", chaseMouse);
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
