### Grober Ablauf

1. Ideensammlung: Was für eine Web-Applikation wollen wir bauen?
2. Konzeptüberlegung und Featureauswahl
3. Ordnerstruktur erstellen
4. Erste Seite & Einarbeitung in PUG
5. Lokales Deployen des Servers & Erstellen der benötigten Webseiten
6. Einpflegen von Daten
7. CSS Modeling
8. Rework (mehrfach)
9. Naming: lowerCamelCase
10. Add Prettier
11. First Finish Coding
12. Testen
13. Rework & Kommentare
14. Last Finish Coding
15. Dokumentation erstellen

## Dokumentation: Entwurf und Umsetzung der Web-Applikation

### Inhaltsverzeichnis
1. Einleitung  
2. Vorgehensweise beim Entwurf  
   2.1 Ideensammlung  
   2.2 Konzeptüberlegung und Featureauswahl  
   2.3 Struktur der Applikation und Architektur  
3. Technische Umsetzung  
   3.1 Ordnerstruktur und Dateisystem  
   3.2 Implementierung der Serverlogik  
   3.3 Datenmodellierung  
   3.4 Benutzeroberfläche  
   3.5 Interaktive Funktionen  
4. Testphase und Feedback  
   4.1 Erster Testlauf  
   4.2 Verbesserungen und Rework  
   4.3 Finalisierung  
5. Abschließende Dokumentation  
6. Verwendete Tools und Technologien  

### 1. Einleitung
Diese Dokumentation beschreibt den Entwurf und die technische Umsetzung einer Web-Applikation, die es den Nutzern ermöglicht, Filme und Serien zu durchsuchen, anzusehen und zu ihrer persönlichen Watchlist hinzuzufügen. Die Applikation unterstützt zudem die Nutzer bei der Registrierung, Anmeldung und Verwaltung ihres Profils.

### 2. Vorgehensweise beim Entwurf

#### 2.1 Ideensammlung
Zu Beginn der Entwicklung haben wir uns Gedanken darüber gemacht, welche Art von Web-Applikation wir erstellen möchten. Die Wahl fiel auf eine Medien-Datenbank, die sowohl Filme als auch Serien enthält. Nutzer sollten in der Lage sein, Medien zu durchsuchen und diese zu einer persönlichen Watchlist hinzuzufügen, um eine personalisierte Übersicht zu haben.

#### 2.2 Konzeptüberlegung und Featureauswahl
Unsere erste Konzeptphase beinhaltete die Auswahl der Hauptfunktionen:

- **Anmeldung/Registrierung**: Nutzer können ein Profil erstellen und sich einloggen.
- **Medien anzeigen**: Filme und Serien aus einer JSON-Datei sollen angezeigt werden.
- **Watchlist**: Nutzer können Filme und Serien zu ihrer persönlichen Watchlist hinzufügen oder daraus entfernen.
- **Benutzerprofil**: Darstellung und Verwaltung des eigenen Profils.
- **Interaktive Popups**: Details zu einzelnen Filmen/Serien werden in einem Modal-Fenster angezeigt.

#### 2.3 Struktur der Applikation und Architektur
Die Applikation folgt der MVC-Methodik (Model-View-Controller), wobei:

- **Model**: Die JSON-Daten für Filme, Serien und Benutzer werden als Datenquelle genutzt.
- **View**: Die Benutzeroberfläche wird mit Pug (Template Engine) generiert, wobei HTML, CSS und JavaScript für die Interaktivität verwendet werden.
- **Controller**: Die Routen und Logik zur Verarbeitung von HTTP-Anfragen (z.B. Login, Registrierung, Film- und Serienanzeige, etc.) werden in der `server.js` behandelt.

### 3. Technische Umsetzung

#### 3.1 Ordnerstruktur und Dateisystem
Die grundlegende Struktur unserer Applikation:

```
/src
  /data              // JSON-Daten für Filme, Serien und Benutzer
  /public            // Statische Dateien (z.B. CSS, Bilder, JavaScript)
  /views             // Pug-Templates für die Darstellung
  server.js          // Haupt-Server-Datei
```

#### 3.2 Implementierung der Serverlogik
In der `server.js` haben wir Express verwendet, um die Serverlogik zu implementieren. Wir haben Middleware für das Parsen von Anfragen und Sitzungsmanagement eingebaut. Die wichtigen Routen und deren Funktionsweise:

- **Login**: Der Nutzer wird authentifiziert und in einer Sitzung gespeichert.
- **Registration**: Der Nutzer wird bei erfolgreicher Eingabe in die Benutzer-Datenbank aufgenommen.
- **Filme und Serien**: Diese werden aus JSON-Dateien geladen und gruppiert nach dem ersten Buchstaben des Titels angezeigt.
- **Watchlist**: Filme und Serien können der persönlichen Watchlist hinzugefügt und entfernt werden.

#### 3.3 Datenmodellierung
Die Daten für Filme, Serien und Nutzer wurden als JSON-Dateien gespeichert. Jede Datei enthält eine Liste von Objekten mit spezifischen Eigenschaften:

Beispielstruktur einer `movies.json`-Datei:

```json
[
  {
    "id": 1,
    "title": "Film Titel",
    "description": "Beschreibung des Films",
    "genre": "Drama",
    "ranking": 8,
    "director": "Regisseur Name",
    "released": "2023-05-01",
    "image": "url_zum_bild.jpg"
  }
]
```

#### 3.4 Benutzeroberfläche
Die Benutzeroberfläche wurde mit Pug und CSS erstellt. Die Hauptfunktionen beinhalten:

- Such- und Filterfunktionen für Filme und Serien.
- Interaktive Details-Ansicht für Filme und Serien, die per Klick in einem Modal angezeigt werden.
- CSS-Modeling: Ein ansprechendes, responsives Design für eine angenehme Benutzererfahrung.

#### 3.5 Interaktive Funktionen
Für die Interaktivität haben wir JavaScript genutzt. Ein besonderes Feature war das Anzeigen von Filmen und Serien im Modal, wo Nutzer detaillierte Informationen sehen und es ihrer Watchlist hinzufügen können.

### 4. Testphase und Feedback

#### 4.1 Erster Testlauf
Nach der Implementierung der ersten Version haben wir die Applikation lokal getestet. Hierbei wurden grundlegende Funktionen überprüft.

#### 4.2 Verbesserungen und Rework
Basierend auf den Tests und Feedback wurden Optimierungen durchgeführt:

- Verbesserung der Benutzeroberfläche.
- Fehlerbehebung bei der Anmeldung.
- Erweiterung der Pug-Templates für besseren Code.

#### 4.3 Finalisierung
Nach mehreren Iterationen und Tests wurde die Applikation finalisiert.

### 5. Abschließende Dokumentation
Am Ende des Projekts wurde eine umfassende Dokumentation erstellt, die die Entwicklungsschritte, Architektur und verwendeten Technologien erklärt.

### 6. Verwendete Tools und Technologien
- **Express.js**: Web-Framework für den Server.
- **Pug**: Template Engine.
- **Body-Parser**: Middleware für das Parsen von POST-Daten.
- **Session**: Sitzungsverwaltung.
- **JavaScript**: Client-seitige Interaktivität.
- **CSS**: Styling.
- **JSON**: Datenstruktur für Filme, Serien und Benutzer.
