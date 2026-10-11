import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="d-flex flex-column align-items-center justify-content-center py-5 text-center bg-body text-body min-vh-75">
      <div
        className="bg-primary-subtle text-primary p-3 rounded-circle mb-3 d-flex align-items-center justify-content-center"
        style={{ width: "80px", height: "80px" }}
      >
        <i className="bi bi-hdd-network-fill fs-1"></i>
      </div>

      <h1 className="display-6 fw-bold text-body mb-2">
        404 - Segmento No Encontrado
      </h1>

      <p
        className="text-body-secondary small mb-4"
        style={{ maxWidth: "420px" }}
      >
        El recurso o ruta de red solicitada no se encuentra disponible o fue
        reconfigurada en la tabla de enrutamiento del NOC.
      </p>

      <Link
        to="/"
        className="btn btn-sm btn-primary px-3 fw-semibold shadow-sm"
      >
        <i className="bi bi-arrow-left me-1"></i> Volver al Panel Principal
      </Link>
    </section>
  );
};

export default NotFoundPage;
