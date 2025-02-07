function showMovieDetails(event) {
    const movieElement = event.target;
    const movieData = JSON.parse(movieElement.getAttribute("data-movie"));

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
