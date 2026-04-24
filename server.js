const express = require('express');

const app = express();
app.use(express.json());

// route test
app.get('/', (req, res) => {
    res.send('API fonctionne 🚀');
});

// route ping
app.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
});

// route test POST
app.post('/test', (req, res) => {
    const data = req.body;
    res.json({
        message: 'Données reçues',
        data: data
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});