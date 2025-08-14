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

app.get('/api/persons/:id', async (req, res, next) => {
    try {
        await connect();
        const person = await Person.findById(req.params.id);
        if (person) {
            res.json(person);
        } else {
            res.status(404).end();
        }
    } catch (err) {
        next(err);
    }
});

app.delete('/api/persons/:id', async (req, res, next) => {
    try {
        await connect();
        await Person.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

app.post('/api/persons', async (req, res, next) => {
    try {
        await connect();
        const { name, number } = req.body || {};
        if (!name || !number) {
            return res.status(400).json({ error: 'name and number are required' });
        }
        // Check for duplicate name
        const existing = await Person.findOne({ name });
        if (existing) {
            return res.status(400).json({ error: 'name must be unique' });
        }
        const newPerson = new Person({ name, number });
        const savedPerson = await newPerson.save();
        res.status(201).json(savedPerson);
    } catch (err) {
        next(err);
    }
});

app.put('/api/persons/:id', async (req, res, next) => {
    try {
        await connect();
        const { name, number } = req.body || {};
        const updatedPerson = await Person.findByIdAndUpdate(
            req.params.id,
            { name, number },
            { new: true, runValidators: true, context: 'query' }
        );
        if (updatedPerson) {
            res.json(updatedPerson);
        } else {
            res.status(404).end();
        }
    } catch (err) {
        next(err);
    }
});

app.get('/', (req, res) => {
    res.send('Phonebook API is running');
});

// Health check route to help debug production issues
app.get('/health', async (req, res) => {
    try {
        await connect();
        const count = await Person.estimatedDocumentCount();
        res.json({ status: 'ok', db: 'connected', persons: count });
    } catch (e) {
        console.error('Health check error:', e.message);
        res.status(500).json({ status: 'error', error: e.message });
    }
});

// Fallback: serve index.html for any other GET (client-side routing)
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Centralized error handler to return JSON instead of HTML errors
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});