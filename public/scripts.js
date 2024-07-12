document.addEventListener('DOMContentLoaded', () => {
    const contenedorNotas = document.getElementById('notesGrid');
    const botonCrearNota = document.querySelector('.create-button');

    const obtenerNotas = async () => {
        const respuesta = await fetch('/notes');
        const notas = await respuesta.json();
        renderizarNotas(notas);
    };

    const renderizarNotas = (notas) => {
        contenedorNotas.innerHTML = '';
        notas.forEach(nota => {
            const contNota = document.createElement('div');
            contNota.className = 'note-card';
            contNota.innerHTML = `
                <h2>${nota.title}</h2>
                <p>${nota.content.substring(0, 50)}...</p>
                <p>Etiquetas: ${nota.tags.join(', ')}</p>
                <small>Creado: ${new Date(nota.createdAt).toLocaleString()}</small>
                <br>
                <small>Modificado: ${new Date(nota.updatedAt).toLocaleString()}</small>
                <br>
                <div class="button-container">
                    <a href="modificar.html?id=${nota.id}" class="button edit-button">Modificar</a>
                    <button class="button delete-button" data-id="${nota.id}">Eliminar</button>
                </div>
            `;
            contenedorNotas.appendChild(contNota);
        });

        const botonesEliminar = document.querySelectorAll('.delete-button');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', (event) => {
                const notaId = event.target.dataset.id;
                eliminarNota(notaId);
            });
        });
    };

    const eliminarNota = async (notaId) => {
        const confirmado = confirm('¿Estás seguro de que deseas eliminar esta nota?');
        if (confirmado) {
            await fetch(`/notes/${notaId}`, {
                method: 'DELETE'
            });
            obtenerNotas();
        }
    };

    botonCrearNota.addEventListener('click', () => {
        location.assign('forms.html');
    });

    obtenerNotas();
});
