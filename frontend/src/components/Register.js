import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para redirigir
import './Register.css'; // Importar el archivo CSS

function Register() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para el loading
  const navigate = useNavigate(); // Hook para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Activar el loading al enviar el formulario

    try {
      await axios.post('http://localhost:3001/register', {
        nombre: nombre,
        apellido: apellido,
        email: email,
        contraseña: password
      });

      alert('Registro exitoso, por favor inicia sesión.');
      navigate('/login'); // Redirigir a la página de login después de registrarse
    } catch (err) {
      setError('Error al registrarse. Verifica tus datos e inténtalo de nuevo.');
      console.error(err);
    } finally {
      setIsLoading(false); // Desactivar el loading al finalizar el registro
    }
  };

  return (
    <div className="register-container">
      <h2>Registrar Usuario</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="register-input"
        />
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          className="register-input"
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
        />
        <button type="submit" className="register-button" disabled={isLoading}>
          {isLoading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
      {error && <p className="register-error">{error}</p>}
    </div>
  );
}

export default Register;
