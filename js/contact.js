/* contact.js — submit form to FormSubmit (no backend needed) */
(function () {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const modal = document.getElementById("resultModal");
  const modalIcon = document.getElementById("resultIcon");
  const modalTitle = document.getElementById("resultTitle");
  const modalMsg = document.getElementById("resultMsg");
  const closeBtns = modal?.querySelectorAll("[data-close]") || [];
  const btn = form.querySelector("button[type=submit]");

  const openModal = (ok, title, msg) => {
    modalIcon.className = "modal__icon" + (ok ? "" : " err");
    modalIcon.innerHTML = ok ? "&#10003;" : "!";
    modalTitle.textContent = title;
    modalMsg.textContent = msg;
    modal.classList.add("open");
  };
  closeBtns.forEach(b => b.addEventListener("click", () => modal.classList.remove("open")));
  modal?.addEventListener("click", (e) => { if (e.target === modal) modal.classList.remove("open"); });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!window.LRPForm.validate(form)) return;
    const data = new FormData(form);
    // Metadata
    data.append("_submissionDate", new Date().toString());
    data.append("_browser", navigator.userAgent);
    data.append("_pageURL", location.href);
    // Format subject line for the inbox
    const subj = (data.get("subject") || "New Contact Message").toString();
    data.set("_subject", "REBUILDERS | " + subj);
    // Selected options summary
    const opts = [];
    if (data.get("joinVolunteer")) opts.push("Join as Volunteer");
    if (data.get("joinParty"))    opts.push("Join the Party");
    if (data.get("newsletter"))   opts.push("Subscribe Newsletter");
    data.append("Selected Options", opts.join(", ") || "None");

    btn.disabled = true;
    const orig = btn.innerHTML;
    btn.innerHTML = "Sending…";

    try {
      const res = await fetch("https://formsubmit.co/ajax/theliberiarebuildingparty@gmail.com", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: data
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && (json.success === "true" || json.success === true)) {
        openModal(true, "Message Received", "Thank you! Your message has been delivered to the REBUILDERS team. We'll be in touch shortly.");
        form.reset();
      } else {
        openModal(false, "Submission Failed", "Something went wrong. Please try again or email us directly at theliberiarebuildingparty@gmail.com.");
      }
    } catch (err) {
      openModal(false, "Network Error", "We couldn't reach our server. Please check your connection and try again.");
    } finally {
      btn.disabled = false;
      btn.innerHTML = orig;
    }
  });
})();
