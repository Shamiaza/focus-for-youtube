// La navigazione interna di YouTube non ricarica la pagina, quindi le regole
// di rete non bastano: qui intercettiamo click e cambi di URL lato client.
(() => {
  const SUBS = "/feed/subscriptions";

  // Ogni opzione attiva diventa un attributo su <html>, letto da hide-distractions.css.
  const ATTRS = {
    hideRecommended: "data-ytf-hide-recommended",
    hideComments: "data-ytf-hide-comments",
  };

  const applySettings = (settings) => {
    for (const [key, attr] of Object.entries(ATTRS)) {
      document.documentElement.toggleAttribute(attr, !!settings[key]);
    }
  };

  applySettings(YTF_DEFAULTS);
  chrome.storage.sync.get(YTF_DEFAULTS, applySettings);
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync") return;
    chrome.storage.sync.get(YTF_DEFAULTS, applySettings);
  });

  const target = (url) => {
    if (url.pathname === "/") return SUBS;
    const m = url.pathname.match(/^\/shorts\/([\w-]+)/);
    if (m) return `/watch?v=${m[1]}`;
    return null;
  };

  const check = () => {
    const dest = target(location);
    if (dest) location.replace(dest);
  };

  // Click su logo / "Home" / miniature Shorts: blocca prima che YouTube li gestisca.
  document.addEventListener(
    "click",
    (e) => {
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.("a[href]");
      if (!a) return;
      let url;
      try { url = new URL(a.href, location.href); } catch { return; }
      if (!url.hostname.endsWith("youtube.com")) return;
      const dest = target(url);
      if (!dest) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      // Se c'è il link "Iscrizioni" nel menu, usalo per una navigazione istantanea.
      const subsLink = dest === SUBS && document.querySelector(`a[href="${SUBS}"]`);
      if (subsLink && subsLink !== a) subsLink.click();
      else location.assign(dest);
    },
    true
  );

  check();
  window.addEventListener("yt-navigate-finish", check);
  window.addEventListener("popstate", check);
})();
