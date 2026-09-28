import React, { useState } from 'react';
import Sidebar from './Components/Sidebar';
import Topbar from './Components/Topbar';
import DashboardView from './Components/DashboardView';
import ClientesView from './Components/ClientesView';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [trafico, setTrafico] = useState(3.8);

  const handleActualizarTrafico = () => {
    // Simula una variación aleatoria entre 2.5 y 4.8 Gbps
    const nuevoTrafico = (Math.random() * (4.8 - 2.5) + 2.5).toFixed(1);
    setTrafico(nuevoTrafico);
  };

  return (
    <div className="d-flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="app-wrapper">
        <Topbar onActualizarTrafico={handleActualizarTrafico} setActiveTab={setActiveTab} />

        <main className="p-3 p-lg-4 flex-grow-1">
          {activeTab === 'dashboard' && <DashboardView trafico={trafico} />}
          {activeTab === 'clientes' && <ClientesView />}
          
          {/* Vistas que le dejaremos a Alexis para su módulo (Planes y Soporte) */}
          {activeTab === 'planes' && (
            <div className="saas-card p-5 text-center">
              <i className="bi bi-hdd-stack fs-1 text-primary mb-2 d-block"></i>
              <h5 className="fw-bold">Módulo Comercial de Planes</h5>
              <p className="text-secondary small">Sector asignado para la implementación de Alexis.</p>
            </div>
          )}
          {activeTab === 'soporte' && (
            <div className="saas-card p-5 text-center">
              <i className="bi bi-headset fs-1 text-primary mb-2 d-block"></i>
              <h5 className="fw-bold">Módulo de Tickets y Soporte Técnico</h5>
              <p className="text-secondary small">Sector asignado para la implementación de Alexis.</p>
            </div>
          )}
        </main>

        <footer className="py-3 px-4 border-top bg-white text-secondary small d-flex justify-content-between align-items-center">
          <span>&copy; 2026 ISP MANAGER Platform</span>
          <span>Grupo 16 - Cátedra Programación 4</span>
        </footer>
      </div>
    </div>
  );
}

export default App;