const revealItems = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".main-nav a");
const sections = [...document.querySelectorAll("main section[id]")];
const modeDot = document.getElementById("modeDot");
const timeLabel = document.getElementById("timeLabel");

const quotes = [
  {
    text: "LinkedIn profile for professional networking, internships, and industry connections.",
    meta: "Username: priyranjan-kumar"
  },
  {
    text: "GitHub profile featuring coding practice, project repositories, and technical progress.",
    meta: "Username: Priyranjan-Kumar04"
  },
  {
    text: "Instagram account for updates and personal/creative highlights.",
    meta: "Username: priyranjan_kumar"
  }
];

const quoteText = document.getElementById("quoteText");
const quoteMeta = document.getElementById("quoteMeta");
const profileAction = document.getElementById("profileAction");
const prevQuote = document.getElementById("prevQuote");
const nextQuote = document.getElementById("nextQuote");
const viewAllProjectsBtn = document.getElementById("viewAllProjectsBtn");
const allProjectsGrid = document.getElementById("allProjectsGrid");
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const subjectInput = document.getElementById("subjectInput");
const messageInput = document.getElementById("messageInput");
let quoteIndex = 0;

function setQuote(index) {
  const quote = quotes[index];
  quoteText.textContent = quote.text;
  quoteMeta.textContent = quote.meta;
  if (profileAction) {
    const profileLinks = [
      "https://www.linkedin.com/in/priyranjan-kumar",
      "https://github.com/Priyranjan-Kumar04",
      "https://www.instagram.com/priyranjan_kumar"
    ];
    profileAction.href = profileLinks[index] || profileLinks[0];
  }
}

function updateTimeAndMode() {
  const now = new Date();
  timeLabel.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
  const hour = now.getHours();
  const dayMode = hour >= 6 && hour < 18;
  modeDot.style.background = dayMode ? "var(--olive)" : "var(--accent)";
  modeDot.style.boxShadow = dayMode
    ? "0 0 0 4px rgba(61,74,42,.2)"
    : "0 0 0 4px rgba(194,82,28,.2)";
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

function setActiveNav() {
  const scrollPos = window.scrollY + 140;
  let currentId = "";

  sections.forEach((section) => {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const target = link.getAttribute("href").replace("#", "");
    link.classList.toggle("active", target === currentId);
  });
}

function setupMagneticButtons() {
  const magneticButtons = document.querySelectorAll(".magnetic");
  magneticButtons.forEach((button) => {
    button.addEventListener("mousemove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "";
    });
  });
}

function parallaxLite() {
  const items = document.querySelectorAll(".parallax-item");
  const scrollY = window.scrollY;
  items.forEach((item) => {
    const speed = Number(item.dataset.speed || 0.08);
    const offset = item.getBoundingClientRect().top + scrollY;
    const delta = (scrollY - offset) * speed;
    item.style.transform = `translateY(${delta}px)`;
  });
}

prevQuote?.addEventListener("click", () => {
  quoteIndex = (quoteIndex - 1 + quotes.length) % quotes.length;
  setQuote(quoteIndex);
});

nextQuote?.addEventListener("click", () => {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  setQuote(quoteIndex);
});

viewAllProjectsBtn?.addEventListener("click", () => {
  const isCollapsed = allProjectsGrid?.classList.contains("is-collapsed");
  if (!allProjectsGrid) return;

  allProjectsGrid.classList.toggle("is-collapsed");
  viewAllProjectsBtn.textContent = isCollapsed
    ? "Show Selected Only"
    : "View All Projects";

  if (isCollapsed) {
    allProjectsGrid
      .querySelectorAll(".reveal")
      .forEach((item) => item.classList.add("in-view"));
  }
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameInput?.value.trim() || "Not provided";
  const email = emailInput?.value.trim() || "Not provided";
  const subjectValue = subjectInput?.value.trim() || "General Inquiry";
  const message = messageInput?.value.trim() || "";

  const subject = encodeURIComponent(`Portfolio Inquiry - ${subjectValue}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nSubject: ${subjectValue}\n\nMessage:\n${message}`
  );

  window.location.href = `mailto:priyranjan.ms@gmail.com?subject=${subject}&body=${body}`;
});

window.addEventListener("scroll", () => {
  setActiveNav();
  parallaxLite();
});

setQuote(quoteIndex);
setActiveNav();
setupMagneticButtons();
updateTimeAndMode();
setInterval(updateTimeAndMode, 60000);
