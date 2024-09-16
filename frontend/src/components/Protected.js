import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Protected() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('No autorizado, token no disponible');
      return;
    }

    axios.get('http://localhost:3001/api/protected', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      setData(response.data);
    })
    .catch((err) => {
      setError('No autorizado o token inválido');
      console.error(err);
    });
  }, []);

  return (
    <div>
      <h2>Contenido Protegido</h2>
      {error && <p>{error}</p>}
      {data && <p>{data.message}</p>}
    </div>
  );
}

export default Protected;
