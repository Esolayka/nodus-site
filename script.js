const RELEASE_BASE = "https://github.com/Esolayka/Nodus/releases/download/v0.2.7";

const downloads = {
  windows: {
    label: "Скачать для Windows",
    href: `${RELEASE_BASE}/Nodus_0.2.7_x64-setup.exe`,
  },
  macos: {
    label: "Скачать для macOS",
    href: `${RELEASE_BASE}/Nodus_0.2.7_aarch64.dmg`,
  },
  linux: {
    label: "Скачать AppImage",
    href: `${RELEASE_BASE}/Nodus_0.2.7_amd64.AppImage`,
  },
};

function detectPlatform() {
  const platform = navigator.userAgentData?.platform || navigator.platform || "";
  const agent = navigator.userAgent || "";
  const value = `${platform} ${agent}`.toLowerCase();

  if (value.includes("mac")) return "macos";
  if (value.includes("win")) return "windows";
  if (value.includes("linux") || value.includes("x11")) return "linux";
  return null;
}

const platform = detectPlatform();

if (platform && downloads[platform]) {
  document.querySelectorAll("[data-primary-download]").forEach((link) => {
    link.href = downloads[platform].href;
    const label = link.querySelector("[data-download-label]");
    if (label) label.textContent = downloads[platform].label;
  });

  document.querySelector(`[data-platform="${platform}"]`)?.classList.add("recommended");
}

const header = document.querySelector("[data-header]");
const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 24);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const menuToggle = document.querySelector("[data-menu-toggle]");
const navLinks = document.querySelector("[data-nav-links]");

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks?.classList.toggle("open") ?? false;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Открыть меню");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navLinks?.classList.contains("open")) {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.focus();
  }
});

const tabs = [...document.querySelectorAll("[data-showcase-tab]")];
const panels = [...document.querySelectorAll("[data-showcase-panel]")];

function activatePanel(name) {
  tabs.forEach((tab) => {
    const active = tab.dataset.showcaseTab === name;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  });

  panels.forEach((panel) => {
    const active = panel.dataset.showcasePanel === name;
    panel.hidden = !active;
    panel.classList.toggle("active", active);
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activatePanel(tab.dataset.showcaseTab));
  tab.addEventListener("keydown", (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const next = tabs[(index + direction + tabs.length) % tabs.length];
    activatePanel(next.dataset.showcaseTab);
    next.focus();
  });
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hero = document.querySelector(".hero");
const heroFrame = hero?.querySelector(".product-shot-frame");

if (!reduceMotion && hero && heroFrame && window.matchMedia("(pointer: fine)").matches) {
  hero.addEventListener("pointermove", (event) => {
    const bounds = heroFrame.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    heroFrame.style.setProperty("--hero-ry", `${(x - 0.5) * 4}deg`);
    heroFrame.style.setProperty("--hero-rx", `${(0.5 - y) * 3}deg`);
  });

  hero.addEventListener("pointerleave", () => {
    heroFrame.style.removeProperty("--hero-rx");
    heroFrame.style.removeProperty("--hero-ry");
  });
}

if (reduceMotion) document.documentElement.classList.add("reduce-motion");
