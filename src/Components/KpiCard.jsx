import React from "react";

const KpiCard = ({
  titulo,
  valor,
  badgeTexto,
  badgeClase,
  icono,
  colorIcono,
  subtitulo = "Operación normal",
}) => {
  return (
    <div className="col-12 col-sm-6 col-xl-3">
      <div className="card border rounded-3 p-3 bg-white shadow-sm h-100">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-secondary small fw-semibold">{titulo}</span>
          <div
            className={`rounded-2 p-2 d-flex align-items-center justify-content-center ${colorIcono}`}
            style={{ width: "32px", height: "32px" }}
          >
            <i className={`bi ${icono} fs-6`}></i>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-baseline my-1">
          <h2 className="h4 fw-bold mb-0 text-dark">{valor}</h2>
          <span className={`badge ${badgeClase} small px-2 py-1`}>
            {badgeTexto}
          </span>
        </div>

        <div className="text-secondary mt-2" style={{ fontSize: "0.72rem" }}>
          <i className="bi bi-check2-circle text-success me-1"></i>
          {subtitulo}
        </div>
      </div>
    </div>
  );
};

export default KpiCard;
