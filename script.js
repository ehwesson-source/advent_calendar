document.addEventListener("DOMContentLoaded", () => {

  // Make the toggle function available to HTML onclick
window.toggle = function(element) {
  element.classList.toggle("open");
}

  // --- Calendar toggle ---
  function toggle(element) {
    element.classList.toggle("open");
  }

  // --- Rub-to-generate RNG ---
  const ticket = document.getElementById("rngTicket");
  let rubbing = false;      // is user pressing
  let generated = false;    // has number been generated
  let rubCount = 0;         // count of small moves
  const RUB_THRESHOLD = 25;  // very short rub requirement

  // Start rubbing
  ticket.addEventListener("mousedown", () => rubbing = true);
  ticket.addEventListener("touchstart", () => rubbing = true);

  // Stop rubbing
  document.addEventListener("mouseup", () => {
    rubbing = false;
    rubCount = 0;
  });
  document.addEventListener("touchend", () => {
    rubbing = false;
    rubCount = 0;
  });

  // Handle mouse movement
  ticket.addEventListener("mousemove", () => {
    if (!rubbing || generated) return;
    rubCount++;
    if (rubCount >= RUB_THRESHOLD) generateNumber();
  });

  // Handle touch movement
  ticket.addEventListener("touchmove", () => {
    if (!rubbing || generated) return;
    rubCount++;
    if (rubCount >= RUB_THRESHOLD) generateNumber();
  });

  // Generate a random number between 1 and 4
  function generateNumber() {
    const number = Math.floor(Math.random() * 4) + 1;
    document.getElementById("result").textContent = `You Win: ${number} Ticket(s)`;
    generated = true;
  }

  const addButton = document.getElementById("addTicket");

addButton.addEventListener("click", () => {
  const resultEl = document.getElementById("result");

  // Extract current ticket number from text
  const currentText = resultEl.textContent;
  const match = currentText.match(/\d+/); // finds number in string
  let currentTickets = match ? parseInt(match[0]) : 0;

  currentTickets += 1; // add one ticket

  // Update the display
  resultEl.textContent = `You Win: ${currentTickets} Ticket(s)`;
});

});


