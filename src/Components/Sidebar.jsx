import { NavLink } from "react-router-dom";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const handleNavClick = () => {
    if (window.innerWidth < 992) {
      setSidebarOpen(false);
    }
  };

  const navClass = ({ isActive }) =>
    `d-flex align-items-center justify-content-between px-3 py-2 mx-2 my-1 rounded-1 text-decoration-none small ${
      isActive
        ? "bg-primary bg-opacity-10 text-primary fw-bold border-start border-3 border-primary"
        : "text-body-secondary"
    }`;

  return (
    <aside
      className={`app-sidebar bg-body border-end d-flex flex-column ${
        sidebarOpen ? "show" : "hidden"
      }`}
      aria-label="Menú lateral de navegación"
    >
      <div
        className="d-flex align-items-center justify-content-between px-3 border-bottom"
        style={{ height: "54px" }}
      >
        <div className="d-flex align-items-center gap-2">
          <span className="pulse-dot"></span>
          <div className="lh-1">
            <span
              className="fw-bold text-body d-block"
              style={{ fontSize: "0.9rem" }}
            >
              ISP MANAGER
            </span>
            <span
              className="text-body-secondary font-monospace"
              style={{ fontSize: "0.65rem" }}
            >
              PANEL CENTRAL DE RED
            </span>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-sm btn-outline-secondary border-0 py-0 px-2"
          onClick={() => setSidebarOpen(false)}
          title="Ocultar menú lateral"
          aria-label="Ocultar menú lateral"
        >
          <i className="bi bi-chevron-left"></i>
        </button>
      </div>

      <nav
        className="flex-grow-1 overflow-y-auto py-2"
        aria-label="Módulos del sistema"
      >
        <div
          className="px-3 pt-2 pb-1 text-uppercase text-body-secondary fw-bold"
          style={{ fontSize: "0.68rem" }}
        >
          Operación y Monitoreo
        </div>

        <NavLink to="/" end className={navClass} onClick={handleNavClick}>
          <span className="d-flex align-items-center gap-2">
            <i className="bi bi-speedometer2"></i>
            <span>Monitor de Red</span>
          </span>
          <span className="badge bg-success-subtle text-success font-monospace">
            VIVO
          </span>
        </NavLink>

        <NavLink to="/clientes" className={navClass} onClick={handleNavClick}>
          <span className="d-flex align-items-center gap-2">
            <i className="bi bi-people"></i>
            <span>Padrón de Clientes</span>
          </span>
          <span className="badge bg-body-secondary text-body-secondary font-monospace">
            1.4k
          </span>
        </NavLink>

        <div
          className="px-3 pt-3 pb-1 text-uppercase text-body-secondary fw-bold"
          style={{ fontSize: "0.68rem" }}
        >
          Configuración y Soporte
        </div>

        <NavLink to="/planes" className={navClass} onClick={handleNavClick}>
          <span className="d-flex align-items-center gap-2">
            <i className="bi bi-sliders"></i>
            <span>Planes y Velocidades</span>
          </span>
        </NavLink>

        <NavLink to="/soporte" className={navClass} onClick={handleNavClick}>
          <span className="d-flex align-items-center gap-2">
            <i className="bi bi-wrench-adjustable"></i>
            <span>Mesa de Reclamos</span>
          </span>
          <span className="badge text-bg-warning font-monospace">03</span>
        </NavLink>
      </nav>

      <div className="px-3 py-2 border-top mt-auto bg-body-tertiary small">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className="text-body-secondary">Enlace Principal</span>
          <span className="badge bg-success-subtle text-success border border-success-subtle font-monospace">
            CONECTADO
          </span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-body-secondary">Nodos Activos</span>
          <span className="font-monospace fw-semibold text-body">2 de 3</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
