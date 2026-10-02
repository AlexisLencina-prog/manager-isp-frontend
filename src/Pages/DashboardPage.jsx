import React, { useState } from 'react';
import KpiCard from '../Components/KpiCard';

const NODOS_INICIALES = [
  { id: 'NOD-01', zona: 'Troncal Centro', hardware: 'OLT Huawei 5608T', tec: 'Fibra GPON', latencia: '8 ms', estado: 'Operativo', abonados: 620 },
  { id: 'NOD-02', zona: 'Anillo Norte', hardware: 'Mikrotik CCR2004', tec: 'Fibra GPON', latencia: '12 ms', estado: 'Operativo', abonados: 480 },
  { id: 'NOD-03', zona: 'Subestación Sur', hardware: 'Ubiquiti AirFiber 5X', tec: 'Microondas', latencia: '24 ms', estado: 'Mantenimiento', abonados: 320 },
];

const DashboardPage = ({ trafico }) => {
  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroTecnologia, setFiltroTecnologia] = useState('Todos');

  const nodosFiltrados = NODOS_INICIALES.filter((nodo) => {
    const coincideTexto = nodo.zona.toLowerCase().includes(filtroTexto.toLowerCase()) ||
                          nodo.hardware.toLowerCase().includes(filtroTexto.toLowerCase()) ||
                          nodo.estado.toLowerCase().includes(filtroTexto.toLowerCase());
    const coincideTec = filtroTecnologia === 'Todos' || nodo.tec === filtroTecnologia;
    return coincideTexto && coincideTec;
  });

  return (
    <>
      {/* Barra de Uptime y SLA General del ISP */}
      <section className='mb-3' aria-label='Estado general del servicio'>
        <div className='card border rounded-3 p-3 bg-white shadow-sm'>
          <div className='d-flex flex-wrap justify-content-between align-items-center gap-2'>
            <div className='d-flex align-items-center gap-2'>
              <span className='live-indicator'></span>
              <span className='fw-bold text-dark small'>Disponibilidad General de Enlaces (SLA):</span>
              <span className='badge text-bg-success-subtle text-success border border-success-subtle'>99.98% Operativo</span>
            </div>
            <div className='text-secondary small'>
              <i className='bi bi-shield-check text-primary me-1'></i> Monitoreo activo de 3 nodos troncales
            </div>
          </div>
        </div>
      </section>

      {/* Métricas NOC mediante KpiCard y paso de props */}
      <section className='mb-4' aria-label='Indicadores de telemetría'>
        <div className='row g-3'>
          <KpiCard
            titulo='Abonados Conectados'
            valor='1,420'
            badgeTexto='+14.8% mes'
            badgeClase='text-bg-success-subtle text-success'
            icono='bi-people-fill'
            colorIcono='bg-primary-subtle text-primary'
            pathD='M0,20 Q15,18 30,10 T60,4'
            strokeColor='#0284c7'
          />
          <KpiCard
            titulo='Consumo de Tráfico'
            valor={`${trafico} Gbps`}
            badgeTexto='Enlace Simétrico'
            badgeClase='text-bg-info-subtle text-info-emphasis'
            icono='bi-activity'
            colorIcono='bg-info-subtle text-info-emphasis'
            pathD='M0,15 Q20,22 35,8 T60,5'
            strokeColor='#06b6d4'
          />
          <KpiCard
            titulo='Nodos GPON'
            valor='98.5%'
            badgeTexto='Red Estable'
            badgeClase='text-bg-success-subtle text-success'
            icono='bi-hdd-network-fill'
            colorIcono='bg-success-subtle text-success'
            pathD='M0,18 Q20,12 40,14 T60,6'
            strokeColor='#10b981'
          />
          <KpiCard
            titulo='Incidencias NOC'
            valor='4'
            badgeTexto='Guardia Activa'
            badgeClase='text-bg-warning-subtle text-warning-emphasis'
            icono='bi-exclamation-triangle'
            colorIcono='bg-warning-subtle text-warning-emphasis'
            pathD='M0,8 Q20,16 40,12 T60,18'
            strokeColor='#f59e0b'
          />
        </div>
      </section>

      {/* Gráfico de Carga de Tráfico (Backbone) */}
      <section className='mb-4' aria-label='Saturación de enlaces'>
        <div className='card border rounded-3 p-4 bg-white shadow-sm'>
          <div className='d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2'>
            <div>
              <h1 className='h6 mb-1 fw-bold text-dark'>Rendimiento y Saturación de Tráfico (Backbone)</h1>
              <p className='text-secondary small mb-0'>Consumo en tiempo real durante las últimas 24 horas</p>
            </div>
            <div className='d-flex align-items-center gap-3 small text-secondary'>
              <span><i className='bi bi-circle-fill text-primary me-1' style={{ fontSize: '0.6rem' }}></i> Downstream</span>
              <span><i className='bi bi-circle-fill text-info me-1' style={{ fontSize: '0.6rem' }}></i> Upstream</span>
            </div>
          </div>

          <div className='w-100' style={{ height: '150px' }}>
            <svg viewBox='0 0 700 150' width='100%' height='100%' preserveAspectRatio='none'>
              <defs>
                <linearGradient id='gradDown' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='0%' stopColor='#0284c7' stopOpacity='0.25' />
                  <stop offset='100%' stopColor='#0284c7' stopOpacity='0.0' />
                </linearGradient>
              </defs>
              <line x1='0' y1='30' x2='700' y2='30' stroke='#f1f5f9' strokeDasharray='4 4' strokeWidth='1.5' />
              <line x1='0' y1='75' x2='700' y2='75' stroke='#f1f5f9' strokeDasharray='4 4' strokeWidth='1.5' />
              <line x1='0' y1='115' x2='700' y2='115' stroke='#f1f5f9' strokeDasharray='4 4' strokeWidth='1.5' />
              <path d='M0,120 Q160,95 320,55 T700,20 L700,150 L0,150 Z' fill='url(#gradDown)' />
              <path d='M0,120 Q160,95 320,55 T700,20' fill='none' stroke='#0284c7' strokeWidth='3' strokeLinecap='round' />
              <path d='M0,140 Q180,125 350,95 T700,60' fill='none' stroke='#06b6d4' strokeWidth='2.5' strokeDasharray='6 4' strokeLinecap='round' />
            </svg>
          </div>
        </div>
      </section>

      {/* Tabla con Filtro Rápido por Tecnología */}
      <section aria-label='Infraestructura de nodos'>
        <div className='card border rounded-3 shadow-sm overflow-hidden bg-white'>
          <div className='p-3 border-bottom d-flex flex-wrap justify-content-between align-items-center gap-3'>
            <div>
              <h2 className='h6 mb-0 fw-bold text-dark'>Monitoreo de Infraestructura y Enlaces</h2>
              <small className='text-secondary'>Nodos de conmutación y distribución zonal</small>
            </div>

            <div className='d-flex flex-wrap align-items-center gap-2'>
              {/* Botones de filtro rápido nativos de Bootstrap */}
              <div className='btn-group btn-group-sm' role='group' aria-label='Filtro de tecnología'>
                {['Todos', 'Fibra GPON', 'Microondas'].map((tec) => (
                  <button
                    key={tec}
                    type='button'
                    className={`btn ${filtroTecnologia === tec ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => setFiltroTecnologia(tec)}
                  >
                    {tec}
                  </button>
                ))}
              </div>

              <input
                type='search'
                className='form-control form-control-sm'
                style={{ width: '200px' }}
                placeholder='Buscar nodo o zona...'
                value={filtroTexto}
                onChange={(e) => setFiltroTexto(e.target.value)}
              />
            </div>
          </div>

          <div className='table-responsive'>
            <table className='table table-hover align-middle mb-0'>
              <thead className='table-light small text-secondary'>
                <tr>
                  <th scope='col' className='ps-3'>ID NODO</th>
                  <th scope='col'>ZONA / ENLACE</th>
                  <th scope='col'>TECNOLOGÍA</th>
                  <th scope='col'>ABONADOS</th>
                  <th scope='col'>LATENCIA</th>
                  <th scope='col' className='pe-3'>ESTADO</th>
                </tr>
              </thead>
              <tbody className='small'>
                {nodosFiltrados.map((nodo) => (
                  <tr key={nodo.id}>
                    <td className='ps-3 fw-semibold text-secondary'>{nodo.id}</td>
                    <td>
                      <span className='fw-medium text-dark'>{nodo.zona}</span>
                      <span className='text-muted small d-block'>{nodo.hardware}</span>
                    </td>
                    <td><span className='badge text-bg-light border'>{nodo.tec}</span></td>
                    <td><span className='fw-semibold text-dark'>{nodo.abonados}</span> clientes</td>
                    <td><span className='text-success fw-semibold'>{nodo.latencia}</span></td>
                    <td className='pe-3'>
                      <span className={`badge ${nodo.estado === 'Operativo' ? 'text-bg-success-subtle text-success border border-success-subtle' : 'text-bg-warning-subtle text-warning-emphasis border border-warning-subtle'} px-2 py-1`}>
                        {nodo.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardPage;