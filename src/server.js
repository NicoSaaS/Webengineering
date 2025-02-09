const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: 'secret-key', // Ändere das in ein sicheres Geheimnis!
    resave: false,
    saveUninitialized: true, // Oder false, je nach deinen Bedürfnissen
    cookie: { secure: false } // true, wenn du HTTPS verwendest
}));

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

app.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

app.get('/movies', (req, res) => {
    const moviesFilePath = path.join(__dirname, '..', 'data', 'movies.json');
    
    fs.readFile(moviesFilePath, 'utf8', (err, movieData) => {
        if (err) {
            return res.status(500).send('Fehler beim Laden der Filme');
        }

        let movies = JSON.parse(movieData);
        const groupedMovies = [];
        var letters = new Set();
        movies.forEach((movie) => {
            const firstLetter = movie.title.charAt(0).toUpperCase();
            letters.add(firstLetter);
        });
        letters = [...letters].sort();
        letters.forEach(letter => {
            const moviesInGroup = movies.filter(movie => movie.title.charAt(0).toUpperCase() === letter);
            groupedMovies.push({ letter, movies: moviesInGroup });
        });

        res.render('movies', { title: 'Movies', groupedMovies, active_tab: 'movies' });
    });
});

app.get('/series', (req, res) => {
    const serieFilePath = path.join(__dirname, '..', 'data', 'series.json');
    
    fs.readFile(serieFilePath, 'utf8', (err, serieData) => {
        if (err) {
            return res.status(500).send('Fehler beim Laden der Serien');
        }

        let series = JSON.parse(serieData);
        const groupedSeries = []; // Korrigiere den Namen zu 'groupedSeries'
        var letters = new Set();
        series.forEach((serie) => {
            const firstLetter = serie.title.charAt(0).toUpperCase();
            letters.add(firstLetter);
        });
        letters = [...letters].sort();
        letters.forEach(letter => {
            const seriesInGroup = series.filter(serie => serie.title.charAt(0).toUpperCase() === letter);
            groupedSeries.push({ letter, series: seriesInGroup });
        });

        res.render('series', { title: 'Series', groupedSerie: groupedSeries, active_tab: 'series' }); // 'groupedSerie' korrekt übergeben
    });
});

app.get('/watchlist', (req, res) => {
    res.render('watchlist', { title: 'Watchlist', active_tab: 'watchlist' });
});


app.get('/profile', (req, res) => {
    if (req.session.user) {
        const { firstName, lastName, username, email, gender } = req.session.user;
        res.render('profile', { firstName, lastName, username, email, gender });
    } else {
        res.redirect('/login');
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        req.session.user = user;
        res.redirect('/profile');
    } else {
        res.send('Ungültiger Benutzername oder Passwort');
    }
});


app.post('/register', (req, res) => {
    const { firstName, lastName, gender, email, username, password} = req.body;
    const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
    const userExists = users.some(user => user.username === username || user.email === email);

    if (userExists) {
        return res.render('register', { 
            title: 'Register',
            errorMessage: 'Benutzername oder E-Mail bereits vergeben. Bitte versuche es erneut.' 
        });
    } else {
        const newUser = users.push({ firstName, lastName, gender, email, username, password });

        fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2));

        req.session.user = newUser;
        res.render('profile', { firstName, lastName, username, email, gender });
    }
});


app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Fehler beim Abmelden');
        }
        res.redirect('/');
    });
});

app.post('/delete-account', (req, res) => {
    if (req.session.user) {
        const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
        const updatedUsers = users.filter(user => user.username !== req.session.user.username);

        fs.writeFileSync('./data/users.json', JSON.stringify(updatedUsers, null, 2));

        req.session.destroy((err) => {
            if (err) {
                return res.send('Fehler beim Löschen des Accounts');
            }
            res.redirect('/');
        });
    } else {
        res.redirect('/login');
    }
});

app.get('/', (req, res) => {
    const moviesFilePath = path.join(__dirname, '..', 'data', 'movies.json');
    const seriesFilePath = path.join(__dirname, '..', 'data', 'series.json');
    fs.readFile(moviesFilePath, 'utf8', (err, movieData) => {
        if (err) {
            return res.status(500).send('Fehler beim Laden der Filme');
        }
    
        fs.readFile(seriesFilePath, 'utf8', (err, seriesData) => {
            if (err) {
                return res.status(500).send('Fehler beim Laden der Serien');
            }

        let movies = JSON.parse(movieData);
        let series = JSON.parse(seriesData);

        movies.sort((a, b) => a.ranking - b.ranking);
        series.sort((a, b) => a.ranking - b.ranking);
        
        res.render('index', { movies: movies, series: series, active_tab: 'home' });
        });
    });
});


app.post('/watchlist', (req, res) => {
    const { movie } = req.body; // Der Film, der zur Watchlist hinzugefügt oder entfernt werden soll
    const user = req.session.user; // Hier wird angenommen, dass der Benutzer eingeloggt ist

    if (!user) {
        return res.status(401).send({ error: 'User not logged in' });
    }

    const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
    const currentUserIndex = users.findIndex(u => u.username === user.username);

    // Finde den Index des Films in der Watchlist des Benutzers (basierend auf der ID)
    const movieIndex = users[currentUserIndex].watchlist.findIndex((m) => m.id === movie.id);

    // Wenn der Film bereits in der Watchlist ist, entferne ihn
    if (movieIndex !== -1) {
        users[currentUserIndex].watchlist.splice(movieIndex, 1);
    } else {
        // Wenn der Film noch nicht in der Watchlist ist, füge nur die ID hinzu
        users[currentUserIndex].watchlist.push({ id: movie.id });
    }

    // Speichere die aktualisierte Liste in der JSON-Datei
    fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2));

    res.json({ success: true, watchlist: users[currentUserIndex].watchlist });
});


app.get('/watchlist', (req, res) => {
    const user = req.session.user; // Hier wird angenommen, dass der Benutzer eingeloggt ist
    const userWatchlistIds = user ? user.watchlist.map(m => m.id) : [];

    const moviesFilePath = path.join(__dirname, '..', 'data', 'movies.json');
    fs.readFile(moviesFilePath, 'utf8', (err, movieData) => {
        if (err) {
            return res.status(500).send('Fehler beim Laden der Filme');
        }

        const movies = JSON.parse(movieData);
        const userWatchlistMovies = movies.filter(movie => userWatchlistIds.includes(movie.id));

        res.render('watchlist', { title: 'Watchlist', active_tab: 'watchlist', watchlist: userWatchlistMovies });
    });
});


// /get-user-watchlist: Gibt die aktuelle Watchlist des Benutzers zurück
app.get('/get-user-watchlist', (req, res) => {
    if (req.session.user) {
        const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
        const currentUser = users.find(u => u.username === req.session.user.username);
        
        if (currentUser) {
            res.json({ user: currentUser });
        } else {
            res.status(404).send({ error: 'Benutzer nicht gefunden' });
        }
    } else {
        res.status(401).send({ error: 'Nicht eingeloggt' });
    }
});

// /toggle-watchlist: Fügt Film zur Watchlist hinzu oder entfernt ihn
app.post('/toggle-watchlist', (req, res) => {
    if (req.session.user) {
        const movieId = req.body.movieId;
        const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
        const currentUser = users.find(u => u.username === req.session.user.username);
        
        if (currentUser) {
            const index = currentUser.watchlist.indexOf(movieId);
            if (index === -1) {
                // Film zur Watchlist hinzufügen
                currentUser.watchlist.push(movieId);
            } else {
                // Film aus der Watchlist entfernen
                currentUser.watchlist.splice(index, 1);
            }

            // Benutzer in der Datei aktualisieren
            fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2));

            res.json({ watchlist: currentUser.watchlist });
        } else {
            res.status(404).send({ error: 'Benutzer nicht gefunden' });
        }
    } else {
        res.status(401).send({ error: 'Nicht eingeloggt' });
    }
});



app.listen(3000, () => {
    console.log('Server läuft auf http://localhost:3000');
});