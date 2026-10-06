import React from 'react';
import { Link } from 'react-router-dom';

const Topbar = ({ onActualizarTrafico, setSidebarOpen, sidebarOpen }) => {
  return (
    <header className='bg-white border-bottom sticky-top d-flex align-items-center justify-content-between px-3 px-lg-4' style={{ height: '60px', zIndex: 1020 }}>
      <div className='d-flex align-items-center gap-2'>
        {/* Botón para abrir / alternar menú lateral en PC y móvil */}
        <button 
          type='button'
          className='btn btn-sm btn-light border d-flex align-items-center justify-content-center p-2'
          onClick={() => setSidebarOpen((prev) => !prev)}
          title={sidebarOpen ? 'Ocultar barra lateral' : 'Mostrar barra lateral'}
          aria-label='Alternar menú'
        >
          <i className='bi bi-list fs-5'></i>
        </button>

        <div className='input-group input-group-sm d-none d-md-flex' style={{ width: '260px' }}>
          <span className='input-group-text bg-light border-end-0 text-secondary'>
            <i className='bi bi-search'></i>
          </span>
          <input 
            type='search' 
            className='form-control bg-light border-start-0' 
            placeholder='Buscar IP o abonado...' 
          />
        </div>
      </div>

      <div className='d-flex align-items-center gap-2 gap-sm-3'>
        <span className='badge bg-light border text-secondary fw-normal px-2 py-1 small d-none d-sm-inline-flex align-items-center gap-1'>
          <span className='badge bg-success p-1 rounded-circle'></span> Telemetría
        </span>

        <button 
          type='button' 
          className='btn btn-sm btn-outline-primary d-none d-md-inline-flex align-items-center gap-1' 
          onClick={onActualizarTrafico}
        >
          <i className='bi bi-arrow-clockwise'></i> Actualizar
        </button>
        
        <Link 
          to='/clientes' 
          className='btn btn-sm btn-primary d-flex align-items-center gap-1 shadow-sm text-decoration-none'
        >
          <i className='bi bi-person-plus-fill'></i>
          <span className='d-none d-sm-inline'>Nuevo</span>
        </Link>

        <div className='border-start ps-2 ps-sm-3 d-flex align-items-center gap-2'>
          <div 
            className='bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold' 
            style={{ width: '34px', height: '34px', fontSize: '0.85rem' }}
          >
            <i className='bi bi-person-circle fs-5'></i>
          </div>
          <div className='d-none d-sm-block lh-1 text-start'>
            <span className='fw-bold text-dark small d-block'>Grupo 16</span>
            <span className='text-secondary' style={{ fontSize: '0.7rem' }}>Guardia NOC</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;