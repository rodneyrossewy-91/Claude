document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile menu ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuClose = document.querySelector(".mobile-menu-close");
  if (navToggle && mobileMenu) {
    const openMenu = () => {
      mobileMenu.classList.add("is-open");
      mobileMenu.setAttribute("aria-hidden", "false");
      navToggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };
    const closeMenu = () => {
      mobileMenu.classList.remove("is-open");
      mobileMenu.setAttribute("aria-hidden", "true");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };
    navToggle.addEventListener("click", openMenu);
    mobileMenuClose?.addEventListener("click", closeMenu);
    mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else if ("IntersectionObserver" in window) {
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
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Project filter ---------- */
  const filterBtns = document.querySelectorAll("[data-filter]");
  const projectCards = document.querySelectorAll("[data-category]");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const filter = btn.dataset.filter;
      projectCards.forEach((card) => {
        const match = filter === "alle" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !match);
      });
    });
  });

  /* ---------- Review slider ---------- */
  const slider = document.querySelector(".review-slider");
  const prevBtn = document.querySelector("[data-slide-prev]");
  const nextBtn = document.querySelector("[data-slide-next]");
  if (slider && prevBtn && nextBtn) {
    const scrollAmount = () => slider.querySelector(".review-card")?.offsetWidth + 24 || 320;
    prevBtn.addEventListener("click", () => slider.scrollBy({ left: -scrollAmount(), behavior: reduceMotion ? "auto" : "smooth" }));
    nextBtn.addEventListener("click", () => slider.scrollBy({ left: scrollAmount(), behavior: reduceMotion ? "auto" : "smooth" }));
  }

  /* ---------- Offerte form validation ---------- */
  const form = document.getElementById("offerte-form");
  if (form) {
    const status = form.querySelector("[data-form-status]");
    const validators = {
      naam: (v) => v.trim().length >= 2 || "Vul uw volledige naam in.",
      telefoon: (v) => /^[\d\s+()-]{8,}$/.test(v.trim()) || "Vul een geldig telefoonnummer in.",
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Vul een geldig e-mailadres in.",
      adres: (v) => v.trim().length >= 5 || "Vul uw adres in.",
      type: (v) => v !== "" || "Kies het type werkzaamheden.",
      beschrijving: (v) => v.trim().length >= 10 || "Geef een korte beschrijving (min. 10 tekens).",
      akkoord: (v, el) => el.checked || "Ga akkoord met de privacyverklaring.",
    };

    const showError = (field, message) => {
      const wrapper = field.closest(".field");
      wrapper?.classList.toggle("error", !!message);
      const msg = wrapper?.querySelector(".error-msg");
      if (msg) msg.textContent = message || "";
    };

    const validateField = (field) => {
      const rule = validators[field.name];
      if (!rule) return true;
      const result = rule(field.value, field);
      const ok = result === true;
      showError(field, ok ? "" : result);
      return ok;
    };

    Object.keys(validators).forEach((name) => {
      const field = form.elements[name];
      if (field) field.addEventListener("blur", () => validateField(field));
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      Object.keys(validators).forEach((name) => {
        const field = form.elements[name];
        if (field && !validateField(field)) valid = false;
      });

      if (!valid) {
        status.textContent = "Controleer de gemarkeerde velden hierboven.";
        status.className = "form-status error-state";
        return;
      }

      status.textContent = "Bedankt! Uw offerteverzoek is verzonden. Wij reageren binnen 24 uur.";
      status.className = "form-status success";
      form.reset();
      form.querySelectorAll(".field.error").forEach((f) => f.classList.remove("error"));
    });
  }

  /* ---------- Cookie banner ---------- */
  const cookieBanner = document.querySelector(".cookie-banner");
  if (cookieBanner) {
    const consent = localStorage.getItem("rossewij_cookie_consent");
    if (!consent) cookieBanner.classList.add("is-visible");
    cookieBanner.querySelectorAll("[data-cookie-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        localStorage.setItem("rossewij_cookie_consent", btn.dataset.cookieAction);
        cookieBanner.classList.remove("is-visible");
      });
    });
  }

  /* ---------- Header solid state (visual consistency on scroll) ---------- */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
});
