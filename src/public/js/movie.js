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

    document.body.style.overflow = "hidden";

    fetch('/get-user-watchlist', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            const user = data.user;
            if (user && user["movie-watchlist"]) {
                const isInWatchlist = user["movie-watchlist"].some(movie => movie === movieId);
                bookmarkImg.src = isInWatchlist ? "/img/selected_bookmark.png" : "/img/bookmark.png";
            } else {
                bookmarkImg.src = "/img/bookmark.png";
            }
        })
        .catch(error => console.error("Fehler beim Abrufen der Watchlist:", error));

    bookmarkButton.onclick = function () {
        fetch('/toggle-movies-watchlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ movieId: movieId })
        })
        .then(response => response.json())
        .then(data => {
            const isInWatchlist = data["movie-watchlist"].includes(movieId);
            bookmarkImg.src = isInWatchlist ? "/img/selected_bookmark.png" : "/img/bookmark.png";

            if (window.location.pathname === '/watchlist') {
                window.location.reload();
            }
        })
        .catch(() => alert("Log in to add Movies to the watchlist"));
    };

    modal.style.display = "block";

    closeButton.onclick = function () {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    };
}
