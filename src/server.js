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
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
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
        const letters = new Set();
        movies.forEach((movie) => {
            const firstLetter = movie.title.charAt(0).toUpperCase();
            letters.add(firstLetter);
        });
        letters.forEach(letter => {
            const moviesInGroup = movies.filter(movie => movie.title.charAt(0).toUpperCase() === letter);
            groupedMovies.push({ letter, movies: moviesInGroup });
        });

        // Übergib die gruppierten Filme an das Pug-Template
        res.render('movies', { title: 'Movies', groupedMovies, active_tab: 'movies' });
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
    const { firstName, lastName, gender, email, username, password } = req.body;
    const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));

    const userExists = users.some(user => user.username === username || user.email === email);

    if (userExists) {
        res.send('Benutzername oder E-Mail existiert bereits!');
    } else {
        users.push({ firstName, lastName, gender, email, username, password });

        fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2));

        res.send('Registrierung erfolgreich!');
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


app.listen(3000, () => {
    console.log('Server läuft auf http://localhost:3000');
});