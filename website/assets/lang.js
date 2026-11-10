/* Local translations, no HTML injection and no remote dependencies.
 * Selection: explicit query -> previously chosen language -> Japanese.
 */
(function () {
  "use strict";
  var supported = ["ja", "en", "zh"];
  var storageKey = "cadence-lang";
  var page = document.body.dataset.page || "home";

  function savedLanguage() {
    try { return localStorage.getItem(storageKey); } catch (_) { return null; }
  }

  function pickLanguage() {
    var query = new URLSearchParams(location.search).get("lang");
    if (supported.indexOf(query) !== -1) return query;
    var saved = savedLanguage();
    return supported.indexOf(saved) !== -1 ? saved : "ja";
  }

  function applyLanguage(lang) {
    if (supported.indexOf(lang) === -1) return;
    var copy = window.CadenceCopy[lang];
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : lang;
    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      var text = copy[node.dataset.i18n];
      if (typeof text !== "string") return;
      if (node.hasAttribute("data-count")) text = text.replace("{count}", node.dataset.count);
      node.textContent = text;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (node) {
      var text = copy[node.dataset.i18nAria];
      if (typeof text === "string") node.setAttribute("aria-label", text);
    });
    document.querySelectorAll("[data-set]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.set === lang));
    });
    document.querySelectorAll("[data-language-link]").forEach(function (link) {
      var target = new URL(link.getAttribute("href"), location.href);
      target.searchParams.set("lang", lang);
      link.setAttribute("href", target.pathname + target.search + target.hash);
    });
    document.title = copy["meta." + page + ".title"];
    var description = copy["meta." + page + ".desc"];
    document.querySelector('meta[name="description"]').setAttribute("content", description);
    document.querySelector('meta[property="og:title"]').setAttribute("content", document.title);
    document.querySelector('meta[property="og:description"]').setAttribute("content", description);
    window.CadenceLanguage = lang;
    document.dispatchEvent(new CustomEvent("cadence:language", { detail: lang }));
  }

  document.querySelectorAll("[data-set]").forEach(function (button) {
    button.addEventListener("click", function () {
      var lang = button.dataset.set;
      applyLanguage(lang);
      try { localStorage.setItem(storageKey, lang); } catch (_) { /* Optional preference only. */ }
      var url = new URL(location.href);
      url.searchParams.set("lang", lang);
      history.replaceState(null, "", url);
    });
  });

  applyLanguage(pickLanguage());
})();
