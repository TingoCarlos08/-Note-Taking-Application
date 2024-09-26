import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Llamamos a la función de logout que nos pasa App.tsx
    navigate('/'); // Redirigimos al usuario al inicio
  };

  return (
    <div className="dashboard-container">
      <h2>Tus notas</h2>
      <div>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>
      {/* Mostrar notas, etiquetas, etc. */}
    </div>
  );
};

export default Dashboard;
