function showSerieDetails(event) {
  const serieElement = event.target.closest('li');

  if (!serieElement) {
    console.error('Fehler: Serie-Element konnte nicht gefunden werden.');
    return;
  }

  const serieData = JSON.parse(serieElement.getAttribute('data-serie'));

  if (!serieData) {
    console.error('Fehler: Serie-Daten konnten nicht geladen werden.');
    return;
  }

  const serieId = serieData.id;

  const serieTitle = serieData.title;
  const serieDescription = serieData.description;
  const serieGenre = serieData.genre;
  const serieImage = serieData.image;

  const modal = document.getElementById('mediaPopup');
  const closeButton = document.querySelector('.closeBtn');

  document.getElementById('mediaTitle').textContent = serieTitle;
  document.getElementById('mediaImage').src = serieImage;
  document.getElementById('mediaDescription').textContent = 'Description: ' + serieDescription;
  document.getElementById('mediaGenre').textContent = 'Genre: ' + serieGenre;
  document.getElementById('mediaRanking').textContent = 'Ranking: ' + serieData.ranking;
  document.getElementById('mediaDirector').textContent = 'Director: ' + serieData.director;
  document.getElementById('mediaReleased').textContent = 'Released: ' + serieData.released;


  const bookmarkButton = modal.querySelector('.bookmarkButton');
  const bookmarkImg = bookmarkButton.querySelector('img');
  bookmarkButton.setAttribute('data-serie', JSON.stringify(serieData));

  document.body.style.overflow = 'hidden';

  fetch('/get-user-watchlist', { method: 'GET' })
    .then((response) => response.json())
    .then((data) => {
      const user = data.user;
      if (user && user['series-watchlist']) {
        const isInWatchlist = user['series-watchlist'].includes(serieId);
        bookmarkImg.src = isInWatchlist
          ? '/img/selected_bookmark.png'
          : '/img/bookmark.png';
      } else {
        bookmarkImg.src = '/img/bookmark.png';
      }
    })
    .catch((error) => console.error('Fehler beim Abrufen der Watchlist:', error));

  bookmarkButton.onclick = function () {
    fetch('/toggle-series-watchlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serieId: serieId }),
    })
      .then((response) => response.json())
      .then((data) => {
        const isInWatchlist = data['series-watchlist'].includes(serieId);
        bookmarkImg.src = isInWatchlist
          ? '/img/selected_bookmark.png'
          : '/img/bookmark.png';

        if (window.location.pathname === '/watchlist') {
          window.location.reload();
        }
      })
      .catch(() => alert('Log in to add Series to the watchlist'));
  };

  modal.style.display = 'block';

  closeButton.onclick = function () {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  };
}