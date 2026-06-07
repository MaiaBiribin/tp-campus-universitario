"use client"
import { useEffect, useState } from 'react';

export default function AdminHome(){

  const [estado, setEstado] = useState<'cargando' | 'autorizado' | 'denegado'>('cargando');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setEstado('autorizado');
    } else {
      setEstado('denegado');
    }
  }, []);

  if (estado === 'cargando') return null;

  if (estado === 'denegado') return (
    <div>
      <h1>Acceso denegado</h1>
      <p>No tenés permisos para ver esta página.</p>
      <a href="/login">Ir al login</a>
    </div>
  );

  return(
    <div>
      <main>
        <header>
          <h1>Bienvenido:</h1>
        </header>
      </main>
    </div>
  )
}