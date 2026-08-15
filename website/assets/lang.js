/* Cadence website — language switcher shared by index.html and privacy.html.
 *
 * Japanese is the default, unconditionally: the CSS already shows
 * [data-lang="ja"], so a visitor with JavaScript disabled still gets a readable
 * Japanese page. This script only switches away from it.
 *
 * Resolution order: ?lang= → the visitor's own earlier choice → ja.
 * Browser language is deliberately NOT consulted — Cadence is a Japan-first
 * product, so everyone lands on the Japanese page and picks another language
 * only by asking for one. See docs/DESIGN.md.
 *
 * Each page may define window.CADENCE_META = { ja:{title,desc}, en:…, zh:… }
 * so the <title> and meta description follow the chosen language too.
 */
(function () {
  var LANGS = ["ja", "en", "zh"];
  var STORE_KEY = "cadence-lang";

  function saved() {
    try { return localStorage.getItem(STORE_KEY); } catch (e) { return null; }
  }
  function remember(lang) {
    try { localStorage.setItem(STORE_KEY, lang); } catch (e) { /* private mode */ }
  }

  function pick() {
    var q = new URLSearchParams(location.search).get("lang");
    if (LANGS.indexOf(q) >= 0) return q;
    var s = saved();
    if (LANGS.indexOf(s) >= 0) return s;
    return "ja";
  }

  function apply(lang) {
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : lang;

    document.querySelectorAll("[data-lang]").forEach(function (el) {
      el.style.display = el.getAttribute("data-lang") === lang ? "block" : "none";
    });
    document.querySelectorAll(".langs button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-set") === lang));
    });

    var meta = window.CADENCE_META && window.CADENCE_META[lang];
    if (meta) {
      if (meta.title) document.title = meta.title;
      var d = document.querySelector('meta[name="description"]');
      if (d && meta.desc) d.setAttribute("content", meta.desc);
    }
  }

  document.querySelectorAll(".langs button").forEach(function (b) {
    b.addEventListener("click", function () {
      var lang = b.getAttribute("data-set");
      apply(lang);
      remember(lang);
      // Keep the URL shareable in the language actually being read.
      var url = new URL(location.href);
      url.searchParams.set("lang", lang);
      history.replaceState(null, "", url);
    });
  });

  apply(pick());
})();
