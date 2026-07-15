/* Renders news list (news.html) and news detail (news-details.html) */
(function () {
  var articles = window.NEWS_ARTICLES || [];

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- NEWS LIST ---------- */
  var listEl = document.getElementById("newsList");
  if (listEl) {
    listEl.innerHTML = articles
      .map(function (a) {
        return (
          '<article class="news-card reveal">' +
          '<div class="news-card__img"><img src="' + a.image + '" alt="' + esc(a.title) + '" loading="lazy"></div>' +
          '<div class="news-card__body">' +
          '<div class="news-card__meta"><span class="news-card__tag">' + esc(a.category) + "</span> &middot; " + esc(a.date) + "</div>" +
          "<h3>" + esc(a.title) + "</h3>" +
          "<p>" + esc(a.excerpt) + "</p>" +
          '<a href="news-details.html?id=' + a.id + '" class="news-card__link" aria-label="Read: ' + esc(a.title) + '">Read more &rarr;</a>' +
          "</div></article>"
        );
      })
      .join("");
  }

  /* ---------- NEWS DETAIL ---------- */
  var detailEl = document.getElementById("newsDetail");
  if (!detailEl) return;

  var params = new URLSearchParams(window.location.search);
  var id = parseInt(params.get("id"), 10) || 1;
  var index = articles.findIndex(function (a) { return a.id === id; });
  if (index === -1) index = 0;
  var a = articles[index];
  var prev = articles[(index - 1 + articles.length) % articles.length];
  var next = articles[(index + 1) % articles.length];

  document.title = a.title + " | Liberia Rebuilding Party";
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", a.excerpt);
  var ogT = document.querySelector('meta[property="og:title"]');
  if (ogT) ogT.setAttribute("content", a.title);
  var ogD = document.querySelector('meta[property="og:description"]');
  if (ogD) ogD.setAttribute("content", a.excerpt);

  var shareUrl = encodeURIComponent(window.location.href);
  var shareText = encodeURIComponent(a.title + " — Liberia Rebuilding Party");

  var related = articles
    .filter(function (x) { return x.id !== a.id; })
    .slice(0, 3);

  detailEl.innerHTML =
    '<div class="container">' +
      '<a href="news.html" class="back-link">&larr; Back to News</a>' +
      '<div class="news-detail__hero"><img src="' + a.image + '" alt="' + esc(a.title) + '"></div>' +
      '<div class="news-detail__meta">' +
        '<span class="tag">' + esc(a.category) + "</span>" +
        "<span>" + esc(a.date) + "</span>" +
      "</div>" +
      '<h1 class="news-detail__title">' + esc(a.title) + "</h1>" +
      '<p class="news-detail__lead">' + esc(a.excerpt) + "</p>" +
      '<div class="news-detail__body">' + a.body + "</div>" +
      '<div class="share" role="group" aria-label="Share this article">' +
        '<span class="share__label">Share</span>' +
        '<a target="_blank" rel="noopener" href="https://wa.me/?text=' + shareText + "%20" + shareUrl + '" aria-label="Share on WhatsApp">' +
          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 3.5A11 11 0 0 0 3.6 18.2L2 22l3.9-1.5A11 11 0 1 0 20 3.5zm-8 18a9 9 0 0 1-4.6-1.3l-.3-.2-2.3.9.8-2.3-.2-.3A9 9 0 1 1 12 21.5zm5-6.6c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-3.6-3.1c-.3-.5.3-.5.8-1.5.1-.2 0-.3 0-.5s-.6-1.5-.8-2-.4-.4-.6-.4h-.5c-.2 0-.5.1-.8.4a3.2 3.2 0 0 0-1 2.4c0 1.4 1 2.8 1.2 3s2 3 5 4.2c.7.3 1.3.4 1.7.5.7.1 1.3.1 1.8 0s1.6-.7 1.8-1.3.3-1.2.2-1.3-.3-.2-.6-.3z"/></svg>' +
          "WhatsApp</a>" +
        '<a target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=' + shareUrl + '" aria-label="Share on Facebook">' +
          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h3l1-4h-4V7.5c0-1.1.4-2 2-2h2V2h-3c-3 0-5 1.8-5 5v3H6v4h3v8h4z"/></svg>' +
          "Facebook</a>" +
        '<a target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?text=' + shareText + "&url=" + shareUrl + '" aria-label="Share on X">' +
          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h3l-7 8 8 12h-6l-5-7-6 7H2l7-9L1 2h6l4 6 5-6z"/></svg>' +
          "X</a>" +
      "</div>" +
      '<nav class="pn-nav" aria-label="Article navigation">' +
        '<a class="prev" href="news-details.html?id=' + prev.id + '">' +
          '<span class="dir">&larr; Previous</span><span class="ttl">' + esc(prev.title) + "</span></a>" +
        '<a class="next" href="news-details.html?id=' + next.id + '">' +
          '<span class="dir">Next &rarr;</span><span class="ttl">' + esc(next.title) + "</span></a>" +
      "</nav>" +
    "</div>" +
    '<section class="section section-alt"><div class="container">' +
      '<div class="section-head"><span class="eyebrow">Related</span><div class="divider"></div><h2>More From The Rebuilders</h2></div>' +
      '<div class="grid grid-3">' +
        related.map(function (r) {
          return (
            '<article class="news-card">' +
            '<div class="news-card__img"><img src="' + r.image + '" alt="' + esc(r.title) + '" loading="lazy"></div>' +
            '<div class="news-card__body">' +
            '<div class="news-card__meta"><span class="news-card__tag">' + esc(r.category) + "</span> &middot; " + esc(r.date) + "</div>" +
            "<h3>" + esc(r.title) + "</h3>" +
            '<a href="news-details.html?id=' + r.id + '" class="news-card__link">Read more &rarr;</a>' +
            "</div></article>"
          );
        }).join("") +
      "</div>" +
    "</div></section>";
})();
