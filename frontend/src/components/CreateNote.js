import React from 'react';

function CreateNote() {
  return (
    <div>
      <h2>Crear una Nueva Nota</h2>
      {/* Formulario para crear una nueva nota */}
      <form>
        <input type="text" placeholder="Título de la nota" />
        <textarea placeholder="Contenido de la nota"></textarea>
        <button type="submit">Guardar Nota</button>
      </form>
    </div>
  );
}

export default CreateNote;
