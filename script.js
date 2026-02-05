const terminalLines = [
  "> initializing teams..",
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

const registerForm = document.getElementById("registerForm");
const formMessage = document.getElementById("formMessage");

function loadRegistrations() {
  try {
    return JSON.parse(localStorage.getItem("nightshift_registrations")) || [];
  } catch (error) {
    return [];
  }
}

function saveRegistration(data) {
  const current = loadRegistrations();
  current.push(data);
  localStorage.setItem("nightshift_registrations", JSON.stringify(current));
}

if (registerForm) {
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(registerForm);
    const name = String(formData.get("name")).trim();
    const email = String(formData.get("email")).trim();
    const role = String(formData.get("role")).trim();
    const agreed = registerForm.querySelector("#coc").checked;

    if (!name || !email || !role || !agreed) {
      formMessage.textContent = "Please complete all fields and agree to the code of conduct.";
      formMessage.style.color = "#ff9f9f";
      return;
    }

    const registration = {
      name,
      email,
      role,
      agreed,
      timestamp: new Date().toISOString()
    };

    saveRegistration(registration);
    formMessage.textContent = "You are registered! Check your inbox soon.";
    formMessage.style.color = "var(--accent)";
    registerForm.reset();
  });
}

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}
