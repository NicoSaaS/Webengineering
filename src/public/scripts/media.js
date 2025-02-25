document.addEventListener('DOMContentLoaded', () => {
  function showMovieDetails(event) {
    const movieElement = event.target.closest('li')
    const movieDataAttr = movieElement.getAttribute('data-movie')
    const movieData = JSON.parse(movieDataAttr)
    mediaDetails.showDetails(movieData, 'movie')
  }

  function showSerieDetails(event) {
    const serieElement = event.target.closest('li')
    const serieDataAttr = serieElement.getAttribute('data-serie')
    const serieData = JSON.parse(serieDataAttr)
    mediaDetails.showDetails(serieData, 'serie')
  }

  const mediaDetails = new MediaDetails(
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

  const movieElements = document.querySelectorAll('.movieItem .mediaCover')
  movieElements.forEach((element) => {
    element.addEventListener('click', showMovieDetails)
  })

  const serieElements = document.querySelectorAll('.seriesItem .mediaCover')
  serieElements.forEach((element) => {
    element.addEventListener('click', showSerieDetails)
  })
})

class MediaDetails {
  /**
   * @param {string} modalId - ID des Modals.
   * @param {string} closeButtonClass - Klasse des Schließen-Buttons.
   * @param {string} titleId - ID des Titels.
   * @param {string} imageId - ID des Bildes.
   * @param {string} descriptionId - ID der Beschreibung.
   * @param {string} genreId - ID des Genres.
   * @param {string} rankingId - ID der Bewertung.
   * @param {string} directorId - ID des Regisseurs.
   * @param {string} releasedId - ID des Veröffentlichungsdatums.
   * @param {string} bookmarkButtonClass - Klasse des Bookmark-Buttons.
   */
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

  /**
   * Zeigt Modal mit Mediumdaten an
   * @param {Object} mediaData - Daten des Mediums.
   * @param {string} mediaData.title - Titel des Mediums.
   * @param {string} mediaData.image - Bild-URL des Mediums.
   * @param {string} mediaData.description - Beschreibung des Mediums.
   * @param {string} mediaData.genre - Genre des Mediums.
   * @param {number} mediaData.ranking - Ranking des Mediums.
   * @param {string} mediaData.director - Regisseur des Mediums.
   * @param {string} mediaData.released - Veröffentlichungsdatum des Mediums.
   * @param {string} mediaType - Typ des Mediums (movie oder serie).
   */

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

  /**
   * Aktualisiert die, falls vorhanden, bisherig gesetzen Bookmarks
   * @param {number} mediaId - ID des Mediums.
   * @param {string} mediaType - Typ des Mediums (movie oder serie).
   */

  fetchWatchlist(mediaId, mediaType) {
    const watchlistKey =
      mediaType === 'movie' ? 'movie-watchlist' : 'series-watchlist'
    fetch('/get-user-watchlist', { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        if (!data.user) {
          console.log(
            'User not logged in. Watchlist will not be loaded.',
          )
          return
        }

        const user = data.user
        const isInWatchlist = user[watchlistKey]?.includes(mediaId)

        this.bookmarkImg.src = isInWatchlist
          ? '/img/selected_bookmark.png'
          : '/img/bookmark.png'
      })
      .catch((error) =>
        console.error('Error retrieving the watchlist:', error),
      )
  }

  /**
   * Aktualisiert die Watchlist und das Bookmark
   * @param {number} mediaId - ID des Mediums.
   * @param {string} mediaType - Typ des Mediums (movie oder serie).
   */

  toggleWatchlist(mediaId, mediaType) {
    fetch('/toggle-watchlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mediaId, mediaType }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          console.log(data.message)
          alert("Log in first!");
          return
        }

        const watchlistKey =
          mediaType === 'movie' ? 'movie-watchlist' : 'series-watchlist'
        const isInWatchlist = data[watchlistKey].includes(mediaId)

        this.bookmarkImg.src = isInWatchlist
          ? '/img/selected_bookmark.png'
          : '/img/bookmark.png'

        if (window.location.pathname === '/watchlist') {
          window.location.reload()
        }
      })
      .catch(() => console.error('Error modifying the watchlist.'))
  }

  // Ausbldenden des Modals
  hideModal() {
    this.modal.style.display = 'none'
    document.body.style.overflow = 'auto'
  }
}
