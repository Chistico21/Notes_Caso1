const { v4: uuidv4 } = require('uuid');/*Libreria para generar IDS*/

let notes = [];

const createNote = (title, content, tags) => 
    {
    const note = 
    {
        id: uuidv4(),
        title,
        content,
        createdAt: new Date(),/* Trabaja como sysdate*/
        updatedAt: new Date(),/* Trabaja como sysdate*/
        tags: tags || []
    };
    notes.push(note);
    return note;
};

const getNotes = () => notes;

const getNoteById = (id) => notes.find(note => note.id === id);

const updateNote = (id, title, content, tags) => 
    {
    const note = getNoteById(id);
    if (note) 
        {
        note.title = title;
        note.content = content;
        note.tags = tags;
        note.updatedAt = new Date();
    }
    return note;
};

const deleteNote = (id) => 
    {
    notes = notes.filter(note => note.id !== id);
    return notes;
};

module.exports = 
{
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote
};
