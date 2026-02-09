function toggle(element) {
  element.classList.toggle("open");
}

function generateNumber() {
  const number = Math.floor(Math.random() * 4) + 1;
  document.getElementById("result").textContent = number;
}
