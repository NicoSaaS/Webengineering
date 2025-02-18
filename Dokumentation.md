# Ausführliche Dokumentation: Entwurf und Umsetzung der Web-Applikation "CineCanvas"

Diese Dokumentation beschreibt detailliert den Entwurf und die technische Umsetzung der Web-Applikation "CineCanvas", die es Nutzern ermöglicht, Filme und Serien zu suchen, zu entdecken und ihre persönliche Watchlist zu verwalten.

## 1. Einleitung

"CineCanvas" ist eine Web-Applikation, die entwickelt wurde, um Nutzern eine zentrale Plattform für die Verwaltung ihrer Film- und Serieninteressen zu bieten. Die Applikation bietet eine benutzerfreundliche Oberfläche zum Durchsuchen und Entdecken von Medien, die Möglichkeit, eine persönliche Watchlist zu erstellen und zu verwalten, sowie eine einfache Benutzerverwaltung.

## 2. Vorgehensweise beim Entwurf

### 2.1 Ideensammlung (Brainstorming)

In der initialen Phase des Projekts haben wir ein Brainstorming durchgeführt, um die Kernfunktionen und den Umfang der Applikation zu definieren. Dabei kristallisierten sich folgende Hauptideen heraus:

- Zentrale Plattform für Filme und Serien
- Filme und Serien sinnvoll sortieren
- Personalisierte Watchlists
- Einfache Benutzerverwaltung (Registrierung, Login)
- Detaillierte Informationen zu jedem Medium

### 2.2 Konzeptüberlegung und Featureauswahl

Basierend auf den Ergebnissen des Brainstormings haben wir ein detailliertes Konzept erstellt und die wichtigsten Features ausgewählt:

- **Medienkatalog**: Anzeigen von Filmen und Serien sortiert nach Ranking oder Alphabet
- **Watchlist-Funktion**: Hinzufügen und Entfernen von Medien zur persönlichen Watchlist.
- **Benutzerkonten**: Registrierung, Login und Profilverwaltung.
- **Detailansicht**: Anzeigen von detaillierten Informationen zu Filmen und Serien (Beschreibung, Regisseur, etc.).
- **Responsive Design**: Optimierung der Benutzeroberfläche für verschiedene Bildschirmgrößen.

### 2.3 Struktur der Applikation und Architektur (MVC)

Die Applikation wurde unter Berücksichtigung der MVC-Architektur (Model-View-Controller) entwickelt, um eine klare Trennung der Verantwortlichkeiten zu gewährleisten:

- **Model (Datenmodell)**: Die Daten für Filme, Serien und Benutzer werden in JSON-Dateien gespeichert.
- **View (Benutzeroberfläche)**: Die Benutzeroberfläche wird mit Pug erstellt. CSS sorgt für die Gestaltung, JavaScript für die Interaktivität.
- **Controller (Logik)**: Der Controller verarbeitet Benutzeranfragen, interagiert mit dem Model und steuert die Anzeige der Views.

## 3. Technische Umsetzung

### 3.1 Ordnerstruktur und Dateisystem

```
/src
  /data              // JSON-Daten für Filme, Serien und Benutzer
  /public            // Statische Dateien (CSS, Bilder, JavaScript)
    /icon
    /img
      /moviecovers
      /seriescovers
    /scripts
    /styles
  /views            // Pug-Templates für die Darstellung
  server.js          // Haupt-Server-Datei (Controller)
```

### 3.2 Implementierung der Serverlogik (server.js)

Die `server.js` Datei enthält die gesamte Serverlogik der Applikation:

- **Express.js**: Framework für die Erstellung des Webservers.
- **Routing**: Definition der Routen für verschiedene Funktionen der Applikation.
- **Middleware**: Parsen von Formulardaten (body-parser) und Sitzungsverwaltung (express-session).
- **Datenbankanbindung**: Lesen und Schreiben von JSON-Dateien.

### 3.3 Datenmodellierung (JSON)

#### Beispielstruktur einer `movies.json`-Datei:

```json
[
  {
    "id": 0,
    "title": "filmName",
    "image": "img/moviecovers/filmCover",
    "ranking": 1,
    "description": "filmBeschreibung",
    "genre": "filmGenre",
    "director": "filmRegisseur",
    "released": "filmRelease"
  }
]
```

#### Beispielstruktur einer `users.json`-Datei:

```json
[
  {
    "firstName": "Max",
    "lastName": "Mustermann",
    "gender": "male",
    "email": "max.mustermann@example.com",
    "username": "maxi",
    "password": "geheimesPasswort",
    "movie-watchlist": [1, 3],
    "series-watchlist": [2]
  }
]
```

### 3.4 Benutzeroberfläche (Pug, CSS, JavaScript)

- **Pug**: Dynamische HTML-Erzeugung.
- **CSS**: Gestaltung mit Fokus auf modernes Design.
- **JavaScript**: Clientseitige Interaktivität (Modal-Fenster, Watchlist-Funktion).

### 3.5 Interaktive Funktionen (JavaScript, Fetch API)

- **Modal-Fenster**: Anzeige detaillierter Informationen per Klick.
- **Watchlist-Funktion**: Hinzufügen/Entfernen von Medien mit Fetch API.

## 4. Testphase und Feedback



### 4.1 Verbesserungen und Rework

Nach der Implementierung der Grundfunktionen wurden erste Tests durchgeführt, um Fehler zu identifizieren.
Außerdem wurden basierend auf Feedback Optimierungen vorgenommen:

- **UI-Verbesserungen**
- **Fehlerbehebungen**
- **Verbesserung der Funktionalitäten**

### 4.2 Finalisierung (Release)

Nach ausführlichen Tests wurde die Applikation finalisiert und bereitgestellt.

## 5. Verwendete Tools und Technologien

- **Node.js**: Laufzeitumgebung
- **Express.js**: Web-Framework
- **Pug**: Template Engine
- **CSS**: Stylesheet-Sprache
- **JavaScript**: Clientseitige Interaktivität
- **JSON**: Datenspeicherung
- **Prettier**: Code-Formatierung

---

