import {
  buildBlock,
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
} from './aem.js';

/* =========================================
   CLEANUP + UI OPTIMIZATION
========================================= */
function optimizeUI() {

  /* Remove broken images */
  document.querySelectorAll("img").forEach(img => {
    if (img.src.includes("about:error")) {
      img.closest("p")?.remove();
    }
  });

  /* Remove empty paragraphs */
  document.querySelectorAll("p").forEach(p => {
    if (!p.textContent.trim() && !p.querySelector("img")) {
      p.remove();
    }
  });

  /* Scroll reveal */
  const sections = document.querySelectorAll(".section");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(section => {
    section.classList.add("reveal");
    observer.observe(section);
  });

  /* Navbar scroll optimization */
  const header = document.querySelector(".header-wrapper");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  }, { passive: true });
}

/* =========================================
   MAIN DECORATION
========================================= */
export function decorateMain(main) {
  decorateButtons(main);
  decorateIcons(main);
  decorateSections(main);
  decorateBlocks(main);
}

/* =========================================
   LOAD EAGER
========================================= */
async function loadEager(doc) {
  document.documentElement.lang = "en";
  decorateTemplateAndTheme();

  const main = doc.querySelector("main");

  if (main) {
    decorateMain(main);
    document.body.classList.add("appear");
    await loadSection(main.querySelector(".section"), waitForFirstImage);
  }
}

/* =========================================
   LOAD LAZY
========================================= */
async function loadLazy(doc) {
  loadHeader(doc.querySelector("header"));

  const main = doc.querySelector("main");
  await loadSections(main);

  loadFooter(doc.querySelector("footer"));
  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);

  optimizeUI();
}

/* =========================================
   INIT
========================================= */
async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
}

/* =========================================
   HEADER INTERACTIONS
========================================= */

function initHeaderUI() {

  const header = document.querySelector(".header-wrapper");
  const hamburgerBtn = document.querySelector(".nav-hamburger button");
  const navSections = document.querySelector(".nav-sections");

  /* Scroll effect */
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  }, { passive: true });

  /* Mobile toggle */
  if (hamburgerBtn && navSections) {
    hamburgerBtn.addEventListener("click", () => {
      navSections.classList.toggle("active");
    });
  }
}
loadPage();