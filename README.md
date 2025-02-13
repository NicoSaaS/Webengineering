# Webengineering

## Feature Ideen:

- Login
- Filmübersicht
  - Filter
  - Suche
  - Filme
    - Beschreibung
    - Kategorie
    - Bewertung
    - Trailerlink / YT
    - Anzeige wo die Filme laufen (YT/Netflix/Prime/Disney) evtl. verlinkung
  - Film-Vorschläge
  - Favouritenliste
    - Favoriten hinzufügen
    - Favouriten löschen
  - Watchlist
    - Filme hinzufügen
    - Filme entfernen
    - Auf „Angeschaut“/… stellen
  - Filmlisten
  - Statistiken
    - Filme
      - Kategorien
    - Suche

## Webseite:

Darauf achten:

- Responsive Design ->Anpassung auf vers. Geräte
- Performance(!)
- Intuitiv & Ansprechend

## Coding:

Darauf achten:

- Klar und lesbar
  - lowCamelCase
  - Helper Funktionen
  - Kurze, verständliche Kommentare
- Ordnerstruktur

## Einzelne Punkte:

- Homepage(Page)
- Filmvorschau(Page)
- Filmranking(Page)
- Such/Filterfunktion

npm install express pug
npm install express-session

npm start 

falls :3000 chon läuft bug:
lsof -i 3000
dann
kill -9 <PID>
