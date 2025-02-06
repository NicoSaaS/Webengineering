function showSerieDetails(event) {
    const serieElement = event.target;
    const serieData = JSON.parse(serieElement.getAttribute("data-serie"));

    const serieTitle = serieData.title;
    const serieDescription = serieData.description;
    const serieGenre = serieData.genre;
    const serieImage = serieData.image;

    const modal = document.getElementById("movieModal");
    const closeButton = document.querySelector(".close-btn");

    document.getElementById("media-title").textContent = serieTitle;
    document.getElementById("media-image").src = serieImage;
    document.getElementById("media-description").textContent = "Description: " + serieDescription;
    document.getElementById("media-genre").textContent = "Genre: " + serieGenre;
    document.getElementById("media-ranking").textContent = "Ranking: " + serieData.ranking;

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
