import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/notes', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNotes(response.data);
      } catch (err) {
        setError('Error al cargar las notas');
        console.error(err);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Tus notas</h2>
      {error && <p>{error}</p>}

      <div className="dashboard-buttons">
        <button onClick={() => navigate('/create-note')} className="dashboard-button">
          Crear Nota
        </button>
        <button onClick={() => navigate('/create-tag')} className="dashboard-button">
          Crear Etiqueta
        </button>
      </div>

      {notes.length > 0 ? (
        <ul className="note-list">
          {notes.map((note) => (
            <li key={note.id} className="note-item">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <div>
                <strong>Etiquetas:</strong> {note.etiquetas.join(', ')}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No has creado notas todavía</p>
      )}

      <button onClick={onLogout} className="logout-button">Cerrar sesión</button>
    </div>
  );
};

export default Dashboard;
