import React, { useState, useEffect } from "react";
import Sidebar from "./Components/Sidebar";
import Topbar from "./Components/Topbar";
import AppRouter from "./Components/AppRouter";

function App() {
  const [trafico, setTrafico] = useState(3.8);
  const [sidebarOpen, setSidebarOpen] = useState(
    () => window.innerWidth >= 992
  );

  const [tema, setTema] = useState(() => {
    return localStorage.getItem("tema_app") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", tema);
    localStorage.setItem("tema_app", tema);
  }, [tema]);

  const handleActualizarTrafico = () => {
    const nuevoTrafico = (Math.random() * (4.8 - 2.5) + 2.5).toFixed(1);
    setTrafico(nuevoTrafico);
  };

  return (
    <div className="d-flex position-relative bg-body text-body min-vh-100">
      {sidebarOpen && (
        <div
          className="sidebar-backdrop d-lg-none"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`app-wrapper flex-grow-1 d-flex flex-column ${!sidebarOpen ? "full-width" : ""}`}
      >
        <Topbar
          onActualizarTrafico={handleActualizarTrafico}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          tema={tema}
          setTema={setTema}
        />

        <main className="p-3 p-lg-4 flex-grow-1 bg-body text-body">
          <AppRouter trafico={trafico} />
        </main>

        <footer className="py-3 px-4 border-top bg-body-tertiary text-body-secondary small d-flex justify-content-between align-items-center">
          <span>&copy; 2026 ISP MANAGER Platform</span>
          <span>Grupo 16 - Cátedra Programación 4</span>
        </footer>
      </div>
    </div>
  );
}

export default App;