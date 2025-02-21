/**
 * Importieren der benötigten Module
 */
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const fs = require('fs')

const app = express()

/**
 * Middleware für das Parsen von Anfragen
 */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

/**
 * Sitzungskonfiguration
 */
app.use(
  session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
)

/**
 * Zeigt die Login-Seite an
 * @route GET /login
 */
app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' })
})

/**
 * Zeigt die Registrierungsseite an
 * @route GET /register
 */
app.get('/register', (req, res) => {
  res.render('register', { title: 'Register' })
})

/**
 * Lädt und zeigt die Filme aus der JSON-Datei an
 * @route GET /movies
 */
app.get('/movies', (req, res) => {
  const moviesFilePath = path.join(__dirname, 'data', 'movies.json')

  fs.readFile(moviesFilePath, 'utf8', (err, movieData) => {
    if (err) {
      return res.status(500).send('Error loading movies.')
    }

    let movies = JSON.parse(movieData)
    const groupedMovies = []
    var letters = new Set()
    movies.forEach((movie) => {
      const firstLetter = movie.title.charAt(0).toUpperCase()
      letters.add(firstLetter)
    })
    letters = [...letters].sort()
    letters.forEach((letter) => {
      const moviesInGroup = movies.filter(
        (movie) => movie.title.charAt(0).toUpperCase() === letter,
      )
      groupedMovies.push({ letter, movies: moviesInGroup })
    })

    res.render('movies', {
      title: 'Movies',
      groupedMovies,
      active_tab: 'movies',
    })
  })
})

/**
 * Lädt und zeigt die Serien aus der JSON-Datei an
 * @route GET /series
 */
app.get('/series', (req, res) => {
  const serieFilePath = path.join(__dirname, 'data', 'series.json')

  fs.readFile(serieFilePath, 'utf8', (err, serieData) => {
    if (err) {
      return res.status(500).send('Error loading series.')
    }

    let series = JSON.parse(serieData)
    const groupedSeries = []
    var letters = new Set()
    series.forEach((serie) => {
      const firstLetter = serie.title.charAt(0).toUpperCase()
      letters.add(firstLetter)
    })
    letters = [...letters].sort()
    letters.forEach((letter) => {
      const seriesInGroup = series.filter(
        (serie) => serie.title.charAt(0).toUpperCase() === letter,
      )
      groupedSeries.push({ letter, series: seriesInGroup })
    })

    res.render('series', {
      title: 'Series',
      groupedSerie: groupedSeries,
      active_tab: 'series',
    })
  })
})

/**
 * Zeigt das Profil des eingeloggten Benutzers an
 * @route GET /profile
 */
app.get('/profile', (req, res) => {
  if (req.session.user) {
    const { firstName, lastName, username, email, gender } = req.session.user
    res.render('profile', { firstName, lastName, username, email, gender })
  } else {
    res.redirect('/login')
  }
})

/**
 * Authentifiziert den Benutzer beim Login
 * @route POST /login
 */
app.post('/login', (req, res) => {
  const { username, password } = req.body
  const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'))
  const user = users.find(
    (u) => u.username === username && u.password === password,
  )

  if (user) {
    req.session.user = user
    res.redirect('/profile')
  } else {
    res.render('login', { error: 'Incorrect password or username!' })
  }
})

/**
 * Registriert einen neuen Benutzer
 * @route POST /register
 */
app.post('/register', (req, res) => {
  const { firstName, lastName, gender, email, username, password } = req.body
  const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'))
  const userExists = users.some(
    (user) => user.username === username || user.email === email,
  )

  if (userExists) {
    return res.render('register', {
      title: 'Register',
      errorMessage: 'Username or email already taken. Please try again.',
    })
  } else {
    const newUser = {
      firstName,
      lastName,
      gender,
      email,
      username,
      password,
      'movie-watchlist': [],
      'series-watchlist': [],
    }
    users.push(newUser)
    fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2))
    req.session.user = newUser
    res.render('profile', { firstName, lastName, username, email, gender })
  }
})

/**
 * Meldet den Benutzer ab
 * @route GET /logout
 */
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send('Error logging out.')
    }
    res.redirect('/')
  })
})

/**
 * Löscht das Benutzerkonto
 * @route POST /delete-account
 */
app.post('/delete-account', (req, res) => {
  if (req.session.user) {
    const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'))
    const updatedUsers = users.filter(
      (user) => user.username !== req.session.user.username,
    )

    fs.writeFileSync('./data/users.json', JSON.stringify(updatedUsers, null, 2))

    req.session.destroy((err) => {
      if (err) {
        return res.send('Error deleting the account.')
      }
      res.redirect('/')
    })
  } else {
    res.redirect('/login')
  }
})

/**
 * Zeigt die Startseite mit Filmen und Serien an
 * @route GET /
 */
app.get('/', (req, res) => {
  const moviesFilePath = path.join(__dirname, 'data', 'movies.json')
  const seriesFilePath = path.join(__dirname, 'data', 'series.json')
  fs.readFile(moviesFilePath, 'utf8', (err, movieData) => {
    if (err) {
      return res.status(500).send('Error loading movies.')
    }

    fs.readFile(seriesFilePath, 'utf8', (err, seriesData) => {
      if (err) {
        return res.status(500).send('Error loading series.')
      }

      let movies = JSON.parse(movieData)
      let series = JSON.parse(seriesData)
      movies.sort((a, b) => a.ranking - b.ranking)
      series.sort((a, b) => a.ranking - b.ranking)

      res.render('index', {
        movies: movies,
        series: series,
        active_tab: 'home',
      })
    })
  })
})

/**
 * Zeigt die Watchlist des aktuellen Benutzers an
 * @route GET /watchlist
 */
app.get('/watchlist', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login')
  }

  const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'))
  const currentUser = users.find(
    (user) => user.username === req.session.user.username,
  )

  if (!currentUser) {
    return res.render('watchlist', {
      title: 'Watchlist',
      active_tab: 'watchlist',
      movies: [],
      series: [],
    })
  }

  const moviesFilePath = path.join(__dirname, 'data', 'movies.json')
  const seriesFilePath = path.join(__dirname, 'data', 'series.json')

  fs.readFile(moviesFilePath, 'utf8', (err, movieData) => {
    if (err) {
      console.error('Error loading movies:', err)
      return res.status(500).send('Error loading movies')
    }

    fs.readFile(seriesFilePath, 'utf8', (err, seriesData) => {
      if (err) {
        console.error('Error loading series:', err)
        return res.status(500).send('Error loading series')
      }

      const movies = JSON.parse(movieData)
      const series = JSON.parse(seriesData)

      const userWatchlistMovies = movies.filter((movie) =>
        currentUser['movie-watchlist']?.includes(movie.id),
      )
      const userWatchlistSeries = series.filter((serie) =>
        currentUser['series-watchlist']?.includes(serie.id),
      )

      res.render('watchlist', {
        title: 'Watchlist',
        active_tab: 'watchlist',
        movies: userWatchlistMovies,
        series: userWatchlistSeries,
      })
    })
  })
})

/**
 * Gibt die Watchlist des eingeloggten Benutzers zurück
 * @route GET /get-user-watchlist
 */
app.get('/get-user-watchlist', (req, res) => {
  if (req.session.user) {
    const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'))
    const currentUser = users.find(
      (u) => u.username === req.session.user.username,
    )

    if (currentUser) {
      res.json({ user: currentUser })
    } else {
      res.status(404).json({ user: null })
    }
  } else {
    res.json({ user: null })
  }
})

/**
 * Fügt eine/n Serie/Film zur Watchlist hinzu oder entfernt sie/ihn
 * @route POST /toggle-watchlist
 */
app.post('/toggle-watchlist', (req, res) => {
  if (!req.session.user) {
    return res.json({ success: false, message: 'Not logged in' })
  }

  const { mediaType, mediaId } = req.body
  const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'))
  const currentUserIndex = users.findIndex(
    (u) => u.username === req.session.user.username,
  )

  if (currentUserIndex === -1) {
    return res.json({ success: false, message: 'User not found.' })
  }

  const currentUser = users[currentUserIndex]
  const watchlistKey =
    mediaType === 'movie' ? 'movie-watchlist' : 'series-watchlist'

  if (!currentUser[watchlistKey]) {
    currentUser[watchlistKey] = []
  }

  const index = currentUser[watchlistKey].indexOf(mediaId)

  if (index === -1) {
    currentUser[watchlistKey].push(mediaId)
  } else {
    currentUser[watchlistKey].splice(index, 1)
  }

  users[currentUserIndex] = currentUser
  fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2))

  res.json({ success: true, [watchlistKey]: currentUser[watchlistKey] })
})

/**
 * Startet den Server auf Port 3000
 */
app.listen(3000, () => {
  console.log('Server läuft auf http://localhost:3000')
})
