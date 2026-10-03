import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const CLIENTES_INICIALES = [
  { id: '#1001', nombre: 'Juan Manuel Gómez', dni: '32456789', plan: 'Fibra Óptica 100 Mbps', ip: '192.168.10.45', estado: 'Habilitado', fechaAlta: '12/03/2026' },
  { id: '#1002', nombre: 'Lucía Fernández', dni: '28911234', plan: 'Fibra Óptica 300 Mbps', ip: '192.168.10.82', estado: 'Habilitado', fechaAlta: '20/04/2026' },
  { id: '#1003', nombre: 'Carlos Morales', dni: '35678123', plan: 'Inalámbrico 50 Mbps', ip: '192.168.20.12', estado: 'Suspendido', fechaAlta: '05/06/2026' },
];

const ClientesPage = () => {
  const [clientes, setClientes] = useState(CLIENTES_INICIALES);
  const [busqueda, setBusqueda] = useState('');
  const [alerta, setAlerta] = useState(null);

  // Estados del Formulario
  const [nombre, setNombre] = useState('');
  const [dni, setDni] = useState('');
  const [plan, setPlan] = useState('');
  const [ip, setIp] = useState('');

  // Estado del Modal de Detalle
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    if (alerta) {
      const timer = setTimeout(() => setAlerta(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [alerta]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !dni.trim() || !plan) {
      setAlerta({ tipo: 'danger', mensaje: 'Complete los campos obligatorios del abonado.' });
      return;
    }

    const nuevoCliente = {
      id: `#${1000 + clientes.length + 1}`,
      nombre: nombre.trim(),
      dni: dni.trim(),
      plan,
      ip: ip.trim() || `192.168.10.${Math.floor(Math.random() * 200) + 10}`,
      estado: 'Habilitado',
      fechaAlta: new Date().toLocaleDateString('es-AR')
    };

    setClientes([nuevoCliente, ...clientes]);
    setAlerta({ tipo: 'success', mensaje: `Abonado ${nuevoCliente.nombre} registrado con éxito.` });
    
    setNombre('');
    setDni('');
    setPlan('');
    setIp('');
  };

  const handleAbrirModal = (cliente) => {
    setClienteSeleccionado(cliente);
    setMostrarModal(true);
  };

  const handleToggleEstado = () => {
    if (!clienteSeleccionado) return;
    const nuevoEstado = clienteSeleccionado.estado === 'Habilitado' ? 'Suspendido' : 'Habilitado';
    
    const clientesActualizados = clientes.map((c) => 
      c.id === clienteSeleccionado.id ? { ...c, estado: nuevoEstado } : c
    );

    setClientes(clientesActualizados);
    setClienteSeleccionado({ ...clienteSeleccionado, estado: nuevoEstado });
    setAlerta({ tipo: 'warning', mensaje: `Abonado ${clienteSeleccionado.nombre} pasó a estado: ${nuevoEstado}.` });
  };

  const clientesFiltrados = clientes.filter((c) => 
    c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.dni.includes(busqueda) ||
    c.ip.includes(busqueda)
  );

  return (
    <>
      {/* Alerta flotante tipo Toast */}
      {alerta && (
        <div className='position-fixed top-0 end-0 p-3' style={{ zIndex: 1090, marginTop: '60px' }}>
          <div className={`alert alert-${alerta.tipo} alert-dismissible fade show shadow-lg border-0 d-flex align-items-center gap-2 small py-2 px-3`} role='alert'>
            <i className={`bi ${alerta.tipo === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} fs-6`}></i>
            <div>{alerta.mensaje}</div>
            <button type='button' className='btn-close ms-auto' onClick={() => setAlerta(null)} aria-label='Cerrar'></button>
          </div>
        </div>
      )}

      {/* Resumen Superior */}
      <section className='row g-3 mb-4' aria-label='Resumen de base de clientes'>
        <div className='col-12 col-md-4'>
          <div className='card border rounded-3 shadow-sm p-3 bg-white'>
            <span className='text-secondary small fw-semibold'>Parque Total de Clientes</span>
            <div className='d-flex align-items-baseline gap-2 mt-1'>
              <h2 className='h3 fw-bold mb-0 text-dark'>{clientes.length}</h2>
              <span className='badge text-bg-success-subtle text-success small'>
                {clientes.filter((c) => c.estado === 'Habilitado').length} Habilitados
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabla de Clientes con .map() y key única */}
      <section className='mb-4' aria-label='Listado de abonados'>
        <div className='card border rounded-3 shadow-sm overflow-hidden bg-white'>
          <div className='p-3 border-bottom d-flex flex-wrap justify-content-between align-items-center gap-2'>
            <div className='d-flex align-items-center gap-2'>
              <h1 className='h6 mb-0 fw-bold text-dark'>Nómina General de Abonados</h1>
              <span className='badge bg-secondary-subtle text-secondary-emphasis small'>{clientesFiltrados.length} en pantalla</span>
            </div>
            <div style={{ width: '260px' }}>
              <input
                type='search'
                className='form-control form-control-sm'
                placeholder='Buscar por nombre, DNI o IP...'
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>

          <div className='table-responsive'>
            <table className='table table-hover align-middle mb-0'>
              <thead className='table-light small text-secondary'>
                <tr>
                  <th scope='col' className='ps-3'>N° CLIENTE</th>
                  <th scope='col'>TITULAR</th>
                  <th scope='col'>DNI</th>
                  <th scope='col'>PLAN ACTIVO</th>
                  <th scope='col'>IP ASIGNADA</th>
                  <th scope='col'>ESTADO</th>
                  <th scope='col' className='pe-3 text-end'>ACCIÓN</th>
                </tr>
              </thead>
              <tbody className='small'>
                {clientesFiltrados.map((c) => (
                  <tr key={c.id}>
                    <td className='ps-3 fw-semibold text-secondary'>{c.id}</td>
                    <td className='fw-medium text-dark'>{c.nombre}</td>
                    <td>{c.dni}</td>
                    <td><span className='badge text-bg-light border'>{c.plan}</span></td>
                    <td><code>{c.ip}</code></td>
                    <td>
                      <span className={`badge ${c.estado === 'Habilitado' ? 'text-bg-success-subtle text-success border border-success-subtle' : 'text-bg-danger-subtle text-danger border border-danger-subtle'} px-2 py-1`}>
                        {c.estado}
                      </span>
                    </td>
                    <td className='pe-3 text-end'>
                      <button
                        type='button'
                        className='btn btn-sm btn-outline-primary py-0 px-2'
                        style={{ fontSize: '0.75rem' }}
                        onClick={() => handleAbrirModal(c)}
                      >
                        <i className='bi bi-eye me-1'></i> Ficha
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Formulario de Alta */}
      <section aria-label='Aprovisionamiento de nuevos abonados'>
        <div className='card border rounded-3 shadow-sm p-4 bg-white'>
          <div className='border-bottom pb-2 mb-3'>
            <h2 className='h6 fw-bold mb-1 text-dark'>Alta de Nuevo Abonado</h2>
            <p className='text-secondary small mb-0'>Aprovisionamiento reactivo de enlace en memoria</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='row g-3'>
              <div className='col-12 col-md-6'>
                <label className='form-label fw-semibold small'>Nombre y Apellido</label>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  placeholder='Ej. Roberto Sánchez'
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className='col-12 col-md-6'>
                <label className='form-label fw-semibold small'>DNI / CUIT</label>
                <input
                  type='number'
                  className='form-control form-control-sm'
                  placeholder='Sin puntos ni guiones'
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  required
                />
              </div>
              <div className='col-12 col-md-6'>
                <label className='form-label fw-semibold small'>Plan Comercial</label>
                <select
                  className='form-select form-select-sm'
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  required
                >
                  <option value='' disabled>Seleccione velocidad...</option>
                  <option value='Fibra Óptica 100 Mbps'>Fibra Óptica 100 Mbps</option>
                  <option value='Fibra Óptica 300 Mbps'>Fibra Óptica 300 Mbps</option>
                  <option value='Fibra Óptica 600 Mbps'>Fibra Óptica 600 Mbps</option>
                  <option value='Inalámbrico 50 Mbps'>Inalámbrico 50 Mbps</option>
                </select>
              </div>
              <div className='col-12 col-md-6'>
                <label className='form-label fw-semibold small'>IP Estática (Opcional)</label>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  placeholder='192.168.10.x'
                  value={ip}
                  onChange={(e) => setIp(e.target.value)}
                />
              </div>
            </div>

            <div className='d-flex gap-2 mt-4 pt-3 border-top'>
              <button type='submit' className='btn btn-sm btn-primary px-3 fw-semibold'>
                Registrar y Aprovisionar
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Modal Oficial de React-Bootstrap para Inspección y Cambio de Estado */}
      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className='h6 fw-bold mb-0'>Ficha Técnica del Abonado</Modal.Title>
        </Modal.Header>
        <Modal.Body className='small'>
          {clienteSeleccionado && (
            <ul className='list-unstyled mb-0'>
              <li className='d-flex justify-content-between py-2 border-bottom'>
                <span className='text-secondary'>Identificador:</span>
                <strong>{clienteSeleccionado.id}</strong>
              </li>
              <li className='d-flex justify-content-between py-2 border-bottom'>
                <span className='text-secondary'>Titular:</span>
                <span className='fw-semibold text-dark'>{clienteSeleccionado.nombre}</span>
              </li>
              <li className='d-flex justify-content-between py-2 border-bottom'>
                <span className='text-secondary'>DNI / Documento:</span>
                <span>{clienteSeleccionado.dni}</span>
              </li>
              <li className='d-flex justify-content-between py-2 border-bottom'>
                <span className='text-secondary'>Plan Contratado:</span>
                <span className='badge text-bg-light border'>{clienteSeleccionado.plan}</span>
              </li>
              <li className='d-flex justify-content-between py-2 border-bottom'>
                <span className='text-secondary'>IP Asignada:</span>
                <code>{clienteSeleccionado.ip}</code>
              </li>
              <li className='d-flex justify-content-between py-2 border-bottom'>
                <span className='text-secondary'>Fecha de Alta:</span>
                <span>{clienteSeleccionado.fechaAlta}</span>
              </li>
              <li className='d-flex justify-content-between py-2'>
                <span className='text-secondary'>Estado del Servicio:</span>
                <span className={`badge ${clienteSeleccionado.estado === 'Habilitado' ? 'text-bg-success' : 'text-bg-danger'}`}>
                  {clienteSeleccionado.estado}
                </span>
              </li>
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-between'>
          <Button
            variant={clienteSeleccionado?.estado === 'Habilitado' ? 'outline-danger' : 'outline-success'}
            size='sm'
            onClick={handleToggleEstado}
          >
            {clienteSeleccionado?.estado === 'Habilitado' ? 'Suspender Enlace' : 'Habilitar Enlace'}
          </Button>
          <Button variant='secondary' size='sm' onClick={() => setMostrarModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ClientesPage;