import React, { useState, useEffect } from 'react';

const TICKETS_INICIALES = [
  {
    id: 'TK-101',
    abonado: 'Carlos Gómez (AB-882)',
    falla: 'Caída de fibra óptica en nodo central',
    prioridad: 'Crítica',
    estado: 'Abierto'
  },
  {
    id: 'TK-102',
    abonado: 'Empresa Alfa S.A. (AB-104)',
    falla: 'Pérdida de paquetes en enlace dedicado',
    prioridad: 'Alta',
    estado: 'Abierto'
  },
  {
    id: 'TK-103',
    abonado: 'Mariana López (AB-309)',
    falla: 'Lentitud y microcortes WiFi',
    prioridad: 'Media',
    estado: 'Abierto'
  },
  {
    id: 'TK-104',
    abonado: "Roberto D'Amico (AB-012)",
    falla: 'Solicitud de cambio de clave ONT',
    prioridad: 'Baja',
    estado: 'Resuelto'
  }
];

export const SoportePage = () => {
  // --- USESTATE ---
  const [tickets, setTickets] = useState(TICKETS_INICIALES);
  const [fallaForm, setFallaForm] = useState('');
  const [abonadoForm, setAbonadoForm] = useState('');
  const [prioridadForm, setPrioridadForm] = useState('Media');
  const [filtroEstado, setFiltroEstado] = useState('Todos');

  const abiertos = tickets.filter((t) => t.estado === 'Abierto').length;
  const resueltos = tickets.filter((t) => t.estado === 'Resuelto').length;

  // --- USEEFFECT: Sincronizar el título de la pestaña del navegador ---
  useEffect(() => {
    document.title = `(${abiertos}) Tickets Abiertos - ISP Manager`;

    // Cleanup: Restablece el título por defecto al cambiar de página/desmontar
    return () => {
      document.title = 'ISP MANAGER - Sistema de Gestión NOC';
    };
  }, [abiertos]); // Dependencia: Se ejecuta cada vez que el número de tickets 'abiertos' cambia

  // Manejadores de eventos
  const handleResolver = (id) => {
    setTickets(
      tickets.map((t) => (t.id === id ? { ...t, estado: 'Resuelto' } : t))
    );
  };

  const handleNuevoTicket = (e) => {
    e.preventDefault();
    if (!abonadoForm.trim() || !fallaForm.trim()) return;

    const nuevo = {
      id: `TK-${Math.floor(100 + Math.random() * 900)}`,
      abonado: abonadoForm,
      falla: fallaForm,
      prioridad: prioridadForm,
      estado: 'Abierto'
    };

    setTickets([nuevo, ...tickets]);
    setAbonadoForm('');
    setFallaForm('');
  };

  // Filtrado reactivo de tickets según estado
  const ticketsFiltrados = tickets.filter((ticket) => {
    if (filtroEstado === 'Abiertos') return ticket.estado === 'Abierto';
    if (filtroEstado === 'Resueltos') return ticket.estado === 'Resuelto';
    return true; // Todos
  });

  const getBadgePrioridad = (prioridad) => {
    switch (prioridad) {
      case 'Crítica':
      case 'Alta':
        return 'bg-danger';
      case 'Media':
        return 'bg-warning text-dark';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <>
      <h2 className='fw-bold text-primary mb-4'>Mesa de Ayuda & Tickets NOC</h2>

      {/* Métricas e Indicadores */}
      <div className='row g-3 mb-4'>
        <div className='col-12 col-md-4'>
          <div className='card border-0 shadow-sm bg-danger text-white h-100'>
            <div className='card-body text-center py-4'>
              <h6 className='text-uppercase fw-bold mb-1'>Tickets Abiertos</h6>
              <h1 className='display-4 fw-bold mb-0'>{abiertos}</h1>
            </div>
          </div>
        </div>
        <div className='col-12 col-md-4'>
          <div className='card border-0 shadow-sm bg-success text-white h-100'>
            <div className='card-body text-center py-4'>
              <h6 className='text-uppercase fw-bold mb-1'>Tickets Resueltos</h6>
              <h1 className='display-4 fw-bold mb-0'>{resueltos}</h1>
            </div>
          </div>
        </div>
        <div className='col-12 col-md-4'>
          <div className='card border-0 shadow-sm h-100'>
            <div className='card-body d-flex align-items-center justify-content-around py-3'>
              <div>
                <h6 className='fw-bold mb-2'>Tipología de Fallas</h6>
                <div className='d-flex align-items-center gap-1 text-danger small mb-1'>
                  <span className='fw-bold'>●</span> Fibra (50%)
                </div>
                <div className='d-flex align-items-center gap-1 text-warning small mb-1'>
                  <span className='fw-bold'>●</span> WiFi / Router (30%)
                </div>
                <div className='d-flex align-items-center gap-1 text-info small'>
                  <span className='fw-bold'>●</span> Enlace IP (20%)
                </div>
              </div>
              <svg width='90' height='90' viewBox='0 0 42 42' className='donut'>
                <circle cx='21' cy='21' r='15.915' fill='transparent' stroke='#e9ecef' strokeWidth='5'></circle>
                <circle cx='21' cy='21' r='15.915' fill='transparent' stroke='#dc3545' strokeWidth='5' strokeDasharray='50 50' strokeDashoffset='25'></circle>
                <circle cx='21' cy='21' r='15.915' fill='transparent' stroke='#ffc107' strokeWidth='5' strokeDasharray='30 70' strokeDashoffset='75'></circle>
                <circle cx='21' cy='21' r='15.915' fill='transparent' stroke='#0dcaf0' strokeWidth='5' strokeDasharray='20 80' strokeDashoffset='45'></circle>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de Cola de Tickets */}
      <div className='card border-0 shadow-sm mb-4'>
        <div className='card-header bg-dark text-white py-3 d-flex justify-content-between align-items-center'>
          <h5 className='mb-0'>Cola de Incidencias en Tiempo Real</h5>
          {/* Botones de Filtro por Estado (useState) */}
          <div className='btn-group btn-group-sm' role='group'>
            {['Todos', 'Abiertos', 'Resueltos'].map((estado) => (
              <button
                key={estado}
                type='button'
                className={`btn ${
                  filtroEstado === estado ? 'btn-primary' : 'btn-outline-light'
                }`}
                onClick={() => setFiltroEstado(estado)}
              >
                {estado}
              </button>
            ))}
          </div>
        </div>

        <div className='card-body p-0 table-responsive'>
          <table className='table table-hover align-middle mb-0'>
            <thead className='table-light'>
              <tr>
                <th>ID</th>
                <th>Abonado</th>
                <th>Descripción de la Falla</th>
                <th>Prioridad</th>
                <th>Estado</th>
                <th className='text-end'>Acción</th>
              </tr>
            </thead>
            <tbody>
              {ticketsFiltrados.map((ticket) => (
                <tr key={ticket.id}>
                  <td className='fw-bold'>{ticket.id}</td>
                  <td>{ticket.abonado}</td>
                  <td>{ticket.falla}</td>
                  <td>
                    <span className={`badge ${getBadgePrioridad(ticket.prioridad)}`}>
                      {ticket.prioridad}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        ticket.estado === 'Abierto'
                          ? 'bg-warning text-dark'
                          : 'bg-success'
                      }`}
                    >
                      {ticket.estado}
                    </span>
                  </td>
                  <td className='text-end'>
                    {ticket.estado === 'Abierto' ? (
                      <button
                        type='button'
                        className='btn btn-sm btn-outline-success'
                        onClick={() => handleResolver(ticket.id)}
                      >
                        Resolver
                      </button>
                    ) : (
                      <span className='text-muted small'>Atendido</span>
                    )}
                  </td>
                </tr>
              ))}
              {ticketsFiltrados.length === 0 && (
                <tr>
                  <td colSpan='6' className='text-center py-3 text-muted'>
                    No hay incidencias para mostrar en esta categoría.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Formulario de Alta de Incidencias */}
      <div className='card border-0 shadow-sm'>
        <div className='card-header bg-light py-3'>
          <h5 className='mb-0 text-secondary'>Abrir Nueva Incidencia Técnica</h5>
        </div>
        <div className='card-body'>
          <form onSubmit={handleNuevoTicket} className='row g-3'>
            <div className='col-12 col-md-5'>
              <label htmlFor='abonado' className='form-label fw-semibold'>
                Abonado / ID
              </label>
              <input
                type='text'
                id='abonado'
                className='form-control'
                placeholder='Ej. Juan Pérez (AB-501)'
                value={abonadoForm}
                onChange={(e) => setAbonadoForm(e.target.value)}
                required
              />
            </div>
            <div className='col-12 col-md-4'>
              <label htmlFor='prioridad' className='form-label fw-semibold'>
                Prioridad
              </label>
              <select
                id='prioridad'
                className='form-select'
                value={prioridadForm}
                onChange={(e) => setPrioridadForm(e.target.value)}
              >
                <option value='Baja'>Baja</option>
                <option value='Media'>Media</option>
                <option value='Alta'>Alta</option>
                <option value='Crítica'>Crítica</option>
              </select>
            </div>
            <div className='col-12 col-md-3 d-flex align-items-end'>
              <button type='submit' className='btn btn-primary w-100'>
                Registrar Ticket
              </button>
            </div>
            <div className='col-12'>
              <label htmlFor='falla' className='form-label fw-semibold'>
                Descripción del Problema
              </label>
              <textarea
                id='falla'
                className='form-control'
                rows='2'
                placeholder='Detalle la falla reportada por el abonado...'
                value={fallaForm}
                onChange={(e) => setFallaForm(e.target.value)}
                required
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SoportePage;