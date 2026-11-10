document.documentElement.lang = chrome.i18n.getUILanguage();
for (const el of document.querySelectorAll("[data-i18n]")) {
  el.textContent = chrome.i18n.getMessage(el.dataset.i18n);
}

const boxes = document.querySelectorAll("input[data-key]");

chrome.storage.sync.get(YTF_DEFAULTS, (settings) => {
  for (const box of boxes) box.checked = !!settings[box.dataset.key];
});

for (const box of boxes) {
  box.addEventListener("change", () => {
    chrome.storage.sync.set({ [box.dataset.key]: box.checked });
  });
}
