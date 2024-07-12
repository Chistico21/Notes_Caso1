document.addEventListener('DOMContentLoaded', () => {
    const contenedorNotas = document.getElementById('notesGrid'); /* Acá se mostrarán las notas*/
    const botonCrearNota = document.getElementById('createNoteBtn');

    const obtenerNotas = async () => {
        const respuesta = await fetch('/notes');
        const notas = await respuesta.json(); /* Transforma a formato .json*/
        renderizarNotas(notas);
    };

    const renderizarNotas = (notas) => {
        contenedorNotas.innerHTML = '';
        notas.forEach(nota => {
            const contNota = document.createElement('div'); /* Contenedor de cada nota */
            contNota.className = 'note';
            /* Los resultados se mostrarán en el cuerpo de la nota
                se llamará la interfaz de modificar en caso de querer modificar. se obtendrá el id de la nota seleccionada en el index
                contNota se refiere al div donde se motrará la nota ya que es un contenedor
            */
            contNota.innerHTML = `
                <h2>${nota.title}</h2>
                <p>${nota.content.substring(0, 50)}...</p>
                <p>Etiquetas: ${nota.tags.join(', ')}</p>
                <small>Creado: ${new Date(nota.createdAt).toLocaleString()}</small>
                <br>
                <small>Modificado: ${new Date(nota.updatedAt).toLocaleString()}</small>
                <br>
                <a href="modificar.html?id=${nota.id}" backgroud-color="blue"><button>Modificar</button></a>
                <button class="eliminar-btn" data-id="${nota.id}">Eliminar</button>
            `;
            contenedorNotas.appendChild(contNota); /* Añade la nota registrada al contenedor */
        });

        const botonesEliminar = document.querySelectorAll('.eliminar-btn');
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
            await fetch(`/notes/${notaId}`, { /* Consulta el ID asignado a la nota */
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
