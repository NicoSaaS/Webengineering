function addWatchlist(event) {
  const bookmarkButton = event.currentTarget;
  const movie = JSON.parse(bookmarkButton.getAttribute("data-movie"));

  movie.watchlist = movie.watchlist === 1 ? 0 : 1;
  fetch('/watchlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movie: { id: movie.id } })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          const bookmarkImg = bookmarkButton.querySelector("img");
          bookmarkImg.src = movie.watchlist === 1 ? "/img/selected_bookmark.png" : "/img/bookmark.png";
          bookmarkButton.setAttribute('data-movie', JSON.stringify(movie));
      } else {
          console.error("Fehler beim Hinzufügen zur Watchlist:", data.error);
      }
  })
  .catch(error => console.error("Fehler beim Speichern der Watchlist:", error));
}
