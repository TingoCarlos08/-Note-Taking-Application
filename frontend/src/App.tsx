import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CreateNote from './components/CreateNote';
import CreateTag from './components/CreateTag';
import './App.css'; // Importar estilos

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); // Si hay un token en localStorage, el usuario está autenticado
    } else {
      setIsAuthenticated(false); // Si no hay token, asegurarse de marcar como no autenticado
    }
  }, []);

  const handleLogout = (): void => {
    localStorage.removeItem('token'); // Remover el token al cerrar sesión
    setIsAuthenticated(false); // Actualizar el estado de autenticación
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} />} />
              <Route path="/create-note" element={<CreateNote />} />
              <Route path="/create-tag" element={<CreateTag />} />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <>
              {/* Redirigir al usuario a la página principal cuando no esté autenticado */}
              <Route
                path="/"
                element={
                  <div>
                    <h2>Bienvenido a la aplicación</h2>
                    <button onClick={() => window.location.href = '/login'}>Iniciar Sesión</button>
                    <button onClick={() => window.location.href = '/register'}>Registrarse</button>
                  </div>
                }
              />
              <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
