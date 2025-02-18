# Dokumentation: Entwurf und Umsetzung der Web-Applikation "CineCanvas"

Diese Dokumentation beschreibt detailiert den Entwurf und die technische Umsetzung der Web-Applikation "CineCanvas", die es Nutzern eröglicht Filme und Serien zu suchen, entdecken und ihre persöhnliche Watchlist zu verwalten. Der Fokus liegt auf einer benutzerfreundlichen und intuitiven Benutzeroberfläche, die auf verschiedenen Geräten nutzbar ist.

## Inhaltsverzeichnis
1. Einleitung
2. Entwurf der Applikation
2.1 Ideensammlung und Zielsetzung
2.2 Konzept und Featureauswahl
2.3 Architektur der Applikation
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
---

## 1. Einleitung

„CineCanvas“ wurde entwickelt, um eine zentrale Plattform für Nutzer zu bieten, die Filme und Serien entdecken und ihre persönlichen Watchlists verwalten möchten. Die Hauptfunktionen umfassen:

- **Filme und Serien durchsuchen**: Eine umfangreiche und gut strukturierte Medienbibliothek, die nach verschiedenen Kriterien (z.B. Ranking, Genre) gefiltert werden kann.
- **Personalisierte Watchlists**: Nutzer können Medien zu ihrer Watchlist hinzufügen und diese jederzeit anpassen.
- **Detailansicht für Medien**: Jede Serie oder jeder Film enthält detaillierte Informationen (z.B. Regisseur, Genre, Veröffentlichungsdatum).
- **Benutzerkonten**: Nutzer können ein Konto erstellen, sich einloggen und ihre Watchlist sowie persönlichen Daten verwalten.

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
```
"Logo"
```

