import React, { useState } from 'react';
import './CreateTag.css'; // Importar archivo CSS para diseño

function CreateTag() {
  const [tagName, setTagName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tagName) {
      setError('El nombre de la etiqueta es obligatorio');
      return;
    }

    // Aquí puedes realizar la lógica para guardar la etiqueta (por ejemplo, enviar a una API)
    alert(`Etiqueta "${tagName}" creada con éxito!`);
    setTagName('');
    setError('');
  };

  return (
    <div className="create-tag-container">
      <h2>Crear una Nueva Etiqueta</h2>
      <form onSubmit={handleSubmit} className="create-tag-form">
        <input
          type="text"
          placeholder="Nombre de la etiqueta"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          className="tag-input"
        />
        <button type="submit" className="tag-button">Guardar Etiqueta</button>
      </form>
      {error && <p className="tag-error">{error}</p>}
    </div>
  );
}

export default CreateTag;
