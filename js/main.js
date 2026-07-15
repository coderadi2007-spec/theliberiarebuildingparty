/* main.js — bootstrap all modules */
document.addEventListener("DOMContentLoaded", () => {
  // Loader hide
  const loader = document.getElementById("loader");
  if (loader) {
    window.addEventListener("load", () => {
      setTimeout(() => loader.classList.add("hide"), 300);
    });
    // Fallback
    setTimeout(() => loader.classList.add("hide"), 2500);
  }
  // Set current year in footers
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
  // Ripple effect on .btn
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn");
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const s = Math.max(rect.width, rect.height);
    const r = document.createElement("span");
    r.className = "ripple";
    r.style.width = r.style.height = s + "px";
    r.style.left = (e.clientX - rect.left - s/2) + "px";
    r.style.top = (e.clientY - rect.top - s/2) + "px";
    btn.appendChild(r);
    setTimeout(() => r.remove(), 600);
  });
  // Mouse glow
  const glow = document.getElementById("mouseGlow");
  if (glow) {
    document.addEventListener("mousemove", (e) => {
      glow.classList.add("on");
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    });
  }
});
