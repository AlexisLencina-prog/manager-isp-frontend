import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Sidebar from "./Components/Sidebar";
import Topbar from "./Components/Topbar";
import AppRouter from "./Components/AppRouter";

function App() {
  const [trafico, setTrafico] = useState(3.8);
  const [sidebarOpen, setSidebarOpen] = useState(
    () => window.innerWidth >= 992,
  );

  const [tema, setTema] = useState(() => {
    return localStorage.getItem("tema_app") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", tema);
    localStorage.setItem("tema_app", tema);
  }, [tema]);

  const handleActualizarTrafico = () => {
    const nuevoTrafico = parseFloat(
      (Math.random() * (4.8 - 2.5) + 2.5).toFixed(1),
    );
    setTrafico(nuevoTrafico);

    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1800,
      timerProgressBar: true,
    }).fire({
      icon: "info",
      title: `Muestra actualizada: ${nuevoTrafico} Gbps`,
    });
  };

  return (
    <div className="d-flex position-relative min-vh-100 bg-body-secondary text-body">
      {sidebarOpen && (
        <div
          className="sidebar-backdrop d-lg-none"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`app-wrapper flex-grow-1 d-flex flex-column ${
          !sidebarOpen ? "full-width" : ""
        }`}
      >
        <Topbar
          onActualizarTrafico={handleActualizarTrafico}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          tema={tema}
          setTema={setTema}
        />

        <main className="p-3 flex-grow-1">
          <AppRouter trafico={trafico} setTrafico={setTrafico} />
        </main>

        <footer className="py-2 px-3 border-top bg-body text-body-secondary small d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div className="d-flex align-items-center gap-2">
            <span className="pulse-dot" aria-hidden="true"></span>
            <strong className="text-body font-monospace">
              ISP MANAGER v2.4
            </strong>
            <span className="d-none d-sm-inline">
              | Sistema de Gestión NOC y Telecomunicaciones
            </span>
          </div>
          <div className="font-monospace" style={{ fontSize: "0.78rem" }}>
            Grupo 16 (Alexis Lencina - Eduardo Albarracín) | Programación 4
            (UTN-FRT) &copy; 2026
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
