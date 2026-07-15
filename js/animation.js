/* animation.js — counters + typing */
(function () {
  // Counters
  const counters = document.querySelectorAll("[data-count]");
  const animate = (el) => {
    const target = parseFloat(el.getAttribute("data-count")) || 0;
    const suffix = el.getAttribute("data-suffix") || "";
    const dur = 1600;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.textContent = (target % 1 === 0 ? Math.round(val) : val.toFixed(1)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.4 });
    counters.forEach(c => io.observe(c));
  } else counters.forEach(animate);

  // Typing effect (data-type="text1|text2|text3")
  document.querySelectorAll("[data-type]").forEach(el => {
    const items = el.getAttribute("data-type").split("|");
    let i = 0, j = 0, del = false;
    el.classList.add("typing");
    const tick = () => {
      const cur = items[i];
      el.textContent = del ? cur.slice(0, --j) : cur.slice(0, ++j);
      let wait = del ? 40 : 90;
      if (!del && j === cur.length) { wait = 1500; del = true; }
      else if (del && j === 0) { del = false; i = (i + 1) % items.length; wait = 400; }
      setTimeout(tick, wait);
    };
    tick();
  });
})();
