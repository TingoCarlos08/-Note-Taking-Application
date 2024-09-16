import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ onLogout }) {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token'); // Eliminar el token del localStorage
    onLogout(); // Actualizar el estado de autenticación
    navigate('/'); // Redirigir a la página principal (Login/Registro)
  }, [navigate, onLogout]);

  return <div>Cerrando sesión...</div>;
}

export default Logout;
