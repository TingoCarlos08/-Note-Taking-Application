import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Definir la estructura de los objetos de etiquetas
interface Etiqueta {
  id: number;
  tag_name: string;
}

const CreateNote: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [etiquetas, setEtiquetas] = useState<number[]>([]); // Array de IDs de etiquetas
  const [allTags, setAllTags] = useState<Etiqueta[]>([]); // Array de objetos Etiqueta
  const [error, setError] = useState('');

  useEffect(() => {
    // Cargar las etiquetas del usuario
    axios.get('/api/tags')
      .then(response => {
        setAllTags(response.data); // Aquí TypeScript ahora entiende que el dato tiene id y tag_name
      })
      .catch(error => console.log(error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/notes', { title, content, etiquetas });
      alert('Nota creada con éxito');
    } catch (err) {
      setError('Hubo un error al crear la nota');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Contenido" />
      <div>
        <label>Etiquetas:</label>
        {allTags.map(tag => (
          <div key={tag.id}>
            <input 
              type="checkbox" 
              value={tag.id} 
              onChange={e => {
                if (e.target.checked) {
                  setEtiquetas([...etiquetas, tag.id]);
                } else {
                  setEtiquetas(etiquetas.filter(et => et !== tag.id));
                }
              }} 
            />
            {tag.tag_name}
          </div>
        ))}
      </div>
      <button type="submit">Guardar Nota</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default CreateNote;
