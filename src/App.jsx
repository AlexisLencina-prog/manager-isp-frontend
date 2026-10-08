import React, { useState } from "react";
import Sidebar from "./Components/Sidebar";
import Topbar from "./Components/Topbar";
import AppRouter from "./Components/AppRouter";

function App() {
  const [trafico, setTrafico] = useState(3.8);
  // En móviles arranca cerrado; en escritorio arranca desplegado
  const [sidebarOpen, setSidebarOpen] = useState(
    () => window.innerWidth >= 992,
  );

  const handleActualizarTrafico = () => {
    const nuevoTrafico = (Math.random() * (4.8 - 2.5) + 2.5).toFixed(1);
    setTrafico(nuevoTrafico);
  };

  return (
    <div className="d-flex position-relative">
      {/* Fondo semitransparente para cerrar el drawer en móviles al tocar afuera */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop d-lg-none"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={`app-wrapper ${!sidebarOpen ? "full-width" : ""}`}>
        <Topbar
          onActualizarTrafico={handleActualizarTrafico}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
        />

        <main className="p-3 p-lg-4 flex-grow-1">
          <AppRouter trafico={trafico} />
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
