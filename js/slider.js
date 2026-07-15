/* slider.js — simple auto slider for [data-slider] elements */
(function () {
  document.querySelectorAll("[data-slider]").forEach(root => {
    const slides = root.querySelectorAll(".slide");
    if (!slides.length) return;
    let i = 0;
    slides[0].classList.add("active");
    setInterval(() => {
      slides[i].classList.remove("active");
      i = (i + 1) % slides.length;
      slides[i].classList.add("active");
    }, 5000);
  });
})();
