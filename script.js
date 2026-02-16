document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------
     Calendar logic
  ---------------------------- */

window.toggle = function(element) {
    const unlockDate = element.dataset.date; // "YYYY-MM-DD"
    const today = new Date().toISOString().split("T")[0];

    if (today < unlockDate) {
      showNotToday(element);
      return; // stop here, do NOT toggle open class
    }

    // Allowed → toggle open normally
    element.classList.toggle("open");
  };

  function showNotToday(element) {
    // Prevent multiple messages stacking
    if (element.querySelector(".not-today")) return;

    const message = document.createElement("div");
    message.className = "not-today";
    message.textContent = "🤨";

    // Inline styling to avoid CSS file changes
    message.style.position = "absolute";
    message.style.top = "50%";
    message.style.left = "50%";
    message.style.transform = "translate(-50%, -50%)";
    message.style.background = "rgba(255,255,255,0.9)";
    message.style.padding = "5px 10px";
    message.style.borderRadius = "5px";
    message.style.zIndex = "10";
    message.style.pointerEvents = "none";
    message.style.fontFamily = '"Cute Font", sans-serif';
    message.style.fontWeight = "bold";

    element.appendChild(message);

    setTimeout(() => {
      element.removeChild(message);
    }, 1200);
  }


  /* ---------------------------
     Rub-to-generate RNG
  ---------------------------- */

  const ticket = document.getElementById("rngTicket");
  const resultEl = document.getElementById("result");

  if (!ticket || !resultEl) return;

  let rubbing = false;
  let generated = false;
  let rubCount = 0;
  const RUB_THRESHOLD = 175; // medium rub time

  // Start rubbing
  ticket.addEventListener("mousedown", () => rubbing = true);
  ticket.addEventListener("touchstart", () => rubbing = true);

  // Stop rubbing
  document.addEventListener("mouseup", stopRub);
  document.addEventListener("touchend", stopRub);

  function stopRub() {
    rubbing = false;
    rubCount = 0;
  }

  // Mouse movement
  ticket.addEventListener("mousemove", handleRub);
  ticket.addEventListener("touchmove", handleRub);

  function handleRub() {
    if (!rubbing || generated) return;

    rubCount++;
    if (rubCount >= RUB_THRESHOLD) {
      generateNumber();
    }
  }

  function generateNumber() {
    const number = Math.floor(Math.random() * 3) + 1;
    resultEl.textContent = `You Win: ${number} Ticket(s)`;
    generated = true;
  }

  /* ---------------------------
     +1 Ticket Button
  ---------------------------- */

const addButton = document.getElementById("addTicket");

if (addButton && resultEl) {
  let addUsed = false; // tracks if +1 ticket has been used

  addButton.addEventListener("click", () => {
    // Condition 1: only allow if user already generated a number
    if (!generated) return; // do nothing if they haven’t rubbed yet

    // Condition 2: only allow once per load
    if (addUsed) return;

    // Update ticket count
    const match = resultEl.textContent.match(/\d+/);
    let currentTickets = match ? parseInt(match[0]) : 0;
    currentTickets += 1;
    resultEl.textContent = `You Win: ${currentTickets} Ticket(s)`;

    addUsed = true; // lock the button

    // Trigger confetti
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f7c948', '#ff6b6b', '#4ade80', '#1e3a8a']
    });
  });
}

const addButton2 = document.getElementById("brushTeeth");

if (addButton2 && resultEl) {
  let addUsed = false; // tracks if +1 ticket has been used

  addButton2.addEventListener("click", () => {
    // Condition 1: only allow if user already generated a number
    if (!generated) return; // do nothing if they haven’t rubbed yet

    // Condition 2: only allow once per load
    if (addUsed) return;

    // Update ticket count
    const match = resultEl.textContent.match(/\d+/);
    let currentTickets = match ? parseInt(match[0]) : 0;
    currentTickets += 1;
    resultEl.textContent = `You Win: ${currentTickets} Ticket(s)`;

    addUsed = true; // lock the button

    addUsed = true; // lock the button

    // Trigger confetti
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f7c948', '#ff6b6b', '#4ade80', '#1e3a8a']
    });
  });
}


});
