// La navigazione interna di YouTube non ricarica la pagina, quindi le regole
// di rete non bastano: qui intercettiamo click e cambi di URL lato client.
(() => {
  const SUBS = "/feed/subscriptions";

  // Ogni opzione attiva diventa un attributo su <html>, letto dai fogli di stile.
  const ATTRS = {
    hideShorts: "data-ytf-hide-shorts",
    hideRecommended: "data-ytf-hide-recommended",
    hideComments: "data-ytf-hide-comments",
  };

  let settings = YTF_DEFAULTS;
  // I redirect aspettano le opzioni salvate, per non applicare un default che l'utente ha spento.
  let loaded = false;

  const applySettings = (next) => {
    settings = next;
    for (const [key, attr] of Object.entries(ATTRS)) {
      document.documentElement.toggleAttribute(attr, !!settings[key]);
    }
  };

  const target = (url) => {
    if (settings.redirectHome && url.pathname === "/") return SUBS;
    if (settings.hideShorts) {
      const m = url.pathname.match(/^\/shorts\/([\w-]+)/);
      if (m) return `/watch?v=${m[1]}`;
    }
    return null;
  };

  const check = () => {
    if (!loaded) return;
    const dest = target(location);
    if (dest) location.replace(dest);
  };

  const load = () => {
    chrome.storage.sync.get(YTF_DEFAULTS, (stored) => {
      applySettings(stored);
      loaded = true;
      check();
    });
  };

  // Subito i default, così non si vede il lampo degli elementi prima che arrivino le opzioni.
  applySettings(YTF_DEFAULTS);
  load();
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "sync") load();
  });

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

  window.addEventListener("yt-navigate-finish", check);
  window.addEventListener("popstate", check);
})();
