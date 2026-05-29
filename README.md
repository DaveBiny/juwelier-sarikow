# Juwelier Sarikow Webseite

Lokaler Prototyp einer hochwertigen Juwelier-Webseite mit Produktverwaltung und Anfrage-Katalog.

## Start

```bash
python3 -m http.server 4173
```

Danach im Browser öffnen:

```text
http://localhost:4173/
```

## Admin-Login

- Benutzername: `admin`
- Passwort: `atelier2026`

Im Adminbereich können Produkte erstellt, bearbeitet und gelöscht werden. Bilder werden per Upload als lokale Browserdaten gespeichert. Neue Produkte erscheinen automatisch auf der passenden Kategorieseite.

## Bildimport

Die Originalbilder liegen unverändert in `AlleBilder/`. Für die Webseite wurden optimierte Kopien erstellt:

- `assets/optimized/thumbs/` kleine Vorschaubilder für Listen
- `assets/optimized/full/` größere Bilder für Detailseiten
- `assets/business/` Geschäftsbilder
- `assets/logos/` Logos und Markenbilder
- `assets/generated/products-data.js` importierte Produktdaten

## Seiten

- `index.html` Startseite
- `schmuck.html` Schmuck
- `uhren.html` Uhren
- `anlaesse.html` Anlässe
- `produkt.html?id=ring-aurora` Produktdetailseite
- `ueber.html` Über uns
- `service.html` Service
- `kontakt.html` Kontakt
- `wunschliste.html` Wunschliste

## Hinweis

Die Produktdaten liegen in `localStorage` des Browsers. Für eine echte Live-Version sollte diese Oberfläche später an ein Backend mit Datenbank, Bildspeicher, Authentifizierung, Rollenrechten und E-Mail-Versand für Anfragen angebunden werden.
