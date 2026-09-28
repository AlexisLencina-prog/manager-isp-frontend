import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="app-sidebar">
      <div className="sidebar-brand">
        <div className="d-flex align-items-center gap-2">
          <div className="bg-primary text-white p-1 rounded-2 d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px' }}>
            <i className="bi bi-broadcast-pin fs-6"></i>
          </div>
          <div className="lh-1">
            <span className="fw-bold fs-6 text-dark">ISP<span className="text-primary">MANAGER</span></span>
            <span className="d-block text-secondary" style={{ fontSize: '0.65rem' }}>Cloud Operations v5.0</span>
          </div>
        </div>
      </div>

      <div className="flex-grow-1 overflow-y-auto py-2">
        <div className="sidebar-category">OPERACIONES NOC</div>
        <button 
          className={`sidebar-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <i className="bi bi-grid-fill"></i>
          <span>Panel Principal</span>
        </button>
        <button 
          className={`sidebar-btn ${activeTab === 'clientes' ? 'active' : ''}`}
          onClick={() => setActiveTab('clientes')}
        >
          <i className="bi bi-people-fill"></i>
          <span>Nómina Abonados</span>
        </button>

        <div className="sidebar-category">GESTIÓN COMERCIAL</div>
        <button 
          className={`sidebar-btn ${activeTab === 'planes' ? 'active' : ''}`}
          onClick={() => setActiveTab('planes')}
        >
          <i className="bi bi-hdd-stack-fill"></i>
          <span>Planes & Enlaces</span>
        </button>
        <button 
          className={`sidebar-btn ${activeTab === 'soporte' ? 'active' : ''}`}
          onClick={() => setActiveTab('soporte')}
        >
          <i className="bi bi-headset"></i>
          <span>Mesa de Tickets</span>
        </button>
      </div>

      <div className="p-3 border-top">
        <div className="d-flex align-items-center gap-2">
          <span className="live-indicator"></span>
          <div className="small lh-sm">
            <span className="fw-semibold d-block text-dark" style={{ fontSize: '0.78rem' }}>OLT Principal Online</span>
            <span className="text-secondary" style={{ fontSize: '0.68rem' }}>Latencia: 8ms</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;