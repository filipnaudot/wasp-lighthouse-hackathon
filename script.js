const terminalLines = [
  "> initializing teams...",
  "> syncing ideas...",
  "> pushing commits...",
  "> compiling demos...",
  "> ready.",
  "> pushing commits...",
];

const terminalRotate = document.getElementById("terminalRotate");
let terminalIndex = 0;

function rotateTerminalLine() {
  if (!terminalRotate) return;
  terminalIndex = (terminalIndex + 1) % terminalLines.length;
  terminalRotate.textContent = terminalLines[terminalIndex];
}

setInterval(rotateTerminalLine, 2400);

const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
  item.addEventListener("click", () => {
    const panel = item.nextElementSibling;
    const isOpen = item.getAttribute("aria-expanded") === "true";

    accordionItems.forEach((btn) => {
      btn.setAttribute("aria-expanded", "false");
      const sibling = btn.nextElementSibling;
      if (sibling) {
        sibling.style.maxHeight = null;
        sibling.classList.remove("open");
      }
      btn.querySelector(".accordion-icon").textContent = "+";
    });

    if (!isOpen) {
      item.setAttribute("aria-expanded", "true");
      if (panel) {
        panel.style.maxHeight = panel.scrollHeight + "px";
        panel.classList.add("open");
      }
      item.querySelector(".accordion-icon").textContent = "–";
    }
  });

  item.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      item.click();
    }
  });
});

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}
