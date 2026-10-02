import React, { useState } from 'react';

const PLANES_ISP = [
  {
    id: 'PLAN-50',
    nombre: 'Básico Simétrico',
    bajada: '50 Mbps',
    subida: '50 Mbps',
    burst: '75 Mbps',
    precioMensual: 12000,
    abonados: 142
  },
  {
    id: 'PLAN-150',
    nombre: 'Hogar Avanzado',
    bajada: '150 Mbps',
    subida: '150 Mbps',
    burst: '200 Mbps',
    precioMensual: 18000,
    abonados: 310
  },
  {
    id: 'PLAN-300',
    nombre: 'Pro Fibra NOC',
    bajada: '300 Mbps',
    subida: '300 Mbps',
    burst: '400 Mbps',
    precioMensual: 26000,
    abonados: 98
  }
];

export const PlanesPage = () => {
  const [esAnual, setEsAnual] = useState(false);

  return (
    <>
      <div className='row mb-4 align-items-center'>
        <div className='col-12 col-md-8'>
          <h2 className='fw-bold text-primary mb-1'>Gestión de Perfiles y Tarifas ISP</h2>
          <p className='text-muted mb-0'>
            Monitoreo de ancho de banda, burst/ráfaga y saturación por abonados.
          </p>
        </div>
        <div className='col-12 col-md-4 text-md-end mt-3 mt-md-0'>
          <div className='form-check form-switch d-inline-block text-start'>
            <input
              className='form-check-input'
              type='checkbox'
              role='switch'
              id='switchAnual'
              checked={esAnual}
              onChange={() => setEsAnual(!esAnual)}
            />
            <label className='form-check-label fw-semibold ms-2' htmlFor='switchAnual'>
              Pago Anual <span className='badge bg-success'>15% OFF</span>
            </label>
          </div>
        </div>
      </div>

      <div className='row g-4'>
        {PLANES_ISP.map((plan) => {
          const precioFinal = esAnual
            ? Math.round(plan.precioMensual * 12 * 0.85)
            : plan.precioMensual;

          return (
            <div className='col-12 col-md-4' key={plan.id}>
              <div className='card h-100 shadow-sm border-0'>
                <div className='card-header bg-primary text-white py-3'>
                  <span className='badge bg-light text-primary me-2'>{plan.id}</span>
                  <h5 className='card-title d-inline mb-0'>{plan.nombre}</h5>
                </div>
                <div className='card-body d-flex flex-column'>
                  <div className='mb-3'>
                    <h3 className='fw-bold text-dark d-inline'>
                      ${precioFinal.toLocaleString('es-AR')}
                    </h3>
                    <small className='text-muted'> / {esAnual ? 'año' : 'mes'}</small>
                  </div>
                  <ul className='list-group list-group-flush mb-4'>
                    <li className='list-group-item px-0'>
                      <strong>Velocidad:</strong> {plan.bajada} (Simétrica)
                    </li>
                    <li className='list-group-item px-0'>
                      <strong>Ráfaga (Burst):</strong> {plan.burst}
                    </li>
                    <li className='list-group-item px-0'>
                      <strong>Abonados activos:</strong>{' '}
                      <span className='badge bg-info text-dark'>{plan.abonados} colgados</span>
                    </li>
                  </ul>
                  <div className='mt-auto d-grid gap-2'>
                    <button type='button' className='btn btn-outline-primary btn-sm'>
                      Auditar Perfil
                    </button>
                    <button type='button' className='btn btn-secondary btn-sm'>
                      Ver Abonados
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