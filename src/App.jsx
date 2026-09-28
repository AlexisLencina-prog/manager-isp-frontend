import React, { useState } from 'react';
import Sidebar from './Components/Sidebar';
import Topbar from './Components/Topbar';
import DashboardView from './Components/DashboardView';
import ClientesView from './Components/ClientesView';
import PlanesView from './Components/PlanesView';
import SoporteView from './Components/SoporteView';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [trafico, setTrafico] = useState(3.8);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleActualizarTrafico = () => {
    const nuevoTrafico = (Math.random() * (4.8 - 2.5) + 2.5).toFixed(1);
    setTrafico(nuevoTrafico);
  };

  return (
    <div className="d-flex position-relative">
      {sidebarOpen && (
        <div 
          className="sidebar-backdrop d-lg-none" 
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className="app-wrapper">
        <Topbar 
          onActualizarTrafico={handleActualizarTrafico} 
          setActiveTab={setActiveTab} 
          setSidebarOpen={setSidebarOpen}
        />

        <main className="p-3 p-lg-4 flex-grow-1">
          {activeTab === 'dashboard' && <DashboardView trafico={trafico} />}
          {activeTab === 'clientes' && <ClientesView />}
          {activeTab === 'planes' && <PlanesView />}
          {activeTab === 'soporte' && <SoporteView />}
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