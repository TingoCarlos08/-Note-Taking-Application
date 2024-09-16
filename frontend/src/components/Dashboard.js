import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard({ onLogout }) {  // Asegúrate de recibir la función de logout desde props
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token del localStorage
    onLogout(); // Actualizar el estado de autenticación en App.js
    navigate('/'); // Redirigir a la página principal (Login/Registro)
  };

  return (
    <div>
      <h2>Bienvenido al Dashboard</h2>
      <button onClick={() => navigate('/create-note')}>Crear Nota</button>
      <button onClick={() => navigate('/create-tag')}>Crear Etiqueta</button>
      <button onClick={handleLogout}>Cerrar Sesión</button> {/* Asegurarse de que esto cierre sesión */}
    </div>
  );
}

export default Dashboard;
