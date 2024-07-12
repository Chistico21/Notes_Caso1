document.addEventListener('DOMContentLoaded', () => 
    {
    const formTitle = document.getElementById('form-title');
    const noteForm = document.getElementById('note-form');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
    const tagsInput = document.getElementById('tags');

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
});
