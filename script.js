document.addEventListener("DOMContentLoaded", () => {
  // 1. Navbar Efekt (průhlednost při scrollu)
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.padding = "10px 0";
    } else {
      navbar.style.background = "#ffffff";
      navbar.style.padding = "20px 0";
    }
  });

  // 2. Reveal Animace (odkrývání prvků)
  const reveal = () => {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach((element) => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        element.classList.add("active");
      }
    });
  };
  window.addEventListener("scroll", reveal);
  reveal(); // Spustit i při načtení

  // 3. Počítadlo Statistik
  const startCounters = () => {
    const counters = document.querySelectorAll(".num");
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const duration = 2000;
      const increment = target / (duration / 10);
      let current = 0;

      const update = () => {
        current += increment;
        if (current < target) {
          counter.innerText = Math.ceil(current);
          setTimeout(update, 10);
        } else {
          counter.innerText = target;
        }
      };
      update();
    });
  };

  // Hlídač statistik
  const statsSection = document.querySelector(".stats");
  if (statsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounters();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(statsSection);
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0 /* Spustí se hned při prvním pixelu */,
    rootMargin:
      "0px 0px 50px 0px" /* Spustí se o 50px dříve, než vyleze na obrazovku */,
  },
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  if (window.scrollY > 40) {
    nav.classList.add("sticky-nav");
  } else {
    nav.classList.remove("sticky-nav");
  }
});

document.addEventListener("contextmenu", (event) => event.preventDefault());

const burger = document.getElementById("hamburger");
const menu = document.getElementById("nav-links");

if (burger && menu) {
  burger.onclick = function () {
    // Tady přidáváme 'active' oběma prvkům
    burger.classList.toggle("active");
    menu.classList.toggle("mobile-active");

    // Zámek scrollu
    if (menu.classList.contains("mobile-active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };
}
