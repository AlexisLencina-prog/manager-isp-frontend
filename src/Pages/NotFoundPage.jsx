import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="d-flex flex-column align-items-center justify-content-center py-5 text-center fade-in">
      <div
        className="bg-body border rounded-1 p-4 p-md-5"
        style={{ maxWidth: "460px" }}
      >
        <span className="font-monospace text-primary fw-bold small d-block mb-2">
          HTTP 404 | RUTA NO ENCONTRADA
        </span>
        <h1 className="h4 fw-bold text-body mb-2">
          Módulo no disponible en el panel
        </h1>
        <p className="text-body-secondary small mb-4">
          La dirección solicitada no corresponde a ninguna sección activa del
          sistema de gestión NOC.
        </p>
        <Link to="/" className="btn btn-sm btn-primary px-4 fw-semibold">
          Volver al Monitor de Red
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
