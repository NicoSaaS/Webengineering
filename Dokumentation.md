# Dokumentation: Entwurf und Umsetzung der Web-Applikation "CineCanvas"

## Inhaltsverzeichnis
1. Einleitung
2. Entwurf der Applikation
2.1 Ideensammlung und Zielsetzung
2.2 Design
3. Technische Umsetzung
3.1 Architektur
3.2 Ordnerstruktur
3.3 Server-seitige Logik
3.4 Client-seitige Interaktion
3.5 Datenverwaltung
3.6 Umsetzung des Designs
4. Quelltext Beispiele
4.1 Startseite
4.2 Datenmodellierung
4.3 Serverseitige Programmierung
4.4 Clientseitige Programmierung
5. Problembehandlung und Testphase
5.1 Problembehandlung
5.2 Testphase und Fehlerbehebung
5.3 Finalisierung
6. Quellen und Hilfsmittel-Verzeichnis
6.1 Verwendete Hilfsmittel
6.2 Quellenangabe
---

## 1. Einleitung

Diese Dokumentation beschreibt detailiert den Entwurf und die technische Umsetzung der Web-Applikation "CineCanvas". Die Applikation ermöglicht Nutzern Filme und Serien zu entdecken und ihre persönliche Watchlist zu verwalten - alles in einem Ort. Der Fokus liegt dabei auf einer benutzerfreundlichen und intuitiven Benutzeroberfläche, die auf verschiedenen Geräten nutzbar ist.

---

## 2. Entwurf der Applikation
### 2.1 Ideensammlung und Zielsetzung

Zu Beginn des Projekts haben wir ein Brainstorming durchgeführt, um die Kernfunktionen und den Umfang der Applikation zu definieren. Diese sind als folgende Ziele formuliert:
- **Medienkatalog für Filme und Serien**: Filme und Serien sollen nach Ranking und nach Alphabet sortiert sein
- **Detailansicht**: Beim Klick auf ein Film oder eine Serie öffnet sich eine detaillierte Ansicht mit weiteren Informationen
- **Benutzerverwaltung**: Registrierung, Anmeldung, Profilansicht und persönliche Watchlist als Funktionen
- **Watchlist-Verwaltung**: Filme & Serien hinzufügen und entfernen sowie Detailansicht anzeigen lassen
- **Responsive Design**: Web-Applikation passt sich dynamisch an verschiedene Bildschirmgrößen (Laptop, Tablet, Handy) an

### 2.2 Design
Das Design von "CineCanvas" setzt auf eine minimalistische und klare Struktur. Mit der übersichtlichen Navigationsbar wird ein schneller Zugriff zur Übersicht, Ranking, Watchlist und zum Profil ermöglicht.

Erstes Konzept:


```
Navigationbar
```
```
Movies
 x    y    z


Series
 x    y    z


```
```
Footer
```

---

## 3. Technische Umsetzung
### 3.1 Architektur

Die Applikation wurde unter Verwendung des **Model-View-Controller (MVC)-Architekturmodells** entwickelt. Diese Architektur trennt die Datenlogik (**Model**), die Darstellung (**View**) und die Anwendungslogik (**Controller**), um die **Wartbarkeit** und **Skalierbarkeit** der Anwendung zu verbessern.

#### **Model (Datenmodell)**
Das **Model** ist für die Verwaltung und Verarbeitung der Anwendungsdaten verantwortlich. Die Daten werden in **JSON-Dateien** gespeichert und dynamisch ausgelesen oder aktualisiert.

- `movies.json` & `series.json`: Enthalten alle Filme und Serien inklusive Titel, Beschreibung, Genre und Cover-Bilder.
- `users.json`: Speichert Benutzerdaten wie Benutzername, Passwort und die persönlichen Watchlists.
- Alle JSON-Dateien dienen als einfache, **dateibasierte Datenbank**, die durch JavaScript-Funktionen verwaltet wird.

#### **View (Benutzeroberfläche)**
Die **View** ist für die Darstellung der Inhalte verantwortlich und wurde mit **Pug-Templates** entwickelt. Sie generiert die HTML-Struktur dynamisch auf Basis der übergebenen Daten.

- **Pug-Templates:** Erzeugen HTML basierend auf den Daten des Controllers.
- **CSS-Styles:** Definiert das Layout und Design der Benutzeroberfläche.
- **JavaScript (Client-seitig):** Ermöglicht interaktive Funktionen wie das Öffnen von Modalen oder das Verwalten der Watchlist.

**Haupttemplates:**
- `layout.pug`: Basislayout für alle Seiten.
- `index.pug`: Startseite mit Listenansicht der Filme und Serien.
- `profile.pug`: Nutzerprofil mit Watchlist.
- `login.pug`: Loginseite.

#### **Controller (Anwendungslogik)**
Der **Controller** verarbeitet die Anfragen des Nutzers, interagiert mit dem **Model**, und gibt die entsprechenden Daten an die **View** weiter. Dies erfolgt über die **server.js**-Datei mithilfe des Express-Frameworks.

**Wichtige Funktionen:**
- **Routing:** Verarbeitung eingehender HTTP-Anfragen und Bereitstellung der passenden Pug-Templates.
- **Datenhandling:** Lesen und Schreiben der JSON-Dateien.
- **Authentifizierung:** Einfache Nutzerverwaltung mit Sitzungsverwaltung via `express-session`.
- **Watchlist-Management:** Hinzufügen und Entfernen von Medien zur Watchlist.

`Diagrammbeispiele:`
<table>
  <tr>
    <img src="documentationDiagrams/mvc_diagram.png" alt="MVC-Diagram" width="400" height="auto">
    <p style="font-size: 10px;">Dieses Diagramm verdeutlicht die oben beschriebene MVC-Architektur</p>
  </tr>
  <tr>
    <img src="documentationDiagrams/Diagram1.png" alt="Diagram1" width="400" height="auto">
    <p style="font-size: 10px;">Dieses Diagramm zeigt den Prozess, wie ein Benutzer ein Medium zu seiner Watchlist hinzufügt. Nachdem die Webseite geladen wurde und das Mediumcover angezeigt wird, kann der Benutzer auf das Cover klicken, woraufhin die dazugehörigen Mediendaten geladen und angezeigt werden. Klickt der Benutzer anschließend auf das Bookmark-Symbol, überprüft das System, ob er eingeloggt ist. Falls nicht, wird eine Fehlermeldung mit dem Hinweis „Log in first!“ angezeigt. Falls der Benutzer eingeloggt ist, wird das Medium zur Watchlist hinzugefügt, und das Bookmark-Symbol wird ausgefüllt, um die erfolgreiche Speicherung zu visualisieren.

</p>
  <tr>
    <img src="documentationDiagrams/Diagram2.jpg" alt="Diagram2" width="400" height="auto">
    <p style="font-size: 10px;">Dieses Diagramm beschreibt den Ablauf, wenn ein Benutzer seine Watchlist einsehen möchte. Nachdem die Webseite geladen wurde und das Mediumcover angezeigt wird, kann der Benutzer im Header auf „Watchlist“ klicken. Das System überprüft daraufhin, ob der Benutzer eingeloggt ist. Falls nicht, wird die Login-Seite geladen. Falls der Benutzer eingeloggt ist, prüft das System, ob sich Medien in der Watchlist befinden. Falls ja, werden die gespeicherten Mediendaten geladen und angezeigt. Falls keine Medien in der Watchlist sind, erhält der Benutzer eine entsprechende Meldung, dass keine Inhalte vorhanden sind.</p>
  </tr>
  <tr>
    <img src="documentationDiagrams/Diagram3.png" alt="Diagram3" width="400" height="auto">
    <p style="font-size: 10px;">Das zweite Diagramm stellt den Prozess der Account-Verwaltung und Löschung dar. Nachdem die Webseite geladen wurde und das Mediumcover angezeigt wird, kann der Benutzer auf das Profil-Icon klicken. Das System überprüft dann, ob der Benutzer eingeloggt ist. Falls nicht, wird er auf die Login-Seite weitergeleitet. Falls er eingeloggt ist, wird die Profilseite angezeigt. Von dort aus hat der Benutzer zwei Optionen: Er kann sich ausloggen, wodurch er zur Login-Seite zurückkehrt, oder er kann seinen Account löschen. Falls er seinen Account löschen möchte, wird zunächst eine Sicherheitsabfrage angezeigt. Wenn er diese bestätigt, wird der Account endgültig gelöscht. Falls er sich dagegen entscheidet, bleibt die Profilseite geöffnet.</p>
  </tr>
  <tr>
    <img src="documentationDiagrams/Diagram4.png" alt="Diagram4" width="400" height="auto">
    <p style="font-size: 10px;">Dieses Diagram beschreibt den Registrierungsprozess eines Benutzers. Zunächst wird die Login-Seite gerendert, von der aus der Benutzer die Möglichkeit hat, auf „Sign Up“ zu klicken. Daraufhin wird die Registrierungsseite geladen, auf der der Benutzer seine Daten eingeben und sich registrieren kann. Sobald er auf „Register“ klickt, überprüft das System, ob der Benutzer bereits existiert. Falls dies der Fall ist, wird eine Fehlermeldung ausgegeben. Falls der Benutzer noch nicht registriert ist, wird die Profilseite geladen, und der Registrierungsprozess ist abgeschlossen.</p>
  </tr>
</table>


### 3.2 Ordnerstruktur
Die Web-Applikation folgt einer strukturierten Ordnerorganisation, die die Trennung der verschiedenen Bereiche aufzeigt. Die Ordnerstruktur sieht wie folgt aus:
```
/src
  /data                 // JSON-Daten für Filme, Serien und Benutzer
  /public               // Statische Dateien (CSS, Bilder, JavaScript)
    /icon               // Icon-Dateien
    /img                // Medienbilder & ImageViews
       /moviecovers     // Bilder für Filmcovers
       /seriescovers    // Bilder für Seriencovers
    /scripts            // JavaScript für interaktive Funktionen
    /styles             // CSS-Dokument
  /views                // Pug-Templates für die HTML-Ausgabe
  server.js             // Haupt-Server-Datei (Controller)
```

### 3.3 Server-seitige Logik (Express-Backend)

Die `server.js`-Datei enthält die komplette Serverlogik und verwendet das **Express.js** Framework für die Erstellung des Webservers.

#### Routen für Authentifizierung:

- `/login` → Login-Seite
- `/register` → Registrierungsseite
- `/profile` → Profilseite des Nutzers
- `/logout` → Beenden der Sitzung
- `/delete-account` → Löscht das Benutzerkonto

#### Routen für Medieninhalte:

- `/movies` → Lädt und zeigt Filme
- `/series` → Lädt und zeigt Serien
- `/watchlist` → Zeigt die Watchlist des Nutzers
- `/get-user-watchlist` → Gibt die Watchlist eines Nutzers als JSON zurück
- `/toggle-watchlist` → Fügt Medien zur Watchlist hinzu oder entfernt sie

#### Middleware:

Die Middleware ermöglicht eine reibungslose Kommunikation zwischen Client und Server, indem sie Anfragen vor der Verarbeitung vorbereitet und zusätzliche Funktionalitäten bereitstellt:

- **Body-Parser** für das Verarbeiten von Formulardaten
Analysiert eingehende Anfragen und stellt deren Daten als req.body zur Verfügung.
```js
app.use(bodyParser.urlencoded({ extended: true })) // Ermöglicht das Parsen von Formular-Daten
app.use(bodyParser.json()) // Ermöglicht das Parsen von JSON-Daten in POST-Anfragen

```
- **Express-Session** für die Sitzungsverwaltung
```js
app.use(
  session({
    secret: 'secret-key', // Um Sitzungsdaten zu verschlüsseln
    resave: false, // Speichert die Session nicht erneut, wenn sich nichts geändert hat
    saveUninitialized: false, // Damit keine leeren Sessions gespeichert werden
    cookie: { secure: false },
  }),
)

```

- **Static Files** für die Bereitstellung von CSS, Bildern und JavaScript-Dateien
```js
app.use(express.static(path.join(__dirname, 'public'))) //Bereitstellung aus puplic Ordner

```

### 3.4 Client-seitige Interaktion (JavaScript)

Die Benutzeroberfläche wurde mit Pug für dynamische HTML-Generierung und CSS für das Design entwickelt. Interaktive Funktionen wurden mit JavaScript umgesetzt.

- **Modal-Fenster**: Beim Klicken auf ein Medium wird ein Modal-Fenster mit detaillierten Informationen angezeigt.
- **Benutzerverwaltung**: Nutzer können sich registrieren, anmelden und ihr Profil anzeigen lassen. Als angemeldeter Nutzer ist die Funktion der Watchlist-Verwaltung nutzbar.
- **Watchlist-Verwaltung**: Nutzer können Medien per Klick zur Watchlist hinzufügen oder entfernen, unterstützt durch die Fetch API.

Das Skript `media.js` verwaltet interaktive Funktionen für die Medienanzeige:

- `showDetails(mediaData, mediaType)`: Zeigt ein Medium mit Details an.
- `fetchWatchlist(mediaId, mediaType)`: Prüft, ob das Medium in der Watchlist ist.
- `toggleWatchlist(mediaId, mediaType)`: Fügt ein Medium zur Watchlist hinzu oder entfernt es.
- `hideModal()`: Schließt das Modal.

### 3.5 Datenverwaltung (JSON-Dateien)

Die Anwendung nutzt JSON-Dateien zur Speicherung von Daten:

- `movies.json` & `series.json`: Enthalten die Filme und Serien mit Metadaten.
- `users.json`: Speichert Benutzerinformationen inkl. Watchlist.

### 3.6 Umetzung des Designs

#### :Root
Für die Umsetzung unseres Design haben wir unsere Hauptfarben (blau, schwarz, grau) in `:root` zentral verwaltet
```css
:root {
  --backgroundColor1: #000000;
  --backgroundColor2: #333333;
  --backgroundColor3: #a1a1a1;
  --backgroundColor4: #1e90ff;
  --backgroundColor5: #ffffff;
  --backgroundColor6: #f9f9f9;
  --fontColor1: blue;
  --fontColor2: black;
  --fontColor3: white;
  --fontColor4: #1e90ff;
  --fontColor5: #333333;
  --buttonBackgroundColor1: #1e90ff;
  --buttonBackgroundColor2: #c0392b;
  --buttonHoverColor1: #1c7ed6;
}
```
um dann gezielt durch Variableaufrufe (z.B: `background-color: var(--backgroundColor1);`) diese zu anzuwenden um ein einheitliches Design zu gewährleisten. Außerdem kann man dadruch bei Anpassung des Designs nur die Variable ändern ohne jede Stelle im Projekt zu bearbeiten.

#### Clamp()
Clamp haben wir benutzt um Responsives Design zu gewährleisten, da daruch die Schriftgröße an verschiedene Bildschirmgrößen angepasst wird.
```css
li,a,
.profileIcon {
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: clamp(1rem, 1.2vw, 1.5rem); /*(MIN, IDEAL, MAX) -- Schrift ist in dem Bereich flexibel*/
  color: var(--fontColor3);
  text-decoration: none;
}
```

#### Media
Wir haben verschiedene Media Queries genutzt, um das Layout für kleinere Bildschirme anzupassen.
z.B. verstecken wir die Navigationsleiste auf kleinen Bildschirmen und zeigen stattdessen das Menü-Icon.
Dadurch bleiben wir nutzerfreundlich für mobile Geräte.
```css
@media screen and (max-width: 840px) { /*Regeln gelten nur für Pixelgröße < 840px*/
  .navLeft {
    display: none;
  }

  .toggleMenu {
    display: block;
  }
}
```
---

## 4. Quelltext - Beispiele
### 4.1 Startseite (Index.pug)
Index.pug ist die Startseite und lädt die wichtigsten Komponenten für Filme und Serien. PUG ist eine Template-Engine um HTML-Seiten effizient und übersichtlicher zu machen. Index.pug erweitert das Layout aus `layout.pug` um das Grundgerüst der Seite beizubehalten.
Innerhalb des `content`-Blocks werden die Filme und Serien in Sektionen für monatliches Film- und Serienranking aufgeteilt, wobei die Inhalte aus `movie.pug` und `series.pug` eingebunden.
Zusätzlich wird ein Modal-Fenster aus `modal.pug`integriert welches Details anzeigt.
````pug
extends layout.pug

block content
  .bodyContainer.marginLeftLarge
    h2.blueFontColor.marginTopLarge Movie Ranking of the Month
    - var showRanking = true
    include movie.pug
    h2.blueFontColor.marginTopLarge Series Ranking of the Month
    - var showRanking = true
    include serie.pug

  include modal.pug
````

### 4.2 Datenmodellierung

Medien-, Serien- und Benutzerdaten werden in jeweils unterschiedlichen JSON-Dateien gespeichert. Jede Datei enthält ein Array von Objekten (`[]`) wobei jedes Objekt (`{}`) die passenden Informationen speichert. Bei dem Hinzufügen von Daten werden neue Objekte angelegt und beim Löschen wird das jeweilige Objekt entfernt.

Struktur der `users.json`-Datei:
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
Struktur der `movies.json` -Datei:
```json
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

Die Struktur der `series.json`-Datei entspricht der `movei.json`-Datei.

### 4.3 Serverseitige Programmierung (toggleWatchlist)
Der Code definiert eine Express-Route (`POST /toggle-watchlist`), die es eingeloggten Nutzern ermöglicht, Filme oder Serien zur persönlichen Watchlist hinzuzufügen oder zu entfernen. Als erstes wird geprüft, ob der Benutzer eingeloggt ist (`req.session.user`), andernfalls wird eine Fehlermeldung zurückgegeben. Anschließend wird die `users.json`-Datei ausgelesen, um den aktuellen Benutzer zu identifizieren. Es wird das passende Watchlist-Array des Nutzers gewählt, und die eindeutige ID des Films oder der Serie wird entweder hinzugefügt oder entfernt. Danach wird die aktualisierte Benutzerliste zurück in die JSON-Datei geschrieben. Die Route gibt eine Antwort mit dem aktuellen Stand der Watchlist zurück, um die Änderungen in der Benutzeroberfläche anzuzeigen.

```js
app.post('/toggle-watchlist', (req, res) => {
  if (!req.session.user) {
    return res.json({ success: false, message: 'Not logged in' })
  }

  const { mediaType, mediaId } = req.body
  const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'))
  const currentUserIndex = users.findIndex(
    (u) => u.username === req.session.user.username,
  )

  if (currentUserIndex === -1) {
    return res.json({ success: false, message: 'User not found.' })
  }

  const currentUser = users[currentUserIndex]
  const watchlistKey =
    mediaType === 'movie' ? 'movie-watchlist' : 'series-watchlist'

  if (!currentUser[watchlistKey]) {
    currentUser[watchlistKey] = []
  }

  const index = currentUser[watchlistKey].indexOf(mediaId)

  if (index === -1) {
    currentUser[watchlistKey].push(mediaId)
  } else {
    currentUser[watchlistKey].splice(index, 1)
  }

  users[currentUserIndex] = currentUser
  fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2))

  res.json({ success: true, [watchlistKey]: currentUser[watchlistKey] })
})
```

### 4.4 Clientseitige Programmierung
Die Funktion `toggleWatchlist(mediaId, mediaType)` ermöglicht es einem Nutzer, einen Film oder eine Serie zur persönlichen Watchlist hinzuzufügen oder zu entfernen. Dazu sendet sie eine POST-Anfrage an die serverseitige Route /toggle-watchlist.
Zunächst wird die Anfrage mit fetch() gesendet. Die Antwort des Servers wird als JSON interpretiert. Falls die Aktion nicht erfolgreich war (z.B. weil der Nutzer nicht eingeloggt ist), wird eine Fehlermeldung ausgegeben und eine Alert-Box angezeigt.
Ist die Aktion erfolgreich, prüft die Funktion, ob der Film oder die Serie in der aktualisierten Watchlist des Nutzers enthalten ist. Entsprechend wird dann das Lesezeichen-Symbol angepasst:
Wenn der Film oder die Serie hinzugefügt wurde, wird das aktivierte Symbol (/img/selected_bookmark.png) gesetzt.
Wenn das Medium entfernt wurde, wird das normale Symbol (/img/bookmark.png) angezeigt.
Falls sich der Nutzer auf der Watchlist-Seite befindet (window.location.pathname === '/watchlist'), wird die Seite neu geladen, um die Änderungen anzuzeigen.
```js
  toggleWatchlist(mediaId, mediaType) {
    fetch('/toggle-watchlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mediaId, mediaType }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          console.log(data.message)
          alert("Log in first!");
          return
        }

        const watchlistKey =
          mediaType === 'movie' ? 'movie-watchlist' : 'series-watchlist'
        const isInWatchlist = data[watchlistKey].includes(mediaId)

        this.bookmarkImg.src = isInWatchlist
          ? '/img/selected_bookmark.png'
          : '/img/bookmark.png'

        if (window.location.pathname === '/watchlist') {
          window.location.reload()
        }
      })
      .catch(() => console.error('Error modifying the watchlist.'))
  }
```
---

## 5. Problembehandlung und Testphase
### 5.1 Problembehandlung
Während der Entwicklung der Web-Applikation kam es durch aus vor, dass wir auf Probleme trafen welche wir nicht ohne weiteres lösen konnten. Folgende Probleme sind unter anderem aufgetreten:

* **Navigationsbar**:Da wir ein Responsive Design gewähren wollen, standen wir vor der Frage wie wir unsere Navigationbar auch auf kleinen Geräten anzeigen lassen können.
  + `Lösung:` Ab einer bestimmten Größe die "traditionelle" Navigationbar nicht mehr anzeigen. Dafür wird ein "3-Strich" -Menu angezeigt, welches per OnClick ein Dropdown-Menu anzeigt. Dieses hat die gleiche Navigationsoptionen wie die "traditionelle" Navigationsbar.
* **Watchlist**: Die Datenspeicherung in der Watchlist funktionierte zunächst nicht wie vorgesehen. Wir haben versucht über den session user die film/serien watchlist zu holen, worin aber garnicht die ganzen Benutzer Daten gespeichert waren. Außedem wurden Filme und Serien nicht getrennt gespeichert, was dazu führte, dass sie nicht korrekt dargestellt wurden.
  + `Lösung:` Es wurde eine eindeutige ID für jeden Film und jede Serie hinzugefügt. Diese IDs werden getrennt nach Filmen und Serien als Werte in jeweils eigenen Eigenschaften eines Users gespeichert. Dadurch wird sichergestellt, dass Filme und Serien korrekt voneinander unterschieden und dargestellt werden. Beim Aufruf der Watchlist werden die gespeicherten Film- und Serien-IDs des Nutzers geladen und entsprechend angezeigt. Dieser Nutzer wird dadurch ermittel dass wir in der gesamten user.json nach dem session user suchen und so die gesamten Nutzerdaten holen können.

### 5.2 Testphase und Fehlerbehebung
Nach der Implementierung der grundlegenden Funktionen wurde die Applikation einer Testphase unterzogen. Hierbei wurden Fehler identifiziert und behoben. Außerdem wurden verschiedene Optimierungen auf Basis von Feedback umgesetzt:

- **UI-Verbesserungen**: Verbesserung des Layouts und der Benutzerführung
- **Responsive Design**: Kleinere Anpassungen um ein rundum unterstütztes Responsive Design zu gewähren
- **Fehlerbehebungen**: Behebung kleinerer Bugs in der Funktionalität
- **Optimierung der Performance**: Vereinfachung der Benutzerinteraktionen und Verbesserung der Ladezeiten
- **Clean Code**: Verschönerung des Codes durch Prettier

### 5.3 Finalisierung
Nach erfolgreichem Testen und dem Implementieren von Verbesserungen wurde die Applikation finalisiert. Es wurden keine Veränderungen mehr am Coding vorgenommen.

---
## 6. Quellen und Hilfsmittel-Verzeichnis

### 6.1 Verwendete Hilfsmittel
Für die Entwicklung wurden folgende Tools und Technologien verwendet:

- **Node.js**: Laufzeitumgebung für den Server
- **Express.js**: Web-Framework zur Erstellung des Servers und der Routen
- **PUG**: Template Engine zur dynamischen HTML-Erstellung
- **CSS**: Stylesheet-Sprache für das Design
- **JavaScript**: Clientseitige Interaktivität
- **JSON**: Datenmodellierung und Speicherung
- **Prettier**: Code-Formatierung und -Standardisierung
- **VS-Code**: Code-Editor
- **Github**: Versionskontrolle und Code-Hosting

### 6.2 Quellen
* **W3Schools - CSS**
  https://www.w3schools.com/css/ (17.02.2025)
* **Flexbox Froggy - CSS**
  https://flexboxfroggy.com/#de (07.02.2025)
* **MDN Web Docs - CSS**
  https://developer.mozilla.org/en-US/docs/Web/CSS (17.02.2025)
* **Erklärung und Anwendung von PUG**
  https://how.dev/answers/what-is-pug-syntax (13.02.2025)
* **Templates - PUG**
  https://devhints.io/pug (17.02.2025)
* **MDN Web Docs - JavaScript**
  https://developer.mozilla.org/en-US/docs/Web/JavaScript (21.02.2025)
* **W3Schools - JavaScript**
  https://www.w3schools.com/js/ (21.02.2025)
* **MDN Web Docs - Node.js & Express.js**
  https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs (16.02.2025)
* **Express JS Crash Kurs**
  https://www.youtube.com/watch?v=L72fhGm1tfE&ab_channel=TraversyMedia (16.02.2025)