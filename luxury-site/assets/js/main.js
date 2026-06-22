document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Sticky header solid-on-scroll ---- */
  const header = document.querySelector(".site-header");
  if (header) {
    const toggleSolid = () => {
      header.classList.toggle("is-solid", window.scrollY > 40);
    };
    toggleSolid();
    window.addEventListener("scroll", toggleSolid, { passive: true });
  }

  /* ---- Mobile menu ---- */
  const navToggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileClose = document.querySelector(".mobile-menu-close");
  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", () => mobileMenu.classList.add("open"));
    mobileClose.addEventListener("click", () => mobileMenu.classList.remove("open"));
    mobileMenu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => mobileMenu.classList.remove("open"))
    );
  }

  /* ---- Scroll-reveal animations ---- */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (reduceMotion) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      revealEls.forEach((el) => io.observe(el));
    }
  }

  /* ---- Subtle parallax on hero media (disabled if reduced motion) ---- */
  if (!reduceMotion) {
    const heroMedia = document.querySelector(".hero-media img, .hero-media video");
    if (heroMedia) {
      window.addEventListener(
        "scroll",
        () => {
          const offset = Math.min(window.scrollY * 0.25, 160);
          heroMedia.style.transform = `translateY(${offset}px) scale(1.02)`;
        },
        { passive: true }
      );
    }
  }

  /* ---- Animated counters ---- */
  const counters = document.querySelectorAll("[data-counter]");
  if (counters.length) {
    const animateCounter = (el) => {
      const target = parseFloat(el.getAttribute("data-counter"));
      const suffix = el.getAttribute("data-suffix") || "";
      const decimals = el.getAttribute("data-decimals") ? parseInt(el.getAttribute("data-decimals")) : 0;
      if (reduceMotion) {
        el.textContent = target.toFixed(decimals) + suffix;
        return;
      }
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => cio.observe(el));
  }

  /* ---- Property comparison tool ---- */
  const compareState = new Map();
  const compareBar = document.querySelector(".compare-bar");
  const compareList = document.querySelector(".compare-list");
  const compareCount = document.querySelector("[data-compare-count]");
  const compareModal = document.querySelector(".compare-modal");
  const compareModalBody = document.querySelector("[data-compare-body]");

  function renderCompareBar() {
    if (!compareBar) return;
    compareBar.classList.toggle("open", compareState.size > 0);
    if (compareList) {
      compareList.innerHTML = "";
      compareState.forEach((data, id) => {
        const chip = document.createElement("span");
        chip.className = "compare-chip";
        chip.innerHTML = `${data.name} <button type="button" aria-label="Remove ${data.name} from comparison" data-remove="${id}">&times;</button>`;
        compareList.appendChild(chip);
      });
    }
    if (compareCount) compareCount.textContent = compareState.size;
  }

  document.querySelectorAll("[data-compare-toggle]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const card = checkbox.closest("[data-property]");
      const id = card.getAttribute("data-property");
      if (checkbox.checked) {
        if (compareState.size >= 3) {
          checkbox.checked = false;
          return;
        }
        compareState.set(id, {
          name: card.getAttribute("data-name"),
          location: card.getAttribute("data-location"),
          price: card.getAttribute("data-price"),
          beds: card.getAttribute("data-beds"),
          size: card.getAttribute("data-size"),
          status: card.getAttribute("data-status"),
        });
      } else {
        compareState.delete(id);
      }
      renderCompareBar();
    });
  });

  document.addEventListener("click", (e) => {
    const removeId = e.target.getAttribute && e.target.getAttribute("data-remove");
    if (removeId) {
      compareState.delete(removeId);
      const cb = document.querySelector(`[data-property="${removeId}"] [data-compare-toggle]`);
      if (cb) cb.checked = false;
      renderCompareBar();
    }
  });

  const compareOpenBtn = document.querySelector("[data-compare-open]");
  if (compareOpenBtn) {
    compareOpenBtn.addEventListener("click", () => {
      if (!compareModalBody) return;
      const rows = [
        ["Location", "location"], ["Starting Price", "price"],
        ["Bedrooms", "beds"], ["Size", "size"], ["Status", "status"],
      ];
      let html = "<table class='compare-table'><thead><tr><th></th>";
      compareState.forEach((d) => (html += `<th>${d.name}</th>`));
      html += "</tr></thead><tbody>";
      rows.forEach(([label, key]) => {
        html += `<tr><th>${label}</th>`;
        compareState.forEach((d) => (html += `<td>${d[key]}</td>`));
        html += "</tr>";
      });
      html += "</tbody></table>";
      compareModalBody.innerHTML = html;
      compareModal.classList.add("open");
    });
  }
  document.querySelectorAll("[data-compare-close]").forEach((btn) =>
    btn.addEventListener("click", () => compareModal.classList.remove("open"))
  );

  /* ---- Contact form (demo submission) ---- */
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const status = contactForm.querySelector("[data-form-status]");
      if (status) {
        status.textContent = "Thank you. A private advisor will contact you within 24 hours.";
        status.style.color = "var(--gold)";
      }
      contactForm.reset();
    });
  }
});
