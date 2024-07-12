const express = require('express');
const bodyParser = require('body-parser');
const noteModel = require('./noteModel');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.json(noteModel.getNotes());
});

app.post('/notes/detail', (req, res) => {
    const { id } = req.body;
    const note = noteModel.getNoteById(id);
    if (note) {
        res.json(note);
    } else {
        res.status(404).send('Nota no encontrada');
    }
});

/* Condiciones */
app.post('/notes', (req, res) => {
    const { title, content, tags } = req.body;
    if (!title || !content) {
        return res.status(400).send('El título y el contenido son obligatorios');
    }
    const newNote = noteModel.createNote(title, content, tags);
    res.status(201).json(newNote);
});
