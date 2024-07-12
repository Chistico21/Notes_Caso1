/* Obtiene la info para mostrarla en el index*/
document.addEventListener('DOMContentLoaded', () => 
    {
    const formTitle = document.getElementById('form-title');
    const noteForm = document.getElementById('note-form');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
    const tagsInput = document.getElementById('tags');

    // Obtener el ID de la nota de la URL si está presente
    const params = new URLSearchParams(window.location.search);
    const noteId = params.get('id');

    // Si hay un ID de nota, cargar los detalles de la nota para editar
    if (noteId) 
        {
        formTitle.textContent = 'Modificar Nota';

        fetch('/notes/detail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: noteId })
        })
        .then(response => response.json())
        .then(note => {
            titleInput.value = note.title;
            contentInput.value = note.content;
            tagsInput.value = note.tags.join(', ');
        })
        .catch(error => console.error('Error:', error));
    }

    // Manejar el envío del formulario para crear o actualizar la nota
    noteForm.addEventListener('submit', (event) => 
        {
        event.preventDefault();

        const noteData = 
        {
            title: titleInput.value,
            content: contentInput.value,
            tags: tagsInput.value.split(',').map(tag => tag.trim())
        };

        const fetchOptions = 
        {
            method: noteId ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noteData)
        };

        const fetchUrl = noteId ? `/notes/${noteId}` : '/notes';

        fetch(fetchUrl, fetchOptions)
        .then(response => response.json())
        .then(() => {
            location.assign('index.html');
        })
        .catch(error => console.error('Error:', error));
    });
});
