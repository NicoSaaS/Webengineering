function addWatchlist(event) {
    debugger;
    const bookmarkButton = event.currentTarget;
    const movie = JSON.parse(bookmarkButton.getAttribute("data-movie"));
    movie.watchlist = movie.watchlist === 1 ? 0 : 1;
  
    const bookmarkImg = bookmarkButton.querySelector("img");
    bookmarkImg.src = movie.watchlist === 1 ? "/img/selected_bookmark.png" : "/img/bookmark.png";
    bookmarkButton.setAttribute('data-movie', JSON.stringify(movie));

    const movieId = movie.id;
    const movieElement = document.querySelector(`li[data-movie*='"id":${movieId}']`);
    movieElement.setAttribute('data-movie', JSON.stringify(movie));

  }
  