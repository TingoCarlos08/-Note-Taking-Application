import React from 'react';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/protected">Contenido Protegido</a></li>
          <li><a href="/logout">Cerrar Sesión</a></li> {/* Enlace para logout */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
