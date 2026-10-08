import React, { useState, useEffect } from 'react';

const PLANES = [
  {
    id: 'PLAN-BASICO',
    nombre: 'PLAN BÁSICO',
    velocidad: '50M',
    unidad: 'MBPS',
    precioMensual: 8000,
    destacado: false,
    colorGrafico: '#0dcaf0',
    porcentajeGrafico: 35,
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
    colorGrafico: '#0d6efd',
    porcentajeGrafico: 65,
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
    colorGrafico: '#6f42c1',
    porcentajeGrafico: 100,
    caracteristicas: [
      '300 Mbps de velocidad',
      'Ideal para hogares con alto consumo',
      'Soporte técnico 24/7'
    ]
  }
];

export const PlanesPage = () => {
  // --- USESTATE ---
  const [esAnual, setEsAnual] = useState(() => {
    // Recupera la preferencia guardada en el navegador si existe
    const guardado = localStorage.getItem('facturacion_anual');
    return guardado ? JSON.parse(guardado) : false;
  });

  const [planSeleccionado, setPlanSeleccionado] = useState('PLAN-BASICO');
  const [mensajeNotificacion, setMensajeNotificacion] = useState('');

  // --- USEEFFECT 1: Sincronización con localStorage al cambiar esAnual ---
  useEffect(() => {
    localStorage.setItem('facturacion_anual', JSON.stringify(esAnual));
  }, [esAnual]); // Se ejecuta únicamente cuando la dependencia 'esAnual' cambia

  // --- USEEFFECT 2: Alerta/Efecto al cambiar de plan o modalidad ---
  useEffect(() => {
    const planObj = PLANES.find((p) => p.id === planSeleccionado);
    if (planObj) {
      setMensajeNotificacion(
        `Has seleccionado ${planObj.nombre} con facturación ${esAnual ? 'Anual (-15%)' : 'Mensual'}.`
      );

      // Ocultar la notificación automáticamente a los 4 segundos (Cleanup de timer)
      const timer = setTimeout(() => {
        setMensajeNotificacion('');
      }, 4000);

      return () => clearTimeout(timer); // Cleanup function para evitar fugas
    }
  }, [planSeleccionado, esAnual]); // Dependencias: cambia si el usuario elige otro plan o cambia la facturación

  return (
    <>
      {/* Alerta dinámica generada por useEffect */}
      {mensajeNotificacion && (
        <div className="alert alert-info border-0 shadow-sm d-flex align-items-center mb-4 rounded-3 fade show">
          <i className="bi bi-info-circle-fill fs-5 me-2 text-info"></i>
          <div>{mensajeNotificacion}</div>
        </div>
      )}

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
          const dashArray = `${plan.porcentajeGrafico} ${100 - plan.porcentajeGrafico}`;

          return (
            <div className="col-12 col-md-4" key={plan.id}>
              <div
                className={`card h-100 shadow-sm rounded-3 overflow-hidden ${
                  isSelected ? 'border-2 border-primary' : 'border-0'
                }`}
              >
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
                  <div className="my-3 position-relative d-flex align-items-center justify-content-center">
                    <svg width="140" height="140" viewBox="0 0 42 42">
                      <circle
                        cx="21"
                        cy="21"
                        r="15.915"
                        fill="transparent"
                        stroke="#e9ecef"
                        strokeWidth="4"
                      />
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

                    <div className="position-absolute d-flex flex-column align-items-center">
                      <span className="h3 fw-bold text-dark mb-0">{plan.velocidad}</span>
                      <small className="text-muted fw-semibold" style={{ fontSize: '0.75rem' }}>
                        {plan.unidad}
                      </small>
                    </div>
                  </div>

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

                  <ul className="list-unstyled w-100 text-start my-3 pt-3 border-top">
                    {plan.caracteristicas.map((item, idx) => (
                      <li key={idx} className="mb-2 text-secondary small d-flex align-items-center">
                        <i className="bi bi-check2 text-success me-2 fw-bold fs-6"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

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