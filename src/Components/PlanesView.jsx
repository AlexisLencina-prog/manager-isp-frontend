import React, { useState, useEffect } from 'react';

const VELOCIDAD_MAX = 300;
const RADIO = 52;
const CIRCUNFERENCIA = 2 * Math.PI * RADIO;
const DESCUENTO_ANUAL = 0.15;

const PLANES = [
  {
    id: 'basico',
    nombre: 'Básico',
    velocidad: 50,
    mensual: 8000,
    cabecera: 'bg-gradient-primary',
    destacado: false,
    beneficios: ['50 Mbps de velocidad', 'Ideal para 1-2 dispositivos', 'Soporte técnico estándar'],
  },
  {
    id: 'hogar',
    nombre: 'Hogar',
    velocidad: 150,
    mensual: 12000,
    cabecera: 'bg-gradient-accent',
    destacado: true,
    beneficios: ['150 Mbps de velocidad', 'Ideal para 3-5 dispositivos', 'Soporte técnico prioritario'],
  },
  {
    id: 'premium',
    nombre: 'Premium',
    velocidad: 300,
    mensual: 18000,
    cabecera: 'bg-gradient-primary',
    destacado: false,
    beneficios: ['300 Mbps de velocidad', 'Ideal para hogares con alto consumo', 'Soporte técnico 24/7'],
  },
];

const formatear = (numero) => numero.toLocaleString('es-AR');

const PlanesView = () => {
  const [anual, setAnual] = useState(false);
  const [planElegido, setPlanElegido] = useState(null);
  const [alerta, setAlerta] = useState(null);

  // Temporizador para auto-desvanecer la alerta
  useEffect(() => {
    if (alerta) {
      const timer = setTimeout(() => setAlerta(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [alerta]);

  const calcularPrecio = (plan) =>
    anual ? Math.round(plan.mensual * (1 - DESCUENTO_ANUAL)) : plan.mensual;

  const handleElegir = (plan) => {
    setPlanElegido(plan.id);
    setAlerta({
      tipo: 'info',
      mensaje: `Seleccionaste el Plan ${plan.nombre} con facturación ${anual ? 'anual' : 'mensual'}. Un asesor se pondrá en contacto para confirmar la instalación.`,
    });
  };

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h2 className="h5 fw-bold mb-1 text-dark">Catálogo Comercial de Planes</h2>
          <p className="text-secondary small mb-0">Conectividad por fibra óptica para abonados residenciales</p>
        </div>

        {/* Switch de facturación */}
        <div className="d-flex align-items-center gap-2">
          <span className={`small fw-semibold ${!anual ? 'text-dark' : 'text-secondary'}`}>Mensual</span>
          <div className="form-check form-switch mb-0">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="switch-facturacion"
              checked={anual}
              onChange={(e) => setAnual(e.target.checked)}
            />
          </div>
          <span className={`small fw-semibold ${anual ? 'text-dark' : 'text-secondary'}`}>
            Anual <span className="badge text-bg-success">-15%</span>
          </span>
        </div>
      </div>

      {alerta && (
          <div className={`alert alert-${alerta.tipo} alerta-flotante small py-2`} role="alert">
          <i className="bi bi-info-circle-fill me-2"></i>
          {alerta.mensaje}
        </div>
      )}

      <div className="row g-4">
        {PLANES.map((plan) => {
          const elegido = planElegido === plan.id;
          const precio = calcularPrecio(plan);
          const desplazamiento = CIRCUNFERENCIA * (1 - plan.velocidad / VELOCIDAD_MAX);

          return (
            <div className="col-12 col-md-6 col-xl-4" key={plan.id}>
              <div className={`plan-panel h-100 d-flex flex-column ${elegido ? 'plan-selected' : ''}`}>
                {/* Cabecera técnica */}
                <div className={`${plan.cabecera} text-white px-3 py-2 d-flex justify-content-between align-items-center`}>
                  <span className="small fw-bold text-uppercase" style={{ letterSpacing: '2px' }}>
                    Plan {plan.nombre}
                  </span>
                  {plan.destacado && (
                    <span className="badge text-bg-warning text-dark">RECOMENDADO</span>
                  )}
                </div>

                <div className="p-3 p-lg-4 d-flex flex-column flex-grow-1">
                  {/* Velocímetro circular */}
                  <div className="gauge-container mb-3">
                    <svg className="gauge-svg" viewBox="0 0 120 120">
                      <circle className="gauge-bg" cx="60" cy="60" r={RADIO} />
                      <circle
                        className="gauge-fill"
                        cx="60"
                        cy="60"
                        r={RADIO}
                        strokeDasharray={CIRCUNFERENCIA}
                        strokeDashoffset={desplazamiento}
                      />
                    </svg>
                    <div className="gauge-label">
                      <span className="gauge-value">{plan.velocidad}M</span>
                      <span className="gauge-unit">Mbps</span>
                    </div>
                  </div>

                  {/* Precio */}
                  <div className="text-center mb-3">
                    <span className="fs-2 fw-bold text-dark">${formatear(precio)}</span>
                    <span className="text-secondary small"> /mes</span>
                    {anual && (
                      <div className="small text-success fw-semibold">
                        Facturación anual: ${formatear(precio * 12)}/año
                      </div>
                    )}
                  </div>

                  {/* Beneficios */}
                  <ul className="list-unstyled small mb-4">
                    {plan.beneficios.map((beneficio) => (
                      <li key={beneficio} className="py-2 border-top">
                        <i className="bi bi-check2 text-success me-2"></i>
                        {beneficio}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className={`btn rounded-pill w-100 fw-semibold mt-auto ${elegido ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => handleElegir(plan)}
                  >
                    {elegido ? 'Plan seleccionado' : 'Elegir Plan'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlanesView;