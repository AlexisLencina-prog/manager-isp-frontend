import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Topbar = ({
  onActualizarTrafico,
  setSidebarOpen,
  sidebarOpen,
  tema,
  setTema,
}) => {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const navigate = useNavigate();

  const toggleTema = () => {
    setTema((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleBuscarSubmit = (e) => {
    e.preventDefault();
    const limpio = terminoBusqueda.trim();
    if (limpio) {
      navigate(`/clientes?q=${encodeURIComponent(limpio)}`);
    } else {
      navigate("/clientes");
    }
  };

  const esOscuro = tema === "dark";

  return (
    <header
      className="bg-body border-bottom sticky-top d-flex align-items-center justify-content-between px-3"
      style={{ height: "54px", zIndex: 1020 }}
    >
      <div className="d-flex align-items-center gap-2">
        {!sidebarOpen && (
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-center py-1 px-2"
            onClick={() => setSidebarOpen(true)}
            title="Mostrar menú lateral"
            aria-label="Mostrar menú lateral"
          >
            <i className="bi bi-list fs-5"></i>
          </button>
        )}

        <form
          onSubmit={handleBuscarSubmit}
          className="d-none d-md-flex"
          role="search"
        >
          <div
            className="input-group input-group-sm"
            style={{ width: "285px" }}
          >
            <span className="input-group-text bg-body-secondary border-end-0 text-body-secondary">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="search"
              className="form-control bg-body-secondary border-start-0 border-end-0 text-body"
              placeholder="Buscar cliente, DNI o IP..."
              aria-label="Buscar cliente, DNI o IP"
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
            />
            <span className="input-group-text bg-body-secondary border-start-0">
              <kbd
                className={`font-monospace ${
                  terminoBusqueda.trim()
                    ? "bg-primary text-white"
                    : "bg-body text-body-secondary border"
                }`}
                style={{ fontSize: "0.65rem", padding: "1px 5px" }}
              >
                Enter ↵
              </kbd>
            </span>
          </div>
        </form>
      </div>

      <div className="d-none d-xl-flex align-items-center gap-3 small font-monospace text-body-secondary">
        <span>
          Uso CPU: <strong className="text-body">14%</strong>
        </span>
        <span className="border-start ps-3">
          Memoria: <strong className="text-body">4.2 / 16 GB</strong>
        </span>
        <span className="border-start ps-3">
          Actividad: <strong className="text-success">142 días</strong>
        </span>
      </div>

      <div className="d-flex align-items-center gap-2">
        <button
          type="button"
          className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1"
          onClick={onActualizarTrafico}
          title="Tomar nueva muestra de tráfico"
        >
          <i className="bi bi-arrow-clockwise"></i>
          <span className="d-none d-sm-inline">Actualizar Tráfico</span>
        </button>

        <button
          type="button"
          onClick={toggleTema}
          className="btn btn-sm border d-flex align-items-center justify-content-between px-2 position-relative"
          style={{
            width: "62px",
            height: "30px",
            borderRadius: "30px",
            backgroundColor: esOscuro ? "#1e293b" : "#cbd5e1",
            transition: "background-color 0.3s ease",
          }}
          title="Cambiar entre modo claro y oscuro"
          aria-label="Cambiar entre modo claro y oscuro"
        >
          <i
            className="bi bi-sun-fill text-warning"
            style={{ fontSize: "0.75rem", opacity: esOscuro ? 0.5 : 0 }}
          ></i>
          <i
            className="bi bi-moon-stars-fill text-info"
            style={{ fontSize: "0.72rem", opacity: esOscuro ? 0 : 0.6 }}
          ></i>
          <span
            className="position-absolute rounded-circle shadow-sm d-flex align-items-center justify-content-center"
            style={{
              width: "22px",
              height: "22px",
              backgroundColor: "#ffffff",
              left: esOscuro ? "35px" : "4px",
              transition: "left 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <i
              className={`bi ${
                esOscuro
                  ? "bi-moon-stars-fill text-primary"
                  : "bi-sun-fill text-warning"
              }`}
              style={{ fontSize: "0.72rem" }}
            ></i>
          </span>
        </button>

        <div className="border-start ps-2 ms-1 d-none d-sm-flex align-items-center gap-2">
          <span className="pulse-dot"></span>
          <span className="font-monospace small fw-semibold text-body">
            Guardia NOC
          </span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
