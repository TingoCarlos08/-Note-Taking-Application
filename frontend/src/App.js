import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CreateNote from './components/CreateNote';
import CreateTag from './components/CreateTag';
import './App.css'; // Importar los estilos

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar si hay un token almacenado en el localStorage al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); // El usuario está autenticado
    }
  }, []);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    setIsAuthenticated(false); // Cambiar el estado de autenticación
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {isAuthenticated ? (
            <>
              {/* Mostrar el dashboard si el usuario está autenticado */}
              <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} />} />
              <Route path="/create-note" element={<CreateNote />} />
              <Route path="/create-tag" element={<CreateTag />} />
              <Route path="/" element={<Navigate to="/dashboard" />} /> {/* Redirigir al dashboard */}
            </>
          ) : (
            <>
              {/* Si no está autenticado, mostrar las opciones de Login y Registro en la página principal */}
              <Route path="/" element={
                <div className="home-container">
                  <h1>Bienvenido a la Aplicación</h1>
                  <p>Gestiona tus notas y etiquetas de manera sencilla.</p>
                  <div className="home-buttons">
                    <Link to="/login" className="button">Iniciar Sesión</Link>
                    <Link to="/register" className="button">Registrarse</Link>
                  </div>
                </div>
              } />
              <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
              <Route path="/register" element={<Register />} />
              {/* Si el usuario intenta acceder a rutas protegidas sin autenticarse */}
              <Route path="*" element={<Navigate to="/" />} /> {/* Redirigir a la página de inicio */}
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
