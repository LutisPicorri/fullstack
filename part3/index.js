const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { Person, connect } = require('./models/person');
const app = express();

app.use(cors());
app.use(express.json());

// Serve production frontend from /dist
app.use(express.static(path.join(__dirname, 'dist')));

morgan.token('body', (req) => (req.method === 'POST' ? JSON.stringify(req.body) : ''));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', async (req, res, next) => {
    try {
        await connect();
        const persons = await Person.find({});
        res.json(persons);
    } catch (err) {
        next(err);
    }
});

app.get('/info', async (req, res, next) => {
    try {
        await connect();
        const count = await Person.countDocuments();
        res.send(`
          <p>Phonebook has info for ${count} people</p>
          <p>${new Date()}</p>
        `);
    } catch (err) {
        next(err);
    }
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);
    res.status(204).end();
});

app.post('/api/persons', (req, res) => {
    const { name, number } = req.body || {};
    if (!name || !number) {
        return res.status(400).json({ error: 'name and number are required' });
    }

    const existing = persons.find((p) => p.name === name);
    if (existing) {
        return res.status(400).json({ error: 'name must be unique' });
    }

    const newPerson = {
        id: Math.floor(Math.random() * 1000000000),
        name,
        number
    };

    persons.push(newPerson);
    res.status(201).json(newPerson);
});

app.get('/', (req, res) => {
    res.send('Phonebook API is running');
});

// Fallback: serve index.html for any other GET (client-side routing)
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});