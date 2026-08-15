/* Cadence website — language switcher shared by index.html and privacy.html.
 *
 * Japanese is the default: the CSS already shows [data-lang="ja"], so a visitor
 * with JavaScript disabled still gets a readable Japanese page. This script only
 * switches away from it.
 *
 * Resolution order: ?lang= → saved choice → browser language → ja.
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

  function fromBrowser() {
    var tags = navigator.languages || [navigator.language || ""];
    for (var i = 0; i < tags.length; i++) {
      var t = String(tags[i]).toLowerCase();
      if (t.indexOf("ja") === 0) return "ja";
      if (t.indexOf("zh") === 0) return "zh";   // zh-TW/zh-HK included: UI is zh-Hans
      if (t.indexOf("en") === 0) return "en";
    }
    return null;
  }

  function pick() {
    var q = new URLSearchParams(location.search).get("lang");
    if (LANGS.indexOf(q) >= 0) return q;
    var s = saved();
    if (LANGS.indexOf(s) >= 0) return s;
    return fromBrowser() || "ja";
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
