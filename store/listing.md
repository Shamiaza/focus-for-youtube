# Scheda Chrome Web Store

Testi pronti da incollare nella Developer Dashboard
(https://chrome.google.com/webstore/devconsole). Il nome e la descrizione breve
arrivano da `_locales/`, non vanno riscritti a mano.

## Dati generali

- Categoria: Productivity > Workflow & Planning (in alternativa: Well-being)
- Lingua predefinita: English
- Lingue aggiuntive: Italiano

## Descrizione dettagliata (English)

Focus for YouTube removes the parts of YouTube that pull you away from what you
came to watch.

What it does:
- Hides Shorts everywhere: shelves, search results, the sidebar entry and channel tabs. A Shorts link opens in the normal video player instead.
- Opens your Subscriptions instead of the Home feed.
- Hides recommended videos next to and at the end of a video.
- Hides comments.

Every option can be switched on or off from the toolbar popup, and your choices
sync across your browsers.

Privacy: the extension collects nothing. No analytics, no accounts, no network
requests. It only stores your four on/off preferences in Chrome's own sync storage.

It does not block ads and does not download videos.

Free and open source software (GPL-3.0): https://github.com/Shamiaza/focus-for-youtube

Focus for YouTube is an independent project. It is not affiliated with,
endorsed by or sponsored by YouTube or Google LLC. YouTube is a trademark of
Google LLC.

## Descrizione dettagliata (Italiano)

Focus for YouTube toglie da YouTube le parti che ti distraggono da quello che
eri venuto a guardare.

Cosa fa:
- Nasconde gli Shorts ovunque: scaffali, risultati di ricerca, voce del menu laterale e tab dei canali. Un link a uno Short si apre nel player normale.
- Apre le Iscrizioni al posto della Home.
- Nasconde i video consigliati accanto al video e alla fine.
- Nasconde i commenti.

Ogni opzione si attiva o disattiva dal popup nella barra degli strumenti e le
scelte si sincronizzano tra i tuoi browser.

Privacy: l'estensione non raccoglie nulla. Niente statistiche, niente account,
nessuna richiesta di rete. Salva solo le quattro preferenze nello spazio di
sincronizzazione di Chrome.

Non blocca la pubblicità e non scarica video.

Software libero e open source (GPL-3.0): https://github.com/Shamiaza/focus-for-youtube

Focus for YouTube è un progetto indipendente. Non è affiliato, approvato o
sponsorizzato da YouTube o Google LLC. YouTube è un marchio di Google LLC.

## Scheda "Privacy practices"

### Single purpose

Reduce distractions on YouTube by hiding Shorts, recommended videos and
comments, and by opening the Subscriptions feed instead of the Home feed.

### Giustificazione dei permessi

- `storage`: saves the user's four on/off preferences so they persist and sync
  across the user's browsers. Nothing else is stored.
- `declarativeNetRequestWithHostAccess`: redirects two kinds of YouTube page
  loads before they render: the Home page to the Subscriptions feed, and
  /shorts/ID links to the regular /watch player. The rules are static, bundled
  with the extension, and only apply to youtube.com.
- Host permissions (`www.youtube.com`, `m.youtube.com`): required to inject the
  stylesheet that hides the distracting elements and the content script that
  handles YouTube's in-page navigation, and to let the redirect rules apply.
  The extension runs on no other site.

### Remote code

No, the extension does not use remote code. All JavaScript and CSS is bundled
in the package.

### Data usage

Nessuna casella da spuntare: l'estensione non raccoglie né trasmette dati.
Spuntare le tre certificazioni finali (no vendita a terzi, no usi estranei allo
scopo, no valutazione del credito).

### Privacy policy

URL da incollare nel campo apposito:

    https://github.com/Shamiaza/focus-for-youtube/blob/master/store/privacy-policy.md

Homepage e sito di supporto (scheda "Store listing"):

    https://github.com/Shamiaza/focus-for-youtube
    https://github.com/Shamiaza/focus-for-youtube/issues

## Grafica

Tutto pronto, PNG senza trasparenza nei formati richiesti dallo store:

- Icona 128x128: `icons/icon128.png` (già nel pacchetto).
- Screenshot 1280x800, in `store/screenshots/`, da caricare in quest'ordine:
  1. `01-watch-page.png`: pagina video ripulita con il popup aperto.
  2. `02-recommended-comments.png`: prima/dopo su consigliati e commenti.
  3. `03-shorts.png`: prima/dopo sugli Shorts nei risultati di ricerca.
- Small promo tile 440x280: `store/promo-tile-440x280.png`.

Gli screenshot sono catturati da un profilo senza login sul video "Big Buck
Bunny" (Blender Foundation, CC BY). Nei riquadri "prima" le miniature di terzi
e lo Short sono sfocati di proposito.

## Account e invio

- Registrazione sviluppatore: 5 dollari una tantum, verifica in due passaggi
  obbligatoria sull'account Google.
- Dichiarazione trader/non-trader (UE, Digital Services Act): "non-trader" se
  l'estensione è gratuita e non è un'attività commerciale.
- Pacchetto da caricare: l'output di `./build.sh` in `dist/`.
