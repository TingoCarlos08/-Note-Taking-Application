import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirigir
import './Login.css'; // Importar el archivo CSS para estilos

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Para manejar el estado de carga
  const navigate = useNavigate(); // Hook para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Iniciar el estado de carga

    try {
      const response = await axios.post('http://localhost:3001/login', {
        email: email,
        contraseña: password
      });

      localStorage.setItem('token', response.data.token); // Guardar el token en localStorage
      onLogin(); // Notificar al componente principal que el usuario ha iniciado sesión
      navigate('/dashboard'); // Redirigir a la página del dashboard
    } catch (err) {
      setError('Error de autenticación. Por favor, verifica tus credenciales.');
      console.error(err);
    } finally {
      setIsLoading(false); // Detener el estado de carga
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>
      {error && <p className="login-error">{error}</p>}
    </div>
  );
}

export default Login;
