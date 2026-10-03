import React, { useState } from 'react';

const PLANES = [
  {
    id: 'PLAN-BASICO',
    nombre: 'PLAN BÁSICO',
    velocidad: '50M',
    unidad: 'MBPS',
    precioMensual: 8000,
    destacado: false,
    colorGrafico: '#0dcaf0', // Color celeste / info
    porcentajeGrafico: 35,   // Porcentaje visual del anillo
    caracteristicas: [
      '50 Mbps de velocidad',
      'Ideal para 1-2 dispositivos',
      'Soporte técnico estándar'
    ]
  },
  {
    id: 'PLAN-HOGAR',
    nombre: 'PLAN HOGAR',
    velocidad: '150M',
    unidad: 'MBPS',
    precioMensual: 12000,
    destacado: false,
    colorGrafico: '#0d6efd', // Color azul principal
    porcentajeGrafico: 65,   // Porcentaje visual del anillo
    caracteristicas: [
      '150 Mbps de velocidad',
      'Ideal para 3-5 dispositivos',
      'Soporte técnico prioritario'
    ]
  },
  {
    id: 'PLAN-PREMIUM',
    nombre: 'PLAN PREMIUM',
    velocidad: '300M',
    unidad: 'MBPS',
    precioMensual: 18000,
    destacado: true,
    badgeText: 'RECOMENDADO',
    colorGrafico: '#6f42c1', // Color violeta / premium
    porcentajeGrafico: 100,  // Círculo completo
    caracteristicas: [
      '300 Mbps de velocidad',
      'Ideal para hogares con alto consumo',
      'Soporte técnico 24/7'
    ]
  }
];

export const PlanesPage = () => {
  const [esAnual, setEsAnual] = useState(false);
  const [planSeleccionado, setPlanSeleccionado] = useState('PLAN-BASICO');

  return (
    <>
      {/* Encabezado y Toggle Mensual/Anual */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1">Catálogo Comercial de Planes</h2>
          <p className="text-secondary small mb-0">
            Conectividad por fibra óptica para abonados residenciales
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className={`small fw-semibold ${!esAnual ? 'text-dark' : 'text-secondary'}`}>
            Mensual
          </span>
          <div className="form-check form-switch mb-0 fs-5">
            <input
              className="form-check-input style-pointer"
              type="checkbox"
              role="switch"
              checked={esAnual}
              onChange={() => setEsAnual(!esAnual)}
            />
          </div>
          <span className={`small fw-semibold ${esAnual ? 'text-dark' : 'text-secondary'}`}>
            Anual
          </span>
          <span className="badge bg-success small ms-1">-15%</span>
        </div>
      </div>

      {/* Tarjetas de Planes */}
      <div className="row g-4">
        {PLANES.map((plan) => {
          const isSelected = planSeleccionado === plan.id;

          const precioMensualConDescuento = esAnual
            ? Math.round(plan.precioMensual * 0.85)
            : plan.precioMensual;

          const precioTotalAnual = precioMensualConDescuento * 12;

          // Cálculo del borde pintado para el SVG circular
          const dashArray = `${plan.porcentajeGrafico} ${100 - plan.porcentajeGrafico}`;

          return (
            <div className="col-12 col-md-4" key={plan.id}>
              <div
                className={`card h-100 shadow-sm rounded-3 overflow-hidden ${
                  isSelected ? 'border-2 border-primary' : 'border-0'
                }`}
              >
                {/* Encabezado azul oscuro */}
                <div
                  className="d-flex justify-content-between align-items-center py-3 px-4"
                  style={{ backgroundColor: '#005691', color: '#ffffff' }}
                >
                  <span className="fw-bold small tracking-wider">{plan.nombre}</span>
                  {plan.destacado && (
                    <span className="badge bg-warning text-dark fw-bold px-2 py-1">
                      {plan.badgeText}
                    </span>
                  )}
                </div>

                <div className="card-body d-flex flex-column align-items-center text-center p-4">
                  {/* Gráfico SVG en dona pintado con el color de cada plan */}
                  <div className="my-3 position-relative d-flex align-items-center justify-content-center">
                    <svg width="140" height="140" viewBox="0 0 42 42">
                      {/* Fondo gris del anillo */}
                      <circle
                        cx="21"
                        cy="21"
                        r="15.915"
                        fill="transparent"
                        stroke="#e9ecef"
                        strokeWidth="4"
                      />
                      {/* Anillo pintado con color y porcentaje correspondiente */}
                      <circle
                        cx="21"
                        cy="21"
                        r="15.915"
                        fill="transparent"
                        stroke={plan.colorGrafico}
                        strokeWidth="4"
                        strokeDasharray={dashArray}
                        strokeDashoffset="25"
                      />
                    </svg>

                    {/* Texto dentro del gráfico circular */}
                    <div className="position-absolute d-flex flex-column align-items-center">
                      <span className="h3 fw-bold text-dark mb-0">{plan.velocidad}</span>
                      <small className="text-muted fw-semibold" style={{ fontSize: '0.75rem' }}>
                        {plan.unidad}
                      </small>
                    </div>
                  </div>

                  {/* Precios y desglose anual */}
                  <div className="my-2">
                    <div>
                      <span className="display-6 fw-bold text-dark">
                        ${precioMensualConDescuento.toLocaleString('es-AR')}
                      </span>
                      <span className="text-muted fs-6">/mes</span>
                    </div>

                    {esAnual && (
                      <div className="text-success small fw-semibold mt-1">
                        Facturación anual: ${precioTotalAnual.toLocaleString('es-AR')}/año
                      </div>
                    )}
                  </div>

                  {/* Lista de características */}
                  <ul className="list-unstyled w-100 text-start my-3 pt-3 border-top">
                    {plan.caracteristicas.map((item, idx) => (
                      <li key={idx} className="mb-2 text-secondary small d-flex align-items-center">
                        <i className="bi bi-check2 text-success me-2 fw-bold fs-6"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Botón de Selección */}
                  <div className="mt-auto w-100 pt-3">
                    <button
                      type="button"
                      onClick={() => setPlanSeleccionado(plan.id)}
                      className={`btn w-100 py-2 small fw-semibold rounded-pill ${
                        isSelected ? 'btn-primary' : 'btn-outline-primary'
                      }`}
                    >
                      {isSelected ? 'Plan seleccionado' : 'Elegir Plan'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PlanesPage;