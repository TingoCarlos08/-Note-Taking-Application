import React from 'react';

function CreateTag() {
  return (
    <div>
      <h2>Crear una Nueva Etiqueta</h2>
      {/* Formulario para crear una nueva etiqueta */}
      <form>
        <input type="text" placeholder="Nombre de la etiqueta" />
        <button type="submit">Guardar Etiqueta</button>
      </form>
    </div>
  );
}

export default CreateTag;
