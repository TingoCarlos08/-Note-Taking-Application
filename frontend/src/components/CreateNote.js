import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para la redirección
import './CreateNote.css'; 

const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]); // Almacenar IDs de etiquetas seleccionadas
  const [allTags, setAllTags] = useState([]); // Almacenar todas las etiquetas
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Para navegar al dashboard

  // Obtener todas las etiquetas cuando el componente se monta
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/tags', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAllTags(response.data); // Almacenar las etiquetas obtenidas
      } catch (error) {
        console.error('Error al cargar las etiquetas', error);
      }
    };

    fetchTags(); // Llamar a la API para obtener las etiquetas
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError('El título y el contenido son obligatorios');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/api/notes', {
        title,
        content,
        etiquetas: tags // Enviar solo los IDs de las etiquetas seleccionadas
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Nota creada con éxito');
      setTitle('');
      setContent('');
      setTags([]); // Limpiar etiquetas seleccionadas
      navigate('/dashboard'); // Redirigir al Dashboard
    } catch (err) {
      setError('Error al crear la nota');
      console.error(err);
    }
  };

  const handleTagChange = (tagId) => {
    // Alternar selección de etiquetas
    if (tags.includes(tagId)) {
      setTags(tags.filter(id => id !== tagId));
    } else {
      setTags([...tags, tagId]);
    }
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
        />
        <div className="tag-selection">
          <h3>Seleccionar etiquetas:</h3>
          {allTags.length > 0 ? allTags.map((tag) => (
            <label key={tag.id}>
              <input
                type="checkbox"
                value={tag.id}
                checked={tags.includes(tag.id)}
                onChange={() => handleTagChange(tag.id)}
              />
              {tag.tag_name}
            </label>
          )) : <p>No tienes etiquetas disponibles</p>}
        </div>
        <button type="submit" className="note-button">Guardar Nota</button>
        <button type="button" onClick={() => navigate('/dashboard')} className="note-button">
          Volver al Dashboard
        </button>
      </form>
      {error && <p className="note-error">{error}</p>}
    </div>
  );
};

export default CreateNote;
