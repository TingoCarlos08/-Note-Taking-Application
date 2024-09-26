import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './Login.css'; // Import the CSS file for styling

// Define the type for the props
interface LoginProps {
  onLogin: () => void; // Function prop to handle login
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>(''); // Use specific typing for email and password
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>(''); // Error handling
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const navigate = useNavigate(); // Hook for navigation

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/login', {
        email: email,
        contraseña: password
      });

      localStorage.setItem('token', response.data.token); // Save the token to localStorage
      onLogin(); // Notify the parent component about login
      navigate('/dashboard'); // Redirect to the dashboard page
    } catch (err) {
      setError('Error de autenticación. Por favor, verifica tus credenciales.');
      console.error(err);
    } finally {
      setIsLoading(false); // Stop the loading state
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
};

export default Login;
