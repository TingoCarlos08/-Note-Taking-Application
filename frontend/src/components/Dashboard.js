import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Importamos el archivo CSS para aplicar estilos

function Dashboard({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token del localStorage
    onLogout(); // Actualizar el estado de autenticación en App.js
    navigate('/'); // Redirigir a la página principal (Login/Registro)
  };

  return (
    <div className="dashboard-container">
      <h2>Bienvenido al Dashboard</h2>
      <div className="dashboard-buttons">
        <button onClick={() => navigate('/create-note')} className="dashboard-button">
          Crear Nota
        </button>
        <button onClick={() => navigate('/create-tag')} className="dashboard-button">
          Crear Etiqueta
        </button>
        <button onClick={handleLogout} className="dashboard-button logout-button">
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
