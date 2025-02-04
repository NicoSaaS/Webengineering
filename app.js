const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

// Startseite
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Login-Seite
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Registrierungsseite
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

// Profilseite (mit Session-Daten)
app.get('/profile', (req, res) => {
    if (req.session.user) {
        const { firstName, lastName, username, email, gender } = req.session.user;

        fs.readFile(path.join(__dirname, 'views', 'profile.html'), 'utf8', (err, data) => {
            if (err) {
                return res.send('Fehler beim Laden der Profilseite');
            }

            // Platzhalter ersetzen
            const renderedHTML = data
                .replace(/{{firstName}}/g, firstName)
                .replace(/{{lastName}}/g, lastName)
                .replace(/{{username}}/g, username)
                .replace(/{{email}}/g, email)
                .replace(/{{gender}}/g, gender);

            res.send(renderedHTML);
        });
    } else {
        res.redirect('/login');
    }
});

// Login-Post-Route
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

// Register-Post-Route
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

// Logout-Route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Fehler beim Abmelden');
        }
        res.redirect('/');
    });
});

// Account löschen
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

// Server starten
app.listen(3000, () => {
    console.log('Server läuft auf http://localhost:3000');
});
