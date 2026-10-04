import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <section className='d-flex flex-column align-items-center justify-content-center py-5 text-center'>
      <div className='bg-primary-subtle text-primary p-3 rounded-circle mb-3'>
        <i className='bi bi-hdd-network-fill fs-1'></i>
      </div>
      <h1 className='display-6 fw-bold text-dark mb-2'>404 - Segmento No Encontrado</h1>
      <p className='text-secondary small mb-4' style={{ maxWidth: '420px' }}>
        El recurso o ruta de red solicitada no se encuentra disponible o fue reconfigurada en la tabla de enrutamiento del NOC.
      </p>
      <Link to='/' className='btn btn-sm btn-primary px-3 fw-semibold'>
        <i className='bi bi-arrow-left me-1'></i> Volver al Panel Principal
      </Link>
    </section>
  );
};

export default NotFoundPage;