import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirigir

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', {
        email: email,
        contraseña: password
      });

      localStorage.setItem('token', response.data.token); // Guardar el token en localStorage
      onLogin(); // Notificar al componente principal que el usuario ha iniciado sesión
      navigate('/dashboard'); // Redirigir a la página del dashboard
    } catch (err) {
      setError('Error de autenticación');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
