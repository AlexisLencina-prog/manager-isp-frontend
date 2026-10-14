import React from "react";
import { Link } from "react-router-dom";

const Topbar = ({
  onActualizarTrafico,
  setSidebarOpen,
  sidebarOpen,
  tema,
  setTema,
}) => {
  const toggleTema = () => {
    setTema((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <header
      className="bg-body-tertiary border-bottom sticky-top d-flex align-items-center justify-content-between px-3 px-lg-4"
      style={{ height: "60px", zIndex: 1020 }}
    >
      <div className="d-flex align-items-center gap-2">
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-center p-2"
          onClick={() => setSidebarOpen((prev) => !prev)}
          title="Alternar menú"
          aria-label="Alternar menú"
        >
          <i className="bi bi-list fs-5"></i>
        </button>

        <div
          className="input-group input-group-sm d-none d-md-flex"
          style={{ width: "240px" }}
        >
          <span className="input-group-text bg-body-secondary border-end-0 text-secondary">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="search"
            className="form-control bg-body-secondary border-start-0 text-body"
            placeholder="Buscar IP o abonado..."
          />
        </div>
      </div>

      <div className="d-flex align-items-center gap-2 gap-sm-3">
        <button
          type="button"
          className={`btn btn-sm ${tema === "dark" ? "btn-outline-warning" : "btn-outline-secondary"} d-flex align-items-center gap-1`}
          onClick={toggleTema}
          title="Cambiar Modo Claro/Oscuro"
        >
          <i
            className={`bi ${tema === "dark" ? "bi-sun-fill text-warning" : "bi-moon-stars-fill"}`}
          ></i>
          <span className="d-none d-md-inline small fw-semibold">
            {tema === "dark" ? "Modo Claro" : "Modo Oscuro"}
          </span>
        </button>

        <span className="badge bg-body-secondary border text-secondary fw-normal px-2 py-1 small d-none d-sm-inline-flex align-items-center gap-2">
          <span
            className="rounded-circle bg-success"
            style={{ width: "7px", height: "7px" }}
          ></span>{" "}
          Telemetría
        </span>

        <button
          type="button"
          className="btn btn-sm btn-outline-primary d-none d-md-inline-flex align-items-center gap-1"
          onClick={onActualizarTrafico}
        >
          <i className="bi bi-arrow-clockwise"></i> Actualizar
        </button>

        <Link
          to="/clientes"
          className="btn btn-sm btn-primary d-flex align-items-center gap-1 shadow-sm text-decoration-none"
        >
          <i className="bi bi-person-plus-fill"></i>
          <span className="d-none d-sm-inline">Nuevo</span>
        </Link>

        <div className="border-start ps-2 ps-sm-3 d-flex align-items-center gap-2">
          <div
            className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold"
            style={{ width: "32px", height: "32px", fontSize: "0.8rem" }}
          >
            <i className="bi bi-person-circle fs-5"></i>
          </div>
          <div className="d-none d-sm-block lh-1 text-start">
            <span className="fw-bold text-body small d-block">Grupo 16</span>
            <span className="text-secondary" style={{ fontSize: "0.68rem" }}>
              Guardia NOC
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
