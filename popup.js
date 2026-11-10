const boxes = document.querySelectorAll("input[data-key]");

chrome.storage.sync.get(YTF_DEFAULTS, (settings) => {
  for (const box of boxes) box.checked = !!settings[box.dataset.key];
});

for (const box of boxes) {
  box.addEventListener("change", () => {
    chrome.storage.sync.set({ [box.dataset.key]: box.checked });
  });
}
