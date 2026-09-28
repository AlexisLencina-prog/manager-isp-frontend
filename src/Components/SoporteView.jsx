import React, { useState, useEffect } from 'react';

const CATEGORIAS = ['Caída de fibra', 'Configuración WiFi', 'Facturación'];

const COLORES = {
  'Caída de fibra': '#0284c7',
  'Configuración WiFi': '#14b8a6',
  'Facturación': '#f59e0b',
};

const ESTILO_ESTADO = {
  'Abierto': 'text-bg-danger-subtle text-danger border border-danger-subtle',
  'En proceso': 'text-bg-warning-subtle text-warning-emphasis border border-warning-subtle',
  'Resuelto': 'text-bg-success-subtle text-success border border-success-subtle',
};

const RADIO = 40;
const CIRCUNFERENCIA = 2 * Math.PI * RADIO;

const TICKETS_INICIALES = [
  { id: '#1021', cliente: 'Juan Pérez', categoria: 'Caída de fibra', estado: 'Abierto' },
  { id: '#1022', cliente: 'Lucía Fernández', categoria: 'Configuración WiFi', estado: 'En proceso' },
  { id: '#1023', cliente: 'Carlos Morales', categoria: 'Caída de fibra', estado: 'Abierto' },
  { id: '#1024', cliente: 'Marta Ruiz', categoria: 'Facturación', estado: 'Resuelto' },
  { id: '#1025', cliente: 'Diego Sosa', categoria: 'Caída de fibra', estado: 'En proceso' },
  { id: '#1026', cliente: 'Ana Ledesma', categoria: 'Configuración WiFi', estado: 'Resuelto' },
  { id: '#1027', cliente: 'Pablo Cruz', categoria: 'Caída de fibra', estado: 'Resuelto' },
  { id: '#1028', cliente: 'Sofía Vera', categoria: 'Caída de fibra', estado: 'Abierto' },
];

const SoporteView = () => {
  const [tickets, setTickets] = useState(TICKETS_INICIALES);
  const [alerta, setAlerta] = useState(null);

  // Form State
  const [cliente, setCliente] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');

  // Temporizador para auto-desvanecer la alerta
  useEffect(() => {
    if (alerta) {
      const timer = setTimeout(() => setAlerta(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [alerta]);

  // Métricas derivadas del estado (se actualizan solas)
  const abiertos = tickets.filter((t) => t.estado !== 'Resuelto').length;
  const resueltos = tickets.length - abiertos;

  // Datos del gráfico donut
  let acumulado = 0;
  const segmentos = CATEGORIAS.map((cat) => {
    const cantidad = tickets.filter((t) => t.categoria === cat).length;
    const largo = (cantidad / tickets.length) * CIRCUNFERENCIA;
    const segmento = {
      categoria: cat,
      cantidad,
      porcentaje: Math.round((cantidad / tickets.length) * 1000) / 10,
      largo,
      desplazamiento: acumulado,
    };
    acumulado += largo;
    return segmento;
  });

  const handleResolver = (id) => {
    setTickets(tickets.map((t) => (t.id === id ? { ...t, estado: 'Resuelto' } : t)));
    setAlerta({ tipo: 'success', mensaje: `El ticket ${id} fue marcado como resuelto.` });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cliente.trim() || !categoria || !descripcion.trim()) {
      setAlerta({ tipo: 'danger', mensaje: 'Complete cliente, categoría y descripción para abrir el ticket.' });
      return;
    }

    const nuevoTicket = {
      id: `#${1020 + tickets.length + 1}`,
      cliente: cliente.trim(),
      categoria,
      estado: 'Abierto',
    };

    setTickets([nuevoTicket, ...tickets]);
    setAlerta({ tipo: 'success', mensaje: `Ticket ${nuevoTicket.id} abierto para ${nuevoTicket.cliente}.` });

    // Limpiar formulario
    setCliente('');
    setCategoria('');
    setDescripcion('');
  };

  return (
    <div>
      {alerta && (
        <div className={`alert alert-${alerta.tipo} alerta-flotante small py-2`} role="alert">
          <i className="bi bi-info-circle-fill me-2"></i>
          {alerta.mensaje}
        </div>
      )}

      {/* Métricas y distribución */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6 col-xl-3">
          <div className="saas-card p-3 border-start border-4 border-danger h-100">
            <span className="text-secondary small fw-semibold">Tickets Abiertos</span>
            <h3 className="fw-bold mb-0 mt-1 text-dark">{abiertos}</h3>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-3">
          <div className="saas-card p-3 border-start border-4 border-success h-100">
            <span className="text-secondary small fw-semibold">Tickets Resueltos</span>
            <h3 className="fw-bold mb-0 mt-1 text-dark">{resueltos}</h3>
          </div>
        </div>

        <div className="col-12 col-xl-6">
          <div className="saas-card p-3 d-flex align-items-center gap-4 h-100">
            <div className="donut-container">
              <svg className="donut-svg" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r={RADIO} fill="none" stroke="#e2e8f0" strokeWidth="16" />
                {segmentos.map((s) => (
                  <circle
                    key={s.categoria}
                    className="donut-segmento"
                    cx="60"
                    cy="60"
                    r={RADIO}
                    stroke={COLORES[s.categoria]}
                    strokeDasharray={`${s.largo} ${CIRCUNFERENCIA - s.largo}`}
                    strokeDashoffset={-s.desplazamiento}
                  />
                ))}
              </svg>
              <div className="donut-centro">
                <span className="fw-bold fs-4 lh-1 text-dark">{tickets.length}</span>
                <span className="text-secondary" style={{ fontSize: '0.65rem' }}>TICKETS</span>
              </div>
            </div>

            <div className="flex-grow-1">
              <h2 className="h6 fw-bold text-dark mb-2">Tipología de reclamos</h2>
              {segmentos.map((s) => (
                <div key={s.categoria} className="d-flex align-items-center small mb-1">
                  <span className="leyenda-punto me-2" style={{ backgroundColor: COLORES[s.categoria] }}></span>
                  <span className="flex-grow-1">{s.categoria}</span>
                  <span className="fw-semibold">{s.porcentaje}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cola de tickets */}
      <section className="mb-4">
        <div className="saas-card overflow-hidden">
          <div className="p-3 border-bottom bg-white d-flex align-items-center gap-2">
            <h2 className="h6 mb-0 fw-bold text-dark">Cola de Incidencias</h2>
            <span className="badge bg-secondary-subtle text-secondary-emphasis small">{tickets.length} en total</span>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light small text-secondary">
                <tr>
                  <th scope="col" className="ps-3">N° TICKET</th>
                  <th scope="col">CLIENTE</th>
                  <th scope="col">CATEGORÍA</th>
                  <th scope="col">ESTADO</th>
                  <th scope="col" className="pe-3 text-end">ACCIÓN</th>
                </tr>
              </thead>
              <tbody className="small">
                {tickets.map((t) => (
                  <tr key={t.id}>
                    <td className="ps-3 fw-semibold text-secondary">{t.id}</td>
                    <td className="fw-medium text-dark">{t.cliente}</td>
                    <td>{t.categoria}</td>
                    <td>
                      <span className={`badge px-2 py-1 ${ESTILO_ESTADO[t.estado]}`}>{t.estado}</span>
                    </td>
                    <td className="pe-3 text-end">
                      {t.estado !== 'Resuelto' && (
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-success"
                          onClick={() => handleResolver(t.id)}
                        >
                          <i className="bi bi-check2 me-1"></i>Resolver
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Apertura de incidencias */}
      <section>
        <div className="saas-card p-4">
          <div className="border-bottom pb-2 mb-3">
            <h2 className="h6 fw-bold mb-1 text-dark">Apertura de Incidencia</h2>
            <p className="text-secondary small mb-0">El ticket se agrega a la cola en memoria</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold small">Cliente</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Nombre del cliente"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold small">Categoría</label>
                <select
                  className="form-select form-select-sm"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option value="" disabled>Seleccione tipo de reclamo...</option>
                  {CATEGORIAS.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold small">Descripción del problema</label>
                <textarea
                  className="form-control form-control-sm"
                  rows="3"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="d-flex gap-2 mt-4 pt-3 border-top">
              <button type="submit" className="btn btn-sm btn-primary px-3 fw-semibold">
                Abrir Ticket
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SoporteView;