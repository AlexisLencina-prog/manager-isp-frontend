import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const handleNavClick = () => {
    if (setSidebarOpen) setSidebarOpen(false); // Cierra automáticamente el drawer en celulares
  };

  return (
    <aside className={`app-sidebar ${sidebarOpen ? 'show' : ''}`} aria-label='Menú lateral de navegación'>
      <div className='sidebar-brand d-flex justify-content-between align-items-center'>
        <div className='d-flex align-items-center gap-2'>
          <div className='bg-primary text-white p-1 rounded-2 d-flex align-items-center justify-content-center' style={{ width: '30px', height: '30px' }}>
            <i className='bi bi-broadcast-pin fs-6'></i>
          </div>
          <div className='lh-1'>
            <span className='fw-bold fs-6 text-dark'>ISP<span className='text-primary'>MANAGER</span></span>
            <span className='d-block text-secondary' style={{ fontSize: '0.65rem' }}>Operations v6.0</span>
          </div>
        </div>
        {/* Botón de cierre en viewports móviles */}
        <button 
          type='button'
          className='btn btn-sm btn-light border-0 d-lg-none text-secondary'
          onClick={() => setSidebarOpen(false)}
          aria-label='Cerrar menú'
        >
          <i className='bi bi-x-lg'></i>
        </button>
      </div>

      <nav className='flex-grow-1 overflow-y-auto py-2' aria-label='Rutas operativas'>
        <div className='sidebar-category'>OPERACIONES NOC</div>
        <NavLink 
          to='/' 
          end
          className={({ isActive }) => `sidebar-btn text-decoration-none ${isActive ? 'active' : ''}`}
          onClick={handleNavClick}
        >
          <i className='bi bi-grid-fill'></i>
          <span>Panel Principal</span>
        </NavLink>
        <NavLink 
          to='/clientes' 
          className={({ isActive }) => `sidebar-btn text-decoration-none ${isActive ? 'active' : ''}`}
          onClick={handleNavClick}
        >
          <i className='bi bi-people-fill'></i>
          <span>Nómina Abonados</span>
        </NavLink>

        <div className='sidebar-category'>GESTIÓN COMERCIAL</div>
        <NavLink 
          to='/planes' 
          className={({ isActive }) => `sidebar-btn text-decoration-none ${isActive ? 'active' : ''}`}
          onClick={handleNavClick}
        >
          <i className='bi bi-hdd-stack-fill'></i>
          <span>Planes & Enlaces</span>
        </NavLink>
        <NavLink 
          to='/soporte' 
          className={({ isActive }) => `sidebar-btn text-decoration-none ${isActive ? 'active' : ''}`}
          onClick={handleNavClick}
        >
          <i className='bi bi-headset'></i>
          <span>Mesa de Tickets</span>
        </NavLink>
      </nav>

      <div className='p-3 border-top'>
        <div className='d-flex align-items-center gap-2'>
          <span className='live-indicator'></span>
          <div className='small lh-sm'>
            <span className='fw-semibold d-block text-dark' style={{ fontSize: '0.78rem' }}>OLT Principal Online</span>
            <span className='text-secondary' style={{ fontSize: '0.68rem' }}>Latencia: 8ms</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;