import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateTag.css';

const CreateTag = () => {
  const [tagName, setTagName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Para navegar al dashboard

  const handleSubmit = async (e) => {
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
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Limpiar el formulario después de guardar la etiqueta
      setTagName('');
      setError('');
      alert('Etiqueta guardada con éxito');
      navigate('/dashboard'); // Redirigir al dashboard después de crear la etiqueta
    } catch (err) {
      setError('Hubo un error al crear la etiqueta');
      console.error(err);
    }
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
        <button type="button" onClick={() => navigate('/dashboard')} className="tag-button">
          Volver al Dashboard
        </button>
      </form>
      {error && <p className="tag-error">{error}</p>}
    </div>
  );
};

export default CreateTag;
