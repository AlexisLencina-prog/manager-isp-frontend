import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const handleNavClick = () => {
    if (window.innerWidth < 992) {
      setSidebarOpen(false);
    }
  };

  return (
    <aside
      className={`app-sidebar ${sidebarOpen ? "show" : "hidden"}`}
      aria-label="Menú lateral de navegación"
    >
      {/* Encabezado: 60px exactos alineado con el Topbar */}
      <div
        className="d-flex align-items-center justify-content-between px-3 border-bottom bg-white"
        style={{ height: "60px" }}
      >
        <div className="d-flex align-items-center gap-2">
          <div
            className="bg-primary text-white rounded-3 d-flex align-items-center justify-content-center shadow-sm"
            style={{ width: "32px", height: "32px" }}
          >
            <i className="bi bi-broadcast fs-5"></i>
          </div>
          <div className="lh-sm">
            <span
              className="fw-bold text-dark d-block"
              style={{ fontSize: "0.88rem" }}
            >
              ISP<span className="text-primary">MANAGER</span>
            </span>
            <span
              className="text-secondary d-block"
              style={{ fontSize: "0.62rem" }}
            >
              Operations NOC
            </span>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-sm btn-light border-0 text-secondary p-1 d-flex align-items-center justify-content-center"
          onClick={() => setSidebarOpen(false)}
          title="Ocultar menú lateral"
          aria-label="Ocultar menú"
        >
          <i className="bi bi-layout-sidebar-inset fs-5"></i>
        </button>
      </div>

      <nav
        className="flex-grow-1 overflow-y-auto py-2"
        aria-label="Rutas operativas"
      >
        <div className="sidebar-category">OPERACIONES NOC</div>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `sidebar-btn ${isActive ? "active" : ""}`
          }
          onClick={handleNavClick}
        >
          <i className="bi bi-grid-fill"></i>
          <span>Panel Principal</span>
        </NavLink>
        <NavLink
          to="/clientes"
          className={({ isActive }) =>
            `sidebar-btn ${isActive ? "active" : ""}`
          }
          onClick={handleNavClick}
        >
          <i className="bi bi-people-fill"></i>
          <span>Nómina Abonados</span>
        </NavLink>

        <div className="sidebar-category">GESTIÓN COMERCIAL</div>
        <NavLink
          to="/planes"
          className={({ isActive }) =>
            `sidebar-btn ${isActive ? "active" : ""}`
          }
          onClick={handleNavClick}
        >
          <i className="bi bi-hdd-stack-fill"></i>
          <span>Planes & Enlaces</span>
        </NavLink>
        <NavLink
          to="/soporte"
          className={({ isActive }) =>
            `sidebar-btn ${isActive ? "active" : ""}`
          }
          onClick={handleNavClick}
        >
          <i className="bi bi-headset"></i>
          <span>Mesa de Tickets</span>
        </NavLink>
      </nav>

      {/* Estado del OLT con indicador parpadeante */}
      <div className="p-3 border-top mt-auto bg-light bg-opacity-50">
        <div className="d-flex align-items-center gap-2">
          <span className="live-indicator"></span>
          <div className="small lh-sm">
            <span
              className="fw-semibold d-block text-dark"
              style={{ fontSize: "0.75rem" }}
            >
              OLT Principal Online
            </span>
            <span className="text-secondary" style={{ fontSize: "0.68rem" }}>
              Latencia: 8 ms
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
