/* form.js — validation helpers */
window.LRPForm = (function () {
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function setError(field, msg) {
    field.classList.add("error");
    const em = field.querySelector(".err-msg");
    if (em) em.textContent = msg;
  }
  function clear(field) { field.classList.remove("error"); }
  function validate(form) {
    let ok = true;
    form.querySelectorAll(".field").forEach(f => {
      const input = f.querySelector("input, textarea, select");
      if (!input) return;
      clear(f);
      const v = (input.value || "").trim();
      if (input.required && !v) { setError(f, "This field is required"); ok = false; return; }
      if (input.type === "email" && v && !emailRe.test(v)) { setError(f, "Enter a valid email"); ok = false; return; }
      if (input.type === "tel" && v && v.replace(/[^\d]/g, "").length < 7) { setError(f, "Enter a valid phone number"); ok = false; return; }
      if (input.maxLength > 0 && v.length > input.maxLength) { setError(f, "Too long"); ok = false; return; }
    });
    return ok;
  }
  return { validate };
})();
