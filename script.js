/*=========================================
KOPI DAMA - MAIN SCRIPT
=========================================*/

/*=========================================
LOADER
=========================================*/

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  if (loader) {
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";
    }, 600);
  }
});

/*=========================================
HEADER SCROLL
=========================================*/

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});

/*=========================================
SMOOTH ACTIVE MENU
=========================================*/

const sections = document.querySelectorAll("section");
const navLink = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    const height = section.clientHeight;

    if (pageYOffset >= top) {
      current = section.getAttribute("id");
    }
  });

  navLink.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") == "#" + current) {
      link.classList.add("active");
    }
  });
});

/*=========================================
SCROLL ANIMATION
=========================================*/

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 },
);

document
  .querySelectorAll(
    ".menu-card,.box,.review-card,.gallery img,.about-image,.about-text,.gallery-item,.card,.about-left,.about-right",
  )
  .forEach((el) => {
    observer.observe(el);
  });

/*=========================================
COUNTER
=========================================*/

const counter = document.querySelectorAll(".box h3, .card h3");

counter.forEach((item) => {
  const rawText = item.textContent.trim();
  const numericMatch = rawText.match(/(\d+(?:\.\d+)?)/);
  const hasPlus = rawText.includes("+");

  if (!numericMatch) return;

  const target = parseFloat(numericMatch[1]);
  const isDecimal = Number.isInteger(target) === false;
  let count = Number(item.getAttribute("data-count")) || 0;
  const speed = target / 80;

  const update = () => {
    if (count < target) {
      count += speed;

      item.setAttribute("data-count", count);

      if (isDecimal) {
        item.innerText = count.toFixed(1);
      } else {
        item.innerText = Math.floor(count);
      }

      requestAnimationFrame(update);
    } else {
      if (isDecimal) {
        item.innerText = target.toFixed(1);
      } else if (hasPlus) {
        item.innerText = target + "+";
      } else {
        item.innerText = target;
      }
    }
  };

  update();
});

/*=========================================
BACK TO TOP
=========================================*/

const topBtn = document.createElement("div");

topBtn.id = "topBtn";

topBtn.innerHTML = "↑";

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
});

topBtn.onclick = () => {
  window.scrollTo({
    top: 0,

    behavior: "smooth",
  });
};

/*=========================================
LIGHTBOX
=========================================*/

const images = document.querySelectorAll(".gallery img, .gallery-item img");

const light = document.createElement("div");

light.className = "lightbox";

document.body.appendChild(light);

images.forEach((img) => {
  img.addEventListener("click", () => {
    light.classList.add("active");

    light.innerHTML = `<img src="${img.src}">`;
  });
});

light.addEventListener("click", () => {
  light.classList.remove("active");
});

/*=========================================
AUTO REVIEW
=========================================*/

const review = document.querySelector(".review-grid, .review-container");

if (review) {
  let scroll = 0;

  setInterval(() => {
    scroll += 370;

    if (scroll >= review.scrollWidth - review.clientWidth) {
      scroll = 0;
    }

    review.scrollTo({
      left: scroll,

      behavior: "smooth",
    });
  }, 3500);
}

/*=========================================
MOBILE MENU
=========================================*/

const menuBtn = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll("nav a");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    nav.classList.toggle("open");
  });

  // Fechar menu ao clicar em um link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("active");
      nav.classList.remove("open");
    });
  });
}

/*=========================================
PARALLAX HERO
=========================================*/

window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero-bg");

  if (hero) {
    hero.style.transform = `translateY(${window.scrollY * 0.3}px)`;
  }
});

/*=========================================
TEXT ANIMATION
=========================================*/

const title = document.querySelector(".hero h1");

if (title) {
  title.animate(
    [
      {
        opacity: 0,

        transform: "translateY(60px)",
      },

      {
        opacity: 1,

        transform: "translateY(0)",
      },
    ],
    {
      duration: 1500,

      fill: "forwards",
    },
  );
}
