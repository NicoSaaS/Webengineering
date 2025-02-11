function showMovieDetails(event) {
    const movieElement = event.target.closest('li');
    const movieData = JSON.parse(movieElement.getAttribute("data-movie"));
    const movieId = movieData.id;

    const movieTitle = movieData.title;
    const movieDescription = movieData.description;
    const movieGenre = movieData.genre;
    const movieImage = movieData.image;

    const modal = document.getElementById("mediaPopup");
    const closeButton = document.querySelector(".close-btn");

    document.getElementById("media-title").textContent = movieTitle;
    document.getElementById("media-image").src = movieImage;
    document.getElementById("media-description").textContent = movieDescription;
    document.getElementById("media-genre").textContent = "Genre: " + movieGenre;
    document.getElementById("media-ranking").textContent = "Ranking: " + movieData.ranking;
    document.getElementById("media-director").textContent = "Director: " + movieData.director;
    document.getElementById("media-released").textContent = "Released: " + movieData.released;

    const bookmarkButton = modal.querySelector('.bookmarkButton');
    const bookmarkImg = bookmarkButton.querySelector('img');
    bookmarkButton.setAttribute('data-movie', JSON.stringify(movieData));

    fetch('/get-user-watchlist', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            const user = data.user;
            if (user && user.watchlist) {
                const isInWatchlist = user.watchlist.includes(movieId);
                bookmarkImg.src = isInWatchlist ? "/img/selected_bookmark.png" : "/img/bookmark.png";
            } else {
                bookmarkImg.src = "/img/bookmark.png";
            }
        })
        .catch(error => console.error("Fehler beim Abrufen der Watchlist:", error));

    bookmarkButton.onclick = function () {
        fetch('/toggle-watchlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ movieId: movieId })
        })
        .then(response => response.json())
        .then(data => {
            const isInWatchlist = data.watchlist.includes(movieId);
            bookmarkImg.src = isInWatchlist ? "/img/selected_bookmark.png" : "/img/bookmark.png";

            if (window.location.pathname === '/watchlist') {
                window.location.reload();
            }
        })
        
        .catch(error => console.error("Fehler beim Aktualisieren der Watchlist:", error));
    };

    modal.style.display = "block";

    closeButton.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}
