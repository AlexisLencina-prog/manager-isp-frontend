import React, { useState } from 'react';
import KpiCard from './KpiCard';

const NODOS_INICIALES = [
  { id: 'NOD-01', zona: 'Troncal Centro', hardware: 'OLT Huawei 5608T', tec: 'Fibra GPON', latencia: '8 ms', estado: 'Operativo' },
  { id: 'NOD-02', zona: 'Anillo Norte', hardware: 'Mikrotik CCR2004', tec: 'Fibra GPON', latencia: '12 ms', estado: 'Operativo' },
  { id: 'NOD-03', zona: 'Subestación Sur', hardware: 'Ubiquiti AirFiber 5X', tec: 'Microondas', latencia: '24 ms', estado: 'Mantenimiento' },
];

const DashboardView = ({ trafico }) => {
  const [filtro, setFiltro] = useState('');

  const nodosFiltrados = NODOS_INICIALES.filter(nodo => 
    nodo.zona.toLowerCase().includes(filtro.toLowerCase()) ||
    nodo.tec.toLowerCase().includes(filtro.toLowerCase()) ||
    nodo.estado.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div>
      {/* Tarjetas de Métricas */}
      <section className="mb-4">
        <div className="row g-3">
          <KpiCard
            titulo="Abonados Conectados"
            valor="1,420"
            badgeTexto="+14.8% mes"
            badgeClase="text-bg-success-subtle text-success"
            icono="bi-people-fill"
            colorIcono="bg-primary-subtle text-primary"
            pathD="M0,20 Q15,18 30,10 T60,4"
            strokeColor="#0284c7"
          />
          <KpiCard
            titulo="Consumo de Tráfico"
            valor={`${trafico} Gbps`}
            badgeTexto="Enlace Simétrico"
            badgeClase="text-bg-info-subtle text-info-emphasis"
            icono="bi-activity"
            colorIcono="bg-info-subtle text-info-emphasis"
            pathD="M0,15 Q20,22 35,8 T60,5"
            strokeColor="#06b6d4"
          />
          <KpiCard
            titulo="Nodos GPON"
            valor="98.5%"
            badgeTexto="Red Estable"
            badgeClase="text-bg-success-subtle text-success"
            icono="bi-hdd-network-fill"
            colorIcono="bg-success-subtle text-success"
            pathD="M0,18 Q20,12 40,14 T60,6"
            strokeColor="#10b981"
          />
          <KpiCard
            titulo="Incidencias NOC"
            valor="4"
            badgeTexto="Guardia Activa"
            badgeClase="text-bg-warning-subtle text-warning-emphasis"
            icono="bi-exclamation-triangle"
            colorIcono="bg-warning-subtle text-warning-emphasis"
            pathD="M0,8 Q20,16 40,12 T60,18"
            strokeColor="#f59e0b"
          />
        </div>
      </section>

      {/* Gráfico Analítico de Curvas de Tráfico */}
      <section className="mb-4">
        <div className="saas-card p-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
            <div>
              <h2 className="h6 mb-1 fw-bold text-dark">Rendimiento y Saturación de Tráfico (Backbone)</h2>
              <p className="text-secondary small mb-0">Carga acumulada en upstream / downstream durante las últimas 24 horas</p>
            </div>
            <div className="d-flex align-items-center gap-3 small text-secondary">
              <span><i className="bi bi-circle-fill text-primary me-1" style={{ fontSize: '0.6rem' }}></i> Downstream</span>
              <span><i className="bi bi-circle-fill text-info me-1" style={{ fontSize: '0.6rem' }}></i> Upstream</span>
            </div>
          </div>

          <div className="w-100" style={{ height: '160px' }}>
            <svg viewBox="0 0 700 160" width="100%" height="100%" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradDown" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="30" x2="700" y2="30" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1.5" />
              <line x1="0" y1="80" x2="700" y2="80" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1.5" />
              <line x1="0" y1="120" x2="700" y2="120" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1.5" />
              <path d="M0,130 Q160,100 320,60 T700,20 L700,160 L0,160 Z" fill="url(#gradDown)" />
              <path d="M0,130 Q160,100 320,60 T700,20" fill="none" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
              <path d="M0,150 Q180,135 350,105 T700,65" fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="6 4" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </section>

      {/* Tabla con Búsqueda Reactiva */}
      <section>
        <div className="saas-card overflow-hidden">
          <div className="p-3 border-bottom d-flex flex-wrap justify-content-between align-items-center gap-2 bg-white">
            <div>
              <h2 className="h6 mb-0 fw-bold text-dark">Monitoreo de Infraestructura y Enlaces</h2>
              <p className="text-secondary small mb-0">Estado de latencia y disponibilidad por sector</p>
            </div>
            <div style={{ width: '260px' }}>
              <input
                type="search"
                className="form-control form-control-sm"
                placeholder="Filtrar zona o estado..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light small text-secondary">
                <tr>
                  <th scope="col" className="ps-3">ID NODO</th>
                  <th scope="col">ZONA / ENLACE</th>
                  <th scope="col">TECNOLOGÍA</th>
                  <th scope="col">LATENCIA</th>
                  <th scope="col" className="pe-3">ESTADO</th>
                </tr>
              </thead>
              <tbody className="small">
                {nodosFiltrados.map((nodo) => (
                  <tr key={nodo.id}>
                    <td className="ps-3 fw-semibold text-secondary">{nodo.id}</td>
                    <td>
                      <span className="fw-medium text-dark">{nodo.zona}</span>
                      <span className="text-muted small d-block">{nodo.hardware}</span>
                    </td>
                    <td><span className="badge text-bg-light border">{nodo.tec}</span></td>
                    <td><span className="text-success fw-semibold">{nodo.latencia}</span></td>
                    <td className="pe-3">
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
    </div>
  );
};

export default DashboardView;