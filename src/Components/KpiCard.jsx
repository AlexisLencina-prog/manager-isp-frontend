import React from 'react';

const KpiCard = ({ titulo, valor, badgeTexto, badgeClase, icono, colorIcono, pathD, strokeColor }) => {
  return (
    <div className="col-12 col-sm-6 col-xl-3">
      <div className="card-kpi-pro h-100">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-secondary small fw-semibold">{titulo}</span>
          <div className={`kpi-icon-box ${colorIcono}`}>
            <i className={`bi ${icono}`}></i>
          </div>
        </div>
        <div className="d-flex align-items-baseline justify-content-between">
          <div>
            <h3 className="fw-bold mb-0 text-dark">{valor}</h3>
            <span className={`badge ${badgeClase} small mt-1`}>
              {badgeTexto}
            </span>
          </div>
          <svg viewBox="0 0 60 25" width="60" height="25">
            <path d={pathD} fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default KpiCard;