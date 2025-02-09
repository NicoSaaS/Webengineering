function addWatchlist(event) {
  const bookmarkButton = event.currentTarget;
  const movie = JSON.parse(bookmarkButton.getAttribute("data-movie"));

  // Den Watchlist-Status umschalten
  movie.watchlist = movie.watchlist === 1 ? 0 : 1;

  // Anfrage an den Server, um die Watchlist des Benutzers zu aktualisieren
  fetch('/watchlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movie: { id: movie.id } }) // Nur die ID des Films senden
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          const bookmarkImg = bookmarkButton.querySelector("img");

          // Bild des Bookmarks basierend auf dem Watchlist-Status aktualisieren
          bookmarkImg.src = movie.watchlist === 1 ? "/img/selected_bookmark.png" : "/img/bookmark.png";

          // Das data-movie-Attribut im Button auf den neuen Filmstatus setzen
          bookmarkButton.setAttribute('data-movie', JSON.stringify(movie));
      } else {
          console.error("Fehler beim Hinzufügen zur Watchlist:", data.error);
      }
  })
  .catch(error => console.error("Fehler beim Speichern der Watchlist:", error));
}
