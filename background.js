// Le regole di rete sono statiche: qui le accendiamo o spegniamo in base alle opzioni.
importScripts("settings.js");

// opzione -> id del ruleset dichiarato nel manifest
const RULESETS = {
  redirectHome: "home",
  hideShorts: "shorts",
};

const syncRulesets = async () => {
  const settings = await chrome.storage.sync.get(YTF_DEFAULTS);
  const enableRulesetIds = [];
  const disableRulesetIds = [];
  for (const [key, id] of Object.entries(RULESETS)) {
    (settings[key] ? enableRulesetIds : disableRulesetIds).push(id);
  }
  await chrome.declarativeNetRequest.updateEnabledRulesets({ enableRulesetIds, disableRulesetIds });
};

// Dopo un aggiornamento Chrome ripristina i ruleset del manifest: vanno riallineati.
chrome.runtime.onInstalled.addListener(syncRulesets);
chrome.runtime.onStartup.addListener(syncRulesets);
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync") syncRulesets();
});
