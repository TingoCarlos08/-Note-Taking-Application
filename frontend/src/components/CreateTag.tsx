import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import './CreateTag.css';

const CreateTag: React.FC = () => {
  const [tagName, setTagName] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!tagName) {
      setError('El nombre de la etiqueta es obligatorio');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3001/api/tags',
        { tag_name: tagName },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Añadir el token en el encabezado
          },
        }
      );

      setTagName('');
      setError('');
      alert('Etiqueta creada con éxito');
    } catch (err) {
      setError('Hubo un error al crear la etiqueta');
      console.error(err);
    }
  };

  const handleTagChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTagName(e.target.value);
  };

  return (
    <div className="create-tag-container">
      <h2>Crear Etiqueta</h2>
      <form onSubmit={handleSubmit} className="create-tag-form">
        <input
          type="text"
          placeholder="Nombre de la etiqueta"
          value={tagName}
          onChange={handleTagChange}
          className="tag-input"
        />
        <button type="submit" className="tag-button">Guardar Etiqueta</button>
      </form>
      {error && <p className="tag-error">{error}</p>}
    </div>
  );
};

export default CreateTag;
