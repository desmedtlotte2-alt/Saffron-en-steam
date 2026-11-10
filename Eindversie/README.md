# Landingspagina V3 (eindversie) · Chathé by Saffron & Steam

Statische landingspagina (HTML, CSS, JS, geen framework), klaar voor GitHub Pages.
Open `index.html` in de browser om ze te bekijken.

V3 bouwt verder op V2 (geen brandbook, enkel de opgelegde merkgegevens: hoofdkleur hsl(15 48% 40%), Fraunces, sfeer exotisch/warm/gedurfd). Het verschil: alle placeholders zijn vervangen door de echte beelden en video uit het project, en de look sluit nu aan bij de campagnebeelden (donkere Figma Buzz-posts met roze titels, donkere AI-beelden, de schenkvideo). Copy: `04_AI_Content/Copy/Copy_landingspagina.md` (v3) en sectie 1 van `Copy_emails_MailerLite.md` (formulier).

## Opbouw

| Sectie | Inhoud | Visual (bron) |
|---|---|---|
| Navigatie | woordmerk "Saffron & Steam" (rechtopstaande &), Ons verhaal · Blends · Ritueel · Spice Club, knop Word lid | — |
| ★ Hero | titel, 2 knoppen, smaakband | vier dozen (`03_Photoshop`, DSC_0045) |
| ★ Verhaal | merkverhaal | AI-beeld rooibos in de jungle (`04_AI_Content/Beelden_Firefly`, bijgesneden 4:5) |
| Belofte | merkbelofte als grote quote | AI-beeld green tea in de jungle als achtergrond |
| Blends | 4 kaarten op een podium in de smaakkleur | 4 vrijgestelde dozen (`03_Photoshop/Batch_Output`) |
| Ritueel | 3 stappen + video | AI-video "Tea being poured", bewerkte eindversie (`04_AI_Content/Video/Eindversies/c79c97b5-….mp4`: 12 s, hoeklogo weg, logo in het midden op het einde), zonder geluid, met pauzeknop |
| Instagram | 6 posts + knop "Volg ons op Instagram" (links zijn plaatshouders, `href="#"`) | Figma Buzz-exports (`05_Social_Media/V2_eindversie/Post`) |
| ★ CTA · Spice Club | voordelen + nieuwsbriefformulier (voornaam, e-mail, opt-in) | duo-doos Chamomile + Ginger (DSC_0051) |
| Footer + privacy | links, disclaimer fictief merk, privacytekst in een pop-up | — |

Niet gebruikt: het AI-beeld met gember (`…10-13-14/24`), omdat het binnenlabel "Rooibos" toont en dus niet klopt met de smaak. De inspiratiefoto staat nergens op de site (plagiaat).

## Externe links

Saffron & Steam is een fictief merk. Er staan daarom **geen links naar echte accounts of merken** op de site: de Instagram-posts, de knop en de footerlink zijn plaatshouders (`href="#"` met `data-placeholder-link`; klikken doet niets). De enige echte externe adressen zijn die van MailerLite (formulier). Heeft Lotte later een eigen (test)account, vervang dan `href="#"` door die link.

## Kleuren en typografie

Alles staat als variabelen bovenaan `css/style.css`: `--clay` (hoofdkleur), `--night` (achtergrond, overgenomen van de posts), `--pink` (titelkleur van de posts), `--cream`, en per smaak `--f-ginger`, `--f-chamomile`, `--f-green`, `--f-rooibos`. Twee lettertypes, allebei lokaal in `Assets/fonts` (OFL): **Fraunces** voor titels en alle tekst, **Caveat** (secundair, handschrift) enkel voor de kleine subtitels: de regel boven elke titel (`.eyebrow`) en het smaakwoord op de kaarten (`.card__char`). Caveat wordt nooit gebruikt voor lopende tekst, knoppen, formulier of kleine info zoals temperatuur en tijd. Zo stuurt de pagina geen IP-adressen naar Google, handig voor het GDPR-luik.

## Test: Caveat op alle kleine tekst

Op vraag van Lotte staat er een test aan: `<html lang="nl" class="caveat-test">` in `index.html` zet Caveat op alle kleine tekst (lopende tekst, knoppen, navigatie, formulierlabels, footer). Titels, citaat, woordmerk, grote cijfers, invulvelden en de witte lopende tekst bij Ons verhaal blijven Fraunces. **Terugzetten:** haal `class="caveat-test"` weg, dan is alles terug zoals voorheen (Caveat enkel op de kleine subtitels). De regels staan onderaan `css/style.css`. De test is behouden: de screenshots in `Screenshots/` tonen de pagina met Caveat. Oudere tussenversies staan in `../Proces/Eindversie_tussenstappen/Screenshots/`.

## Mappen

```
V3_eindversie/
├── index.html
├── css/style.css
├── js/main.js              formulier, privacy-pop-up, video-knop, scroll-animaties
├── Assets/
│   ├── img/                productfoto's en AI-beelden als WebP
│   ├── img/instagram/      Figma Buzz-posts (720 px, WebP)
│   ├── video/              chathe-ritueel.webm + .mp4 (geen geluid)
│   └── fonts/              Fraunces + Caveat, met licenties
└── Screenshots/            Landingspagina_{Desktop,Mobiel}_volledig + per sectie (00 eerste scherm t.e.m. 09 privacy-pop-up)
```

De video staat er in twee formaten: WebM werkt in elke browser, MP4 is de reserve (Safari). Bij "verminder beweging" in het besturingssysteem start de video niet vanzelf.

## Nieuwsbriefformulier (MailerLite, gekoppeld)

Het formulier is gekoppeld aan het MailerLite-formulier **"Newsletter sign-up Saffron & Steam"** (account 2742627). De link staat in `js/main.js` bij `MAILERLITE_ACTION` en als `action` op het formulier in `index.html`.

- Het formulier blijft in de huisstijl: de site controleert de velden en stuurt voornaam en e-mail (`fields[name]`, `fields[email]`) naar MailerLite. De opt-in-checkbox is verplicht en gaat mee als het MailerLite-veld `fields[intresses_saffron_steam][]`, met exact dezelfde tekst als in MailerLite (anders weigert MailerLite de inschrijving).
- Bij het laden telt de pagina één bezoek, zodat Visitors en Conversion in MailerLite (Forms > Overview) kloppen.
- Welke groep een inschrijver krijgt, staat in MailerLite zelf (Edit form > groepen). Dat moet "Newsletter Saffron & Steam" zijn, want de automation start daar.
- Demomodus terug aanzetten: maak `MAILERLITE_ACTION` leeg (`""`).
- Testen: open de pagina online (of lokaal), schrijf je in met een eigen adres en kijk in MailerLite > Subscribers of je erbij staat en of de welkomstmail vertrekt.

## Publiceren via GitHub Pages

1. Maak een publieke repo (bv. `saffronandsteam`) en upload de inhoud van deze map (niet de map zelf), dus `index.html` in de hoofdmap van de repo.
2. Settings > Pages > Source: *Deploy from a branch*, branch `main`, map `/ (root)`.
3. Na een minuut staat de pagina op `https://<gebruikersnaam>.github.io/saffronandsteam/`.

Let op: GitHub Pages is hoofdlettergevoelig. De map heet `Assets` met hoofdletter A, zo staat ze ook in de code.
