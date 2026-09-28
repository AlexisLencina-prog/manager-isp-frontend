import React from 'react';

const Topbar = ({ onActualizarTrafico, setActiveTab }) => {
  return (
    <header className="app-topbar">
      <div className="d-flex align-items-center gap-3">
        <div className="input-group input-group-sm d-none d-md-flex" style={{ width: '280px' }}>
          <span className="input-group-text bg-light border-end-0 text-secondary"><i className="bi bi-search"></i></span>
          <input type="text" className="form-control border-start-0" placeholder="Buscar IP o abonado... (Ctrl+K)" />
        </div>
      </div>

      <div className="d-flex align-items-center gap-3">
        <span className="badge bg-light border text-secondary fw-normal px-2 py-1 small d-flex align-items-center gap-2">
          <span className="live-indicator"></span> Telemetría activa
        </span>
        <button className="btn btn-sm btn-outline-primary" onClick={onActualizarTrafico}>
          <i className="bi bi-arrow-clockwise me-1"></i> Actualizar Tráfico
        </button>
        <button className="btn btn-sm btn-primary d-flex align-items-center gap-1 shadow-sm" onClick={() => setActiveTab('clientes')}>
          <i className="bi bi-person-plus-fill"></i> <span className="d-none d-sm-inline">Nuevo Abonado</span>
        </button>
        <div className="border-start ps-3 d-flex align-items-center gap-2">
          <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold small" style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}>
            <i className="bi bi-people-fill"></i>
          </div>
          <div className="d-none d-sm-block lh-1 text-start">
            <span className="fw-semibold text-dark small d-block">Grupo 16</span>
            <span className="text-secondary" style={{ fontSize: '0.7rem' }}>Guardia NOC</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;