# Focus for YouTube

Estensione per Chrome (Manifest V3) che riduce le distrazioni su YouTube:

- nasconde gli Shorts e apre i link Shorts nel player normale;
- apre le Iscrizioni al posto della Home;
- nasconde i video consigliati;
- nasconde i commenti.

Ogni opzione si attiva o disattiva dal popup. Nessun dato raccolto, nessuna
richiesta di rete.

Progetto indipendente, non affiliato a YouTube o Google LLC.

[Privacy policy](store/privacy-policy.md)

## Struttura

| File | Ruolo |
| --- | --- |
| `manifest.json` | Manifest; nome e descrizione arrivano da `_locales/` |
| `settings.js` | Opzioni e default, condivisi da tutti gli script |
| `content.js` | Applica le opzioni alla pagina e gestisce la navigazione interna |
| `background.js` | Accende o spegne le regole di rete in base alle opzioni |
| `rules-home.json`, `rules-shorts.json` | Redirect a livello di rete |
| `hide-shorts.css`, `hide-distractions.css` | Selettori degli elementi nascosti |
| `popup.html`, `popup.js` | Popup delle opzioni |
| `_locales/` | Traduzioni (inglese predefinito, italiano) |
| `icons/` | Icone; `icon.svg` è il sorgente |
| `store/` | Testi per la scheda dello store e privacy policy |

## Sviluppo

Caricare la cartella da `chrome://extensions` con "Carica estensione non
pacchettizzata". Dopo una modifica, premere il pulsante di ricarica
dell'estensione.

Per rigenerare le icone dopo aver modificato `icons/icon.svg`:

    for s in 16 32 48 128; do rsvg-convert -w $s -h $s icons/icon.svg -o icons/icon$s.png; done

## Pubblicazione

    ./build.sh

crea `dist/focus-for-youtube-<versione>.zip`, il pacchetto da caricare sullo
store. I passi restanti sono in `store/listing.md`.
