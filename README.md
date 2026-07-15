# Liberia Rebuilding Party — The REBUILDERS

Rain or Shine, Rebuild Liberia.

A pure HTML5 / CSS3 / vanilla JavaScript website — no build step, no dependencies, no framework.

## Run

1. Open the folder in **VS Code**.
2. Install the **Live Server** extension (Ritwick Dey) if you don't have it.
3. Right-click `index.html` → **Open with Live Server**.

That's it. You can also just double-click `index.html`.

## Structure

```
rebuilders-site/
├── index.html
├── about.html
├── manifesto.html
├── leadership.html
├── news.html
├── events.html
├── volunteer.html
├── contact.html
├── privacy.html
├── terms.html
├── 404.html
├── css/
│   ├── main.css        (design tokens, layout, sections)
│   ├── components.css  (buttons, navbar, footer, forms, modal)
│   ├── animations.css  (keyframes, reveal, hover)
│   ├── pages.css       (page-specific)
│   └── responsive.css  (mobile / tablet tweaks)
├── js/
│   ├── main.js         (loader, ripple, mouse-glow bootstrap)
│   ├── navbar.js       (sticky nav, active link, mobile menu)
│   ├── scroll.js       (reveal-on-scroll, back-to-top, smooth anchors)
│   ├── animation.js    (number counters, typing effect)
│   ├── slider.js       (auto slider for any [data-slider])
│   ├── form.js         (client-side validation helpers)
│   └── contact.js      (AJAX submit to FormSubmit — real email)
├── images/
├── icons/
├── assets/
└── README.md
```

## Contact form — real email delivery

The form on `contact.html` submits to **FormSubmit.co** (no backend required)
and delivers every message to:

> **theliberiarebuildingparty@gmail.com**

### First-time activation (one click, one time)

The very first submission after you go live triggers a confirmation email
from FormSubmit to the party inbox. Click the "Confirm your email" link
inside that message once — after that, every submission arrives directly in
the inbox with no further steps.

Each email includes: Full Name, Phone, WhatsApp, Email, Country, County,
Subject, Message, Reason for Contact, Selected Options (Volunteer / Join Party
/ Newsletter), Submission Date, Browser and Page URL.

To switch to a different email service later, edit the `fetch(...)` URL in
`js/contact.js`. It works out of the box with **EmailJS**, **Web3Forms** and
**Formspree** — just swap the endpoint.

## Contacts

- Address: 24th Street / Russell Avenue, Sinkor, Monrovia, Liberia
- Phone / WhatsApp: +231 777 561 922
- Email: theliberiarebuildingparty@gmail.com
- Founded: May 30, 2023
