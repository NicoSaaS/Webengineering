function showMovieDetails(event) {
    const movieElement = event.target;
    const movieData = JSON.parse(movieElement.getAttribute("data-movie"));

    const movieTitle = movieData.title;
    const movieDescription = movieData.description;
    const movieGenre = movieData.genre;
    const movieImage = movieData.image;

    const modal = document.getElementById("movieModal");
    const closeButton = document.querySelector(".close-btn");

    document.getElementById("movie-title").textContent = movieTitle;
    document.getElementById("movie-image").src = movieImage;
    document.getElementById("movie-description").textContent = "Description: " + movieDescription;
    document.getElementById("movie-genre").textContent = "Genre: " + movieGenre;

    modal.style.display = "block";

    closeButton.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}
