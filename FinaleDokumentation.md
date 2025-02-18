# Dokumentation: Entwurf und Umsetzung der Web-Applikation "CineCanvas"

## Inhaltsverzeichnis
1. Einleitung
2. Entwurf der Applikation
2.1 Ideensammlung und Zielsetzung
2.2 Konzept und Featureauswahl
3. Technische Umsetzung
3.1 Architektur
3.2 Ordnerstruktur
3.3 Implementierung der Serverlogik
3.4 Datenmodellierung
3.5 Benutzeroberfläche und Interaktivität
4. Testphase und Verbesserungen
4.1 Testphase und Fehlerbehebung
4.2 Finalisierung
5. Verwendete Tools und Technologien
6. Quellen und Hilfsmittel-Verzeichnis
---

## 1. Einleitung

Diese Dokumentation beschreibt detailiert den Entwurf und die technische Umsetzung der Web-Applikation "CineCanvas". Die Applikation ermöglicht Nutzern Filme und Serien zu suchen, entdecken und ihre persöhnliche Watchlist zu verwalten - alles in einem Ort. Der Fokus liegt dabei auf einer benutzerfreundlichen und intuitiven Benutzeroberfläche, die auf verschiedenen Geräten nutzbar ist.

---

## 2. Entwurf der Applikation
### 2.1 Ideensammlung und Zielsetzung

Zu Beginn des Projekts haben wir ein Brainstorming durchgeführt, um die Kernfunktionen und den Umfang der Applikation zu definieren. Diese sind als folgende Ziele formuliert:
- **Medienkatalog für Filme und Serien**: Filme und Serien sollen nach Ranking und nach Alphabet sortiert sein
- **Detailansicht** Beim Klick auf ein Film oder eine Serie öffnet sich eine detaillierte Ansicht mit weiteren Informationen
- **Benutzerverwaltung**: Registrierung, Anmeldung, Profilansicht und Watchlist
- **Watchlist-Verwaltung**:Filme & Serien hinzufügen und entfernen und anschlie
- **Responsive Design**: Web-Applikation passt sich dynamisch an verschiedene Bildschirmgrößen (Laptop, Tablet, Handy) an

### 2.2 Design
Das Design von "CineCanvas" setzt auf eine minimalistische und klare Struktur. Mit der übersichtlichen Navigationsbar wird ein schneller Zugriff zur Übersicht, Ranking, Watchlist und zum Profil ermöglicht.

Erstes Konzept:


```
CineCanvas              Home Movies Series Watchlist Profile
```
```
Movies
 x    y    z


Series
 x    y    z


```
```
©CineCanvas                                            Names
```

---

## 3. Technische Umsetzung
### 3.1 Architektur

Die Applikation wurde unter Verwendung des Model-View-Controller (MVC)-Architekturmodells entwickelt. Diese Architektur trennt die Datenlogik (Model), die Darstellung (View) und die Anwendungslogik (Controller), um die Wartbarkeit und Skalierbarkeit der Anwendung zu verbessern.

**Model (Datenmodell)**: Enthält alle Informationen zu Filmen, Serien und Benutzern, gespeichert in JSON-Dateien
**View (Benutzeroberfläche)**: Stellt die Daten unter Verwendung von Pug und CSS dar
**Controller (Logik)**: Verwaltet die Anfragen des Nutzers, greift auf das Model zu und übergibt die Daten an die View

### 3.2 Ordnerstruktur
Die Web-Applikation folgt einer strukturierten Ordnerorganisation, die die Trennung der verschiedenen Bereiche aufzeigt. Die Ordnerstruktur sieht wie folgt aus:
```
/src
  /data              // JSON-Daten für Filme, Serien und Benutzer
  /public            // Statische Dateien (CSS, Bilder, JavaScript)
    /icon            // Icon-Dateien
    /img             // Medienbilder (Filmcovers, Seriencover)
    /scripts         // JavaScript für interaktive Funktionen
    /styles          // CSS-Dokument
  /views             // Pug-Templates für die HTML-Ausgabe
  server.js          // Haupt-Server-Datei (Controller)
```

### 3.3 Implementierung der Serverlogik
Die `server.js`-Datei enthält die komplette Serverlogik und verwendet das **Express.js** Framework für die Erstellung des Webservers. Folgende Funktionalitäten werden umgesetzt:

* **Routing**: Übersichtliche und strukturierte Definition von Routenwelche auf Pug-Templates zurückgreifen:
    + Öffentliche Routen
    + Benutzerauthentifizierung
    + Watchlist-Verwaltung
* **Middleware**: Die Middleware ermöglicht eine reibungslose Kommunikation zwischen Client und Server, indem sie Anfragen vor der Verarbeitung vorbereitet und zusätzliche Funktionalitäten bereitzustellen:
    + Body-Parser
    + Express-Session
    + Static Files
* **Datenbankanbindung**: Die Anwendung verarbeitet Daten und die API-Logik stellt sicher, dass Benutzerinteraktionen direkt reflektiert und in JSON-Dateien gespeichert werden:
    + Laden und Speichern von Daten
    + Dynamische Aktualisierung

### 3.4 Datenmodellierung

Die Medien- und Benutzerdaten werden in JSON-Dateien gespeichert. Beispielstrukturen:

Struktur der `movies.json`-Datei:
```
[
  {
    "id": 0,
    "title": "Filmname",
    "image": "img/moviecovers/filmCover",
    "ranking": 1,
    "description": "Filmbeschreibung",
    "genre": "Filmgenre",
    "director": "Filmregisseur",
    "released": "Filmpublikation"
  }
]
```
Struktur der `users.json`-Datei:
```
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

### 3.5 Benutzeroberfläche und Interaktivität

Die Benutzeroberfläche wurde mit Pug für dynamische HTML-Generierung und CSS für das Design entwickelt. Interaktive Funktionen wurden mit JavaScript umgesetzt. Zu den interaktiven Features gehören:

- **Modal-Fenster**: Beim Klicken auf ein Medium wird ein Modal-Fenster mit detaillierten Informationen angezeigt
- **Watchlist-Verwaltung**: Nutzer können Medien per Klick zur Watchlist hinzufügen oder entfernen, unterstützt durch die Fetch API
---
## 4. Testphase und Verbesserungen
### 4.1 Testphase und Fehlerbehebung
Nach der Implementierung der grundlegenden Funktionen wurde die Applikation einer Testphase unterzogen. Hierbei wurden Fehler identifiziert und behoben. Außerdem wurden verschiedene Optimierungen auf Basis von Feedback umgesetzt:

- **UI-Verbesserungen**: Verbesserung des Layouts und der Benutzerführung
- **Responsive Design**: Kleinere Anpassungen um ein rundum unterstütztes Responsive Design zu gewähren
- **Fehlerbehebungen**: Behebung kleinerer Bugs in der Funktionalität
- **Optimierung der Performance**: Vereinfachung der Benutzerinteraktionen und Verbesserung der Ladezeiten
- **Clean Code**: Verschönerung des Codes

### 4.2 Finalisierung
Nach erfolgreichen Tests und dem Implementieren von Verbesserungen wurde die Applikation finalisiert. Es wurden keine Veränderungen mehr am Coding vorgenommen.

---

## 5. Verwendete Tools und Technologien
Für die Entwicklung von "CineCanvas" wurden folgende Tools und Technologien verwendet:

- **Node.js**: Laufzeitumgebung für den Server
- **Express.js**: Web-Framework zur Erstellung des Servers und der Routen
- **Pug**: Template Engine zur dynamischen HTML-Erstellung
- **CSS**: Stylesheet-Sprache für das Design
- **JavaScript**: Clientseitige Interaktivität
- **JSON**: Datenmodellierung und Speicherung
- **Prettier**: Code-Formatierung und -Standardisierung

---

## 6. Quellen und Hilfsmittel-Verzeichnis


