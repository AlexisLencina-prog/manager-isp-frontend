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
      className={`app-sidebar bg-body-tertiary border-end text-body ${sidebarOpen ? "show" : "hidden"}`}
      aria-label="Menú lateral de navegación"
    >
      <div
        className="d-flex align-items-center justify-content-between px-3 border-bottom bg-body-tertiary"
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
              className="fw-bold text-body d-block"
              style={{ fontSize: "0.88rem" }}
            >
              ISP<span className="text-primary">MANAGER</span>
            </span>
            <span
              className="text-body-secondary d-block"
              style={{ fontSize: "0.62rem" }}
            >
              Operations NOC
            </span>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-sm btn-outline-secondary border-0 p-1 d-flex align-items-center justify-content-center"
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
        <div
          className="sidebar-category px-3 py-2 text-body-secondary fw-bold small"
          style={{ fontSize: "0.68rem", letterSpacing: "0.05em" }}
        >
          OPERACIONES NOC
        </div>

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `sidebar-btn d-flex align-items-center gap-2 px-3 py-2 text-decoration-none transition-all ${
              isActive
                ? "active bg-primary-subtle text-primary fw-bold border-start border-3 border-primary"
                : "text-body-secondary"
            }`
          }
          onClick={handleNavClick}
        >
          <i className="bi bi-grid-fill"></i>
          <span>Panel Principal</span>
        </NavLink>

        <NavLink
          to="/clientes"
          className={({ isActive }) =>
            `sidebar-btn d-flex align-items-center gap-2 px-3 py-2 text-decoration-none transition-all ${
              isActive
                ? "active bg-primary-subtle text-primary fw-bold border-start border-3 border-primary"
                : "text-body-secondary"
            }`
          }
          onClick={handleNavClick}
        >
          <i className="bi bi-people-fill"></i>
          <span>Nómina Abonados</span>
        </NavLink>

        <div
          className="sidebar-category px-3 py-2 mt-2 text-body-secondary fw-bold small"
          style={{ fontSize: "0.68rem", letterSpacing: "0.05em" }}
        >
          GESTIÓN COMERCIAL
        </div>

        <NavLink
          to="/planes"
          className={({ isActive }) =>
            `sidebar-btn d-flex align-items-center gap-2 px-3 py-2 text-decoration-none transition-all ${
              isActive
                ? "active bg-primary-subtle text-primary fw-bold border-start border-3 border-primary"
                : "text-body-secondary"
            }`
          }
          onClick={handleNavClick}
        >
          <i className="bi bi-hdd-stack-fill"></i>
          <span>Planes & Enlaces</span>
        </NavLink>

        <NavLink
          to="/soporte"
          className={({ isActive }) =>
            `sidebar-btn d-flex align-items-center gap-2 px-3 py-2 text-decoration-none transition-all ${
              isActive
                ? "active bg-primary-subtle text-primary fw-bold border-start border-3 border-primary"
                : "text-body-secondary"
            }`
          }
          onClick={handleNavClick}
        >
          <i className="bi bi-headset"></i>
          <span>Mesa de Tickets</span>
        </NavLink>
      </nav>

      <div className="p-3 border-top mt-auto bg-body-secondary">
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-success p-1 rounded-circle"></span>
          <div className="small lh-sm">
            <span
              className="fw-semibold d-block text-body"
              style={{ fontSize: "0.75rem" }}
            >
              OLT Principal Online
            </span>
            <span
              className="text-body-secondary"
              style={{ fontSize: "0.68rem" }}
            >
              Latencia: 8 ms
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
