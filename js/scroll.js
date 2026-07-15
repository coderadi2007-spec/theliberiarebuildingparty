/* scroll.js — reveal on scroll + back-to-top */
(function () {
  const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    els.forEach(el => io.observe(el));
  } else {
    els.forEach(el => el.classList.add("in"));
  }

  const top = document.getElementById("backToTop");
  if (top) {
    window.addEventListener("scroll", () => {
      top.classList.toggle("show", window.scrollY > 600);
    }, { passive: true });
    top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // Smooth in-page anchor scroll with header offset
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      const y = t.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });
})();
