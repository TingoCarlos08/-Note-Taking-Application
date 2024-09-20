import React, { useState } from 'react';
import './CreateNote.css'; // Importar el archivo CSS para el diseño

function CreateNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError('Ambos campos son obligatorios');
      return;
    }

    // Aquí puedes realizar alguna acción con los datos (por ejemplo, guardar en la base de datos o mostrar un mensaje de éxito)
    alert('Nota guardada con éxito!');
    setTitle('');
    setContent('');
    setError('');
  };

  return (
    <div className="create-note-container">
      <h2>Crear una Nueva Nota</h2>
      <form onSubmit={handleSubmit} className="create-note-form">
        <input
          type="text"
          placeholder="Título de la nota"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="note-input"
        />
        <textarea
          placeholder="Contenido de la nota"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="note-textarea"
        ></textarea>
        <button type="submit" className="note-button">Guardar Nota</button>
      </form>
      {error && <p className="note-error">{error}</p>}
    </div>
  );
}

export default CreateNote;

