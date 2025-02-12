document.addEventListener('DOMContentLoaded', () => {
  function showMovieDetails(event) {
    const movieElement = event.target.closest('li')
    if (!movieElement) return
    const movieDataAttr = movieElement.getAttribute('data-movie')
    if (!movieDataAttr) return
    const movieData = JSON.parse(movieDataAttr)
    movieDetails.showDetails(movieData, 'movie')
  }

  function showSerieDetails(event) {
    const serieElement = event.target.closest('li')
    if (!serieElement) return
    const serieDataAttr = serieElement.getAttribute('data-serie')
    if (!serieDataAttr) return
    const serieData = JSON.parse(serieDataAttr)
    serieDetails.showDetails(serieData, 'serie')
  }

  const movieDetails = new MediaDetails(
    'mediaPopup',
    '.closeButton',
    'mediaTitle',
    'mediaImage',
    'mediaDescription',
    'mediaGenre',
    'mediaRanking',
    'mediaDirector',
    'mediaReleased',
    '.bookmarkButton',
  )

  const serieDetails = new MediaDetails(
    'mediaPopup',
    '.closeButton',
    'mediaTitle',
    'mediaImage',
    'mediaDescription',
    'mediaGenre',
    'mediaRanking',
    'mediaDirector',
    'mediaReleased',
    '.bookmarkButton',
  )

  const movieElements = document.querySelectorAll('.mediaList li')
  movieElements.forEach((element) => {
    element.addEventListener('click', showMovieDetails)
  })

  const serieElements = document.querySelectorAll('.mediaList li')
  serieElements.forEach((element) => {
    element.addEventListener('click', showSerieDetails)
  })
})

class MediaDetails {
  constructor(
    modalId,
    closeButtonClass,
    titleId,
    imageId,
    descriptionId,
    genreId,
    rankingId,
    directorId,
    releasedId,
    bookmarkButtonClass,
  ) {
    this.modal = document.getElementById(modalId)
    this.closeButton = document.querySelector(closeButtonClass)
    this.titleElement = document.getElementById(titleId)
    this.imageElement = document.getElementById(imageId)
    this.descriptionElement = document.getElementById(descriptionId)
    this.genreElement = document.getElementById(genreId)
    this.rankingElement = document.getElementById(rankingId)
    this.directorElement = document.getElementById(directorId)
    this.releasedElement = document.getElementById(releasedId)
    this.bookmarkButton = document.querySelector(bookmarkButtonClass)
    this.bookmarkImg = this.bookmarkButton.querySelector('img')
  }

  showDetails(mediaData, mediaType) {
    this.titleElement.textContent = mediaData.title
    this.imageElement.src = mediaData.image
    this.descriptionElement.textContent =
      'Description: ' + mediaData.description
    this.genreElement.textContent = 'Genre: ' + mediaData.genre
    this.rankingElement.textContent = 'Ranking: ' + mediaData.ranking
    this.directorElement.textContent = 'Director: ' + mediaData.director
    this.releasedElement.textContent = 'Released: ' + mediaData.released

    this.bookmarkButton.setAttribute(
      `data-${mediaType}`,
      JSON.stringify(mediaData),
    )

    document.body.style.overflow = 'hidden'
    this.modal.style.display = 'block'

    this.fetchWatchlist(mediaData.id, mediaType)

    this.bookmarkButton.onclick = () =>
      this.toggleWatchlist(mediaData.id, mediaType)

    this.closeButton.onclick = () => this.hideModal()
    window.onclick = (event) => {
      if (event.target === this.modal) {
        this.hideModal()
      }
    }
  }

  fetchWatchlist(mediaId, mediaType) {
    const watchlistKey =
      mediaType === 'movie' ? 'movie-watchlist' : 'series-watchlist'
    fetch('/get-user-watchlist', { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        const user = data.user
        if (user && user[watchlistKey]) {
          const isInWatchlist = user[watchlistKey].includes(mediaId)
          this.bookmarkImg.src = isInWatchlist
            ? '/img/selected_bookmark.png'
            : '/img/bookmark.png'
        } else {
          this.bookmarkImg.src = '/img/bookmark.png'
        }
      })
      .catch((error) =>
        console.error('Fehler beim Abrufen der Watchlist:', error),
      )
  }

  toggleWatchlist(mediaId, mediaType) {
    const endpoint =
      mediaType === 'movie'
        ? '/toggle-movies-watchlist'
        : '/toggle-series-watchlist'
    const body =
      mediaType === 'movie' ? { movieId: mediaId } : { serieId: mediaId }
    const watchlistKey =
      mediaType === 'movie' ? 'movie-watchlist' : 'series-watchlist'

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        const isInWatchlist = data[watchlistKey].includes(mediaId)
        this.bookmarkImg.src = isInWatchlist
          ? '/img/selected_bookmark.png'
          : '/img/bookmark.png'

        if (window.location.pathname === '/watchlist') {
          window.location.reload()
        }
      })
      .catch(() => alert('Log in to add Movies/Series to the watchlist'))
  }

  hideModal() {
    this.modal.style.display = 'none'
    document.body.style.overflow = 'auto'
  }
}
