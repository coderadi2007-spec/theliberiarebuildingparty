/* navbar.js — sticky, active link, mobile menu */
(function () {
  const nav = document.querySelector(".navbar");
  const links = document.querySelectorAll(".nav__link, .mobile-menu a[data-nav]");
  const path = location.pathname.split("/").pop() || "index.html";
  links.forEach(a => {
    const href = (a.getAttribute("href") || "").split("/").pop();
    if (href === path || (path === "" && href === "index.html")) a.classList.add("active");
  });

  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const burger = document.getElementById("hamburger");
  const menu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("overlay");
  const toggle = (open) => {
    const willOpen = open ?? !menu.classList.contains("open");
    menu.classList.toggle("open", willOpen);
    overlay.classList.toggle("show", willOpen);
    burger.classList.toggle("open", willOpen);
    document.body.style.overflow = willOpen ? "hidden" : "";
  };
  burger?.addEventListener("click", () => toggle());
  overlay?.addEventListener("click", () => toggle(false));
  menu?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => toggle(false)));
})();
