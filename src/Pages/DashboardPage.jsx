import React, { useState, useEffect } from 'react';
import KpiCard from '../Components/KpiCard';

const NODOS_RED = [
  {
    id: 'NOD-01',
    nombre: 'Troncal Centro',
    zona: 'Área Central / Plaza Principal',
    coords: { x: 320, y: 160 },
    radio: 90,
    tecnologia: 'OLT Huawei GPON 5608T',
    latencia: 8,
    abonados: 620,
    capacidad: 85,
    potenciaOptica: '-19.4 dBm',
    estado: 'Operativo',
    color: '#0d6efd'
  },
  {
    id: 'NOD-02',
    nombre: 'Anillo Norte',
    zona: 'Sector Norte / Av. Principal',
    coords: { x: 470, y: 95 },
    radio: 75,
    tecnologia: 'Mikrotik CCR2004 GPON',
    latencia: 11,
    abonados: 480,
    capacidad: 68,
    potenciaOptica: '-21.2 dBm',
    estado: 'Operativo',
    color: '#0dcaf0'
  },
  {
    id: 'NOD-03',
    nombre: 'Subestación Sur',
    zona: 'Parque Sur / Enlace Microondas',
    coords: { x: 175, y: 225 },
    radio: 65,
    tecnologia: 'Ubiquiti AirFiber 5X',
    latencia: 24,
    abonados: 320,
    capacidad: 92,
    potenciaOptica: '-24.8 dBm',
    estado: 'Mantenimiento',
    color: '#ffc107'
  }
];

const DashboardPage = () => {
  const [nodos, setNodos] = useState(NODOS_RED);
  const [nodoActivo, setNodoActivo] = useState(NODOS_RED[0]);
  const [traficoVivo, setTraficoVivo] = useState(3.8);
  const [filtroTexto, setFiltroTexto] = useState('');

  useEffect(() => {
    const intervalo = setInterval(() => {
      const variacionTrafico = parseFloat((Math.random() * (4.6 - 2.9) + 2.9).toFixed(1));
      setTraficoVivo(variacionTrafico);

      setNodos((prevNodos) =>
        prevNodos.map((nodo) => {
          const delta = Math.floor(Math.random() * 5) - 2;
          const nuevaLatencia = Math.max(5, nodo.latencia + delta);
          return { ...nodo, latencia: nuevaLatencia };
        })
      );
    }, 8000);

    return () => clearInterval(intervalo);
  }, []);

  const nodosFiltrados = nodos.filter((n) =>
    n.nombre.toLowerCase().includes(filtroTexto.toLowerCase()) ||
    n.zona.toLowerCase().includes(filtroTexto.toLowerCase()) ||
    n.estado.toLowerCase().includes(filtroTexto.toLowerCase())
  );

  return (
    <>
      <section className='mb-3' aria-label='Estado general'>
        <div className='card border rounded-3 p-3 bg-white shadow-sm'>
          <div className='d-flex flex-wrap justify-content-between align-items-center gap-2'>
            <div className='d-flex align-items-center gap-2'>
              <span className='badge bg-success-subtle text-success border border-success-subtle px-2 py-1'>
                ● Troncal GPON Online
              </span>
              <span className='fw-bold text-dark small'>Disponibilidad de Red: 99.98% SLA</span>
            </div>
            <div className='text-secondary small'>
              Sincronización NOC en vivo cada 8s
            </div>
          </div>
        </div>
      </section>

      <section className='mb-4' aria-label='Metricas NOC'>
        <div className='row g-3'>
          <KpiCard
            titulo='Abonados Conectados'
            valor='1,420'
            badgeTexto='+14.8% mes'
            badgeClase='text-bg-success-subtle text-success'
            icono='bi-people-fill'
            colorIcono='bg-primary-subtle text-primary'
            pathD='M0,20 Q15,18 30,10 T60,4'
            strokeColor='#0d6efd'
          />
          <KpiCard
            titulo='Tráfico Backbone'
            valor={`${traficoVivo} Gbps`}
            badgeTexto='Simétrico'
            badgeClase='text-bg-info-subtle text-info-emphasis'
            icono='bi-activity'
            colorIcono='bg-info-subtle text-info-emphasis'
            pathD='M0,15 Q20,22 35,8 T60,5'
            strokeColor='#0dcaf0'
          />
          <KpiCard
            titulo='Nodos GPON'
            valor='98.5%'
            badgeTexto='Operativo'
            badgeClase='text-bg-success-subtle text-success'
            icono='bi-hdd-network-fill'
            colorIcono='bg-success-subtle text-success'
            pathD='M0,18 Q20,12 40,14 T60,6'
            strokeColor='#198754'
          />
          <KpiCard
            titulo='Alertas NOC'
            valor='3'
            badgeTexto='Guardia activa'
            badgeClase='text-bg-warning-subtle text-warning-emphasis'
            icono='bi-exclamation-triangle'
            colorIcono='bg-warning-subtle text-warning-emphasis'
            pathD='M0,8 Q20,16 40,12 T60,18'
            strokeColor='#ffc107'
          />
        </div>
      </section>

      <section className='mb-4' aria-label='Mapa cartografico de cobertura'>
        <div className='card border rounded-3 bg-white shadow-sm overflow-hidden'>
          <div className='p-3 border-bottom d-flex justify-content-between align-items-center flex-wrap gap-2'>
            <div>
              <h2 className='h6 fw-bold mb-0 text-dark'>Mapa de Distribución y Celdas de Cobertura</h2>
              <small className='text-secondary'>Topología georreferenciada de tendido de fibra y radioenlaces</small>
            </div>
            <div className='d-flex align-items-center gap-2'>
              <span className='badge bg-light text-secondary border small'>
                <i className='bi bi-geo-alt-fill text-danger me-1'></i> 3 Sectores Activos
              </span>
            </div>
          </div>

          <div className='row g-0'>
            {/* Lienzo cartográfico urbano */}
            <div className='col-12 col-lg-8 border-end bg-light p-3 position-relative'>
              <div className='w-100 border rounded-3 shadow-sm overflow-hidden' style={{ height: '360px', backgroundColor: '#e9eef2' }}>
                <svg viewBox='0 0 650 340' className='w-100 h-100'>
                  <defs>
                    <linearGradient id='gradRio' x1='0' y1='0' x2='1' y2='1'>
                      <stop offset='0%' stopColor='#bae6fd' />
                      <stop offset='100%' stopColor='#7dd3fc' />
                    </linearGradient>
                  </defs>

                  {/* Manzanas y trama urbana */}
                  <g fill='#f8fafc' stroke='#e2e8f0' strokeWidth='1'>
                    <rect x='40' y='30' width='80' height='55' rx='3' />
                    <rect x='135' y='30' width='95' height='55' rx='3' />
                    <rect x='245' y='30' width='110' height='55' rx='3' />
                    <rect x='370' y='30' width='120' height='55' rx='3' />
                    <rect x='505' y='30' width='100' height='55' rx='3' />

                    <rect x='40' y='100' width='115' height='70' rx='3' />
                    <rect x='170' y='100' width='120' height='70' rx='3' />
                    <rect x='305' y='100' width='140' height='70' rx='3' />
                    <rect x='460' y='100' width='145' height='70' rx='3' />

                    <rect x='40' y='185' width='100' height='60' rx='3' />
                    <rect x='155' y='185' width='110' height='60' rx='3' />
                    <rect x='280' y='185' width='130' height='60' rx='3' />
                    <rect x='425' y='185' width='90' height='60' rx='3' />
                    <rect x='530' y='185' width='75' height='60' rx='3' />

                    <rect x='40' y='260' width='140' height='60' rx='3' />
                    <rect x='195' y='260' width='130' height='60' rx='3' />
                    <rect x='340' y='260' width='120' height='60' rx='3' />
                    <rect x='475' y='260' width='130' height='60' rx='3' />
                  </g>

                  {/* Río / Canal que cruza la ciudad */}
                  <path
                    d='M0,285 Q160,250 320,290 T650,260 L650,280 Q480,310 320,310 T0,305 Z'
                    fill='url(#gradRio)'
                    opacity='0.8'
                  />
                  <text x='550' y='275' fontSize='9' fill='#0284c7' fontStyle='italic'>Canal de Riego Sur</text>

                  {/* Avenidas y rutas principales */}
                  <g stroke='#cbd5e1' strokeWidth='8' strokeLinecap='round'>
                    <line x1='0' y1='90' x2='650' y2='90' />
                    <line x1='0' y1='178' x2='650' y2='178' />
                    <line x1='160' y1='0' x2='160' y2='340' />
                    <line x1='300' y1='0' x2='300' y2='340' />
                    <line x1='450' y1='0' x2='450' y2='340' />
                  </g>
                  <g stroke='#ffffff' strokeWidth='2' strokeDasharray='6 6'>
                    <line x1='0' y1='90' x2='650' y2='90' />
                    <line x1='0' y1='178' x2='650' y2='178' />
                    <line x1='300' y1='0' x2='300' y2='340' />
                  </g>

                  {/* Enlaces de fibra troncal con flujo de datos activo */}
                  <line x1='320' y1='160' x2='470' y2='95' stroke='#0d6efd' strokeWidth='3' />
                  <line x1='320' y1='160' x2='470' y2='95' stroke='#ffffff' strokeWidth='2' strokeDasharray='6 8'>
                    <animate attributeName='stroke-dashoffset' from='28' to='0' dur='1s' repeatCount='indefinite' />
                  </line>

                  <line x1='320' y1='160' x2='175' y2='225' stroke='#ffc107' strokeWidth='3' strokeDasharray='5 5'>
                    <animate attributeName='stroke-dashoffset' from='20' to='0' dur='1.5s' repeatCount='indefinite' />
                  </line>

                  {/* Rótulos de avenidas */}
                  <text x='15' y='85' fontSize='8' fill='#64748b' fontWeight='bold'>AV. CIRCUNVALACIÓN NORTE</text>
                  <text x='15' y='173' fontSize='8' fill='#64748b' fontWeight='bold'>AV. CENTRAL LIBERTADOR</text>

                  {/* Celdas de cobertura y Nodos */}
                  {nodos.map((n) => {
                    const seleccionado = nodoActivo.id === n.id;
                    return (
                      <g key={n.id} onClick={() => setNodoActivo(n)} style={{ cursor: 'pointer' }}>
                        {/* Radio de cobertura */}
                        <circle
                          cx={n.coords.x}
                          cy={n.coords.y}
                          r={n.radio}
                          fill={n.color}
                          fillOpacity={seleccionado ? '0.28' : '0.14'}
                          stroke={n.color}
                          strokeWidth={seleccionado ? '2.5' : '1.5'}
                          strokeDasharray={seleccionado ? 'none' : '4 2'}
                        />

                        {/* Onda de radar en el nodo seleccionado */}
                        {seleccionado && (
                          <circle cx={n.coords.x} cy={n.coords.y} r={n.radio} fill='none' stroke={n.color} strokeWidth='1.5'>
                            <animate attributeName='r' from='12' to={n.radio} dur='2s' repeatCount='indefinite' />
                            <animate attributeName='opacity' from='0.8' to='0' dur='2s' repeatCount='indefinite' />
                          </circle>
                        )}

                        {/* Torre / Punto Central */}
                        <circle cx={n.coords.x} cy={n.coords.y} r='10' fill='#ffffff' stroke={n.color} strokeWidth='3' />
                        <circle cx={n.coords.x} cy={n.coords.y} r='5' fill={n.color} />

                        {/* Etiqueta flotante */}
                        <rect
                          x={n.coords.x - 42}
                          y={n.coords.y - 28}
                          width='84'
                          height='18'
                          rx='9'
                          fill='#0f172a'
                          fillOpacity='0.88'
                        />
                        <text
                          x={n.coords.x}
                          y={n.coords.y - 16}
                          textAnchor='middle'
                          fontSize='9.5'
                          fontWeight='bold'
                          fill='#ffffff'
                        >
                          {n.nombre}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Ficha técnica del nodo seleccionado */}
            <div className='col-12 col-lg-4 p-3 bg-white d-flex flex-column justify-content-between'>
              <div>
                <div className='d-flex justify-content-between align-items-center mb-2'>
                  <span className='badge bg-light text-secondary border small'>{nodoActivo.id}</span>
                  <span className={`badge ${nodoActivo.estado === 'Operativo' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning-emphasis'}`}>
                    {nodoActivo.estado}
                  </span>
                </div>
                <h3 className='h6 fw-bold text-dark mb-0'>{nodoActivo.nombre}</h3>
                <small className='text-muted d-block mb-3'>{nodoActivo.zona}</small>

                <ul className='list-unstyled small border-top pt-2 mb-0'>
                  <li className='d-flex justify-content-between py-2 border-bottom'>
                    <span className='text-secondary'>Tecnología / Hardware:</span>
                    <strong className='text-dark'>{nodoActivo.tecnologia}</strong>
                  </li>
                  <li className='d-flex justify-content-between py-2 border-bottom'>
                    <span className='text-secondary'>Abonados en celda:</span>
                    <strong className='text-dark'>{nodoActivo.abonados} clientes</strong>
                  </li>
                  <li className='d-flex justify-content-between py-2 border-bottom'>
                    <span className='text-secondary'>Latencia de enlace:</span>
                    <span className='text-success fw-bold'>{nodoActivo.latencia} ms</span>
                  </li>
                  <li className='d-flex justify-content-between py-2 border-bottom'>
                    <span className='text-secondary'>Nivel óptico RX:</span>
                    <code className='text-dark'>{nodoActivo.potenciaOptica}</code>
                  </li>
                  <li className='py-2 border-bottom'>
                    <div className='d-flex justify-content-between mb-1'>
                      <span className='text-secondary'>Saturación de puerto:</span>
                      <strong className='text-dark'>{nodoActivo.capacidad}%</strong>
                    </div>
                    <div className='progress' style={{ height: '6px' }}>
                      <div
                        className={`progress-bar ${nodoActivo.capacidad > 90 ? 'bg-danger' : nodoActivo.capacidad > 75 ? 'bg-warning' : 'bg-primary'}`}
                        style={{ width: `${nodoActivo.capacidad}%` }}
                      ></div>
                    </div>
                  </li>
                  <li className='d-flex justify-content-between py-2'>
                    <span className='text-secondary'>Radio de cobertura:</span>
                    <span className='text-muted'>{nodoActivo.radio * 15} metros</span>
                  </li>
                </ul>
              </div>

              <div className='mt-3 pt-3 border-top'>
                <button
                  type='button'
                  className='btn btn-sm btn-outline-primary w-100 fw-semibold'
                  onClick={() => alert(`Iniciando prueba de loopback y ping en ${nodoActivo.nombre}`)}
                >
                  <i className='bi bi-activity me-1'></i> Auditar Tráfico del Nodo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label='Inventario de nodos'>
        <div className='card border rounded-3 bg-white shadow-sm overflow-hidden'>
          <div className='p-3 border-bottom d-flex justify-content-between align-items-center flex-wrap gap-2'>
            <h2 className='h6 fw-bold mb-0 text-dark'>Inventario de Nodos Troncales</h2>
            <div style={{ width: '220px' }}>
              <input
                type='search'
                className='form-control form-control-sm'
                placeholder='Filtrar por zona o nodo...'
                value={filtroTexto}
                onChange={(e) => setFiltroTexto(e.target.value)}
              />
            </div>
          </div>

          <div className='table-responsive'>
            <table className='table table-hover align-middle mb-0 small'>
              <thead className='table-light text-secondary'>
                <tr>
                  <th scope='col' className='ps-3'>ID</th>
                  <th scope='col'>NODO / ZONA</th>
                  <th scope='col'>TECNOLOGÍA</th>
                  <th scope='col'>ABONADOS</th>
                  <th scope='col'>LATENCIA</th>
                  <th scope='col' className='pe-3'>ESTADO</th>
                </tr>
              </thead>
              <tbody>
                {nodosFiltrados.map((nodo) => (
                  <tr
                    key={nodo.id}
                    onClick={() => setNodoActivo(nodo)}
                    style={{ cursor: 'pointer' }}
                    className={nodoActivo.id === nodo.id ? 'table-active' : ''}
                  >
                    <td className='ps-3 fw-bold text-secondary'>{nodo.id}</td>
                    <td>
                      <span className='fw-semibold text-dark'>{nodo.nombre}</span>
                      <small className='text-muted d-block'>{nodo.zona}</small>
                    </td>
                    <td><span className='badge bg-light text-secondary border'>{nodo.tecnologia}</span></td>
                    <td>{nodo.abonados}</td>
                    <td className='text-success fw-bold'>{nodo.latencia} ms</td>
                    <td className='pe-3'>
                      <span className={`badge ${nodo.estado === 'Operativo' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning-emphasis'}`}>
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