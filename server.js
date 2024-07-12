const express = require('express');
const noteModel = require('./noteModel');

const app = express();
const PORT = 3000;

app.use(express.json());/* Busca las notas*/
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/notes', (req, res) => 
    {
    res.json(noteModel.getNotes());
});

app.post('/notes/detail', (req, res) => 
    {
    const { id } = req.body;
    const note = noteModel.getNoteById(id);
    if (note) {
        res.json(note);
    } else 
    {
        res.json({ error: 'Nota no encontrada' });/* Breakpoint*/
    }
});

/* Condiciones a la hora de registrar una nota*/
app.post('/notes', (req, res) => 
    {
    const { title, content, tags } = req.body;
    if (!title || !content) {
        return res.json({ error: 'El título y el contenido son obligatorios' });
    }
    const newNote = noteModel.createNote(title, content, tags);
    res.json(newNote);
});

/* Actualizar la nota */
app.put('/notes/:id', (req, res) => 
    {
    const { title, content, tags } = req.body;
    const updatedNote = noteModel.updateNote(req.params.id, title, content, tags);
    if (updatedNote) 
        {
        res.json(updatedNote);
    } else 
    {
        res.json({ error: 'Nota no encontrada' });
    }
});

app.delete('/notes/:id', (req, res) => 
    {
    const noteDeleted = noteModel.deleteNote(req.params.id);
    if (noteDeleted) 
        {
        res.json({ message: 'Nota eliminada exitosamente' });
    } else 
    {
        res.json({ error: 'Nota no encontrada para eliminar' });
    }
});

app.listen(PORT, () => 
    {
    console.log(`Server on: http://localhost:${PORT}`);
});
