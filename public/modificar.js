document.addEventListener('DOMContentLoaded', () => 
    {
    /* Datos obtenidos del forms */ 
    const formTitle = document.getElementById('form-title');
    const noteForm = document.getElementById('note-form');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
    const tagsInput = document.getElementById('tags');

    /*El params buscará el ID cuando realiza el recorrido por medio de la URL*/
    const params = new URLSearchParams(window.location.search);
    const noteId = params.get('id');

    if (noteId) 
        {
        formTitle.textContent = 'Modificar Nota';

        fetch('/notes/detail', 
            {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: noteId })
        })
        .then(response => response.json())
        .then(note => 
            {
            titleInput.value = note.title;
            contentInput.value = note.content;
            tagsInput.value = note.tags.join(', ');
        })
        .catch(error => console.error('Error:', error));
    }
    /*Boton de actualizar*/
    noteForm.addEventListener('submit', (event) => 
        {
        event.preventDefault();

        const noteData = 
        {
            title: titleInput.value,
            content: contentInput.value,
            tags: tagsInput.value.split(',').map(tag => tag.trim())
        };

        fetch(`/notes/${noteId}`, 
            {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noteData)
        })
        .then(response => response.json())
        .then(() => 
            {
            location.assign('index.html');
        })
        .catch(error => console.error('Error:', error));
    });
});
