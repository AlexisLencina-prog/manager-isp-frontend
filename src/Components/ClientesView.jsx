import React, { useState, useEffect } from 'react';

const CLIENTES_INICIALES = [
  { id: '#1001', nombre: 'Juan Manuel Gómez', dni: '32456789', plan: 'Fibra Óptica 100 Mbps', ip: '192.168.10.45', estado: 'Habilitado' },
  { id: '#1002', nombre: 'Lucía Fernández', dni: '28911234', plan: 'Fibra Óptica 300 Mbps', ip: '192.168.10.82', estado: 'Habilitado' },
  { id: '#1003', nombre: 'Carlos Morales', dni: '35678123', plan: 'Inalámbrico 50 Mbps', ip: '192.168.20.12', estado: 'Suspendido' },
];

const ClientesView = () => {
  const [clientes, setClientes] = useState(CLIENTES_INICIALES);
  const [busqueda, setBusqueda] = useState('');
  const [alerta, setAlerta] = useState(null);

  // Form State
  const [nombre, setNombre] = useState('');
  const [dni, setDni] = useState('');
  const [plan, setPlan] = useState('');
  const [ip, setIp] = useState('');

  // Temporizador para auto-desvanecer la alerta
  useEffect(() => {
    if (alerta) {
      const timer = setTimeout(() => setAlerta(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [alerta]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !dni.trim() || !plan) {
      setAlerta({ tipo: 'danger', mensaje: 'Por favor complete los campos obligatorios del abonado.' });
      return;
    }

    const nuevoCliente = {
      id: `#${1000 + clientes.length + 1}`,
      nombre: nombre.trim(),
      dni: dni.trim(),
      plan,
      ip: ip.trim() || `192.168.10.${Math.floor(Math.random() * 200) + 10}`,
      estado: 'Habilitado'
    };

    setClientes([nuevoCliente, ...clientes]);
    setAlerta({ tipo: 'success', mensaje: `Abonado ${nuevoCliente.nombre} registrado con éxito en la plataforma.` });
    
    // Limpiar formulario
    setNombre('');
    setDni('');
    setPlan('');
    setIp('');
  };

  const clientesFiltrados = clientes.filter(c => 
    c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.dni.includes(busqueda) ||
    c.ip.includes(busqueda)
  );

  return (
    <div>
      {/* Alerta flotante fija tipo Toast */}
      {alerta && (
        <div 
          className="position-fixed top-0 end-0 p-3" 
          style={{ zIndex: 1090, marginTop: '60px' }}
        >
          <div 
            className={`alert alert-${alerta.tipo} alert-dismissible fade show shadow-lg border-0 d-flex align-items-center gap-2 small py-2 px-3`} 
            role="alert"
          >
            <i className={`bi ${alerta.tipo === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} fs-6`}></i>
            <div>{alerta.mensaje}</div>
            <button 
              type="button" 
              className="btn-close ms-auto" 
              onClick={() => setAlerta(null)} 
              aria-label="Cerrar"
            ></button>
          </div>
        </div>
      )}

      {/* Resumen del parque de abonados */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="saas-card p-3">
            <span className="text-secondary small fw-semibold">Base Total de Abonados</span>
            <div className="d-flex align-items-baseline gap-2 mt-1">
              <h3 className="fw-bold mb-0 text-dark">{clientes.length}</h3>
              <span className="badge text-bg-success-subtle text-success small">Activos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de Clientes con búsqueda reactiva */}
      <section className="mb-4">
        <div className="saas-card overflow-hidden">
          <div className="p-3 border-bottom d-flex flex-wrap justify-content-between align-items-center gap-2 bg-white">
            <div className="d-flex align-items-center gap-2">
              <h2 className="h6 mb-0 fw-bold text-dark">Nómina General de Abonados</h2>
              <span className="badge bg-secondary-subtle text-secondary-emphasis small">{clientesFiltrados.length} en pantalla</span>
            </div>
            <div style={{ width: '260px' }}>
              <input
                type="search"
                className="form-control form-control-sm"
                placeholder="Buscar por nombre, DNI o IP..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light small text-secondary">
                <tr>
                  <th scope="col" className="ps-3">N° CLIENTE</th>
                  <th scope="col">TITULAR</th>
                  <th scope="col">DNI</th>
                  <th scope="col">PLAN ACTIVO</th>
                  <th scope="col">IP ASIGNADA</th>
                  <th scope="col" className="pe-3">ESTADO</th>
                </tr>
              </thead>
              <tbody className="small">
                {clientesFiltrados.map((c) => (
                  <tr key={c.id}>
                    <td className="ps-3 fw-semibold text-secondary">{c.id}</td>
                    <td className="fw-medium text-dark">{c.nombre}</td>
                    <td>{c.dni}</td>
                    <td><span className="badge text-bg-light border">{c.plan}</span></td>
                    <td><code>{c.ip}</code></td>
                    <td className="pe-3">
                      <span className="badge text-bg-success-subtle text-success border border-success-subtle px-2 py-1">
                        {c.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Formulario de Alta Reactivo */}
      <section>
        <div className="saas-card p-4">
          <div className="border-bottom pb-2 mb-3">
            <h2 className="h6 fw-bold mb-1 text-dark">Alta de Nuevo Abonado</h2>
            <p className="text-secondary small mb-0">Aprovisionamiento directo en memoria de React</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold small">Nombre y Apellido</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Ej. Roberto Sánchez"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold small">DNI / CUIT</label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="Sin puntos ni guiones"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold small">Plan Comercial</label>
                <select
                  className="form-select form-select-sm"
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  required
                >
                  <option value="" disabled>Seleccione velocidad...</option>
                  <option value="Fibra Óptica 100 Mbps">Fibra Óptica 100 Mbps</option>
                  <option value="Fibra Óptica 300 Mbps">Fibra Óptica 300 Mbps</option>
                  <option value="Fibra Óptica 600 Mbps">Fibra Óptica 600 Mbps</option>
                  <option value="Inalámbrico 50 Mbps">Inalámbrico 50 Mbps</option>
                </select>
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold small">IP Estática (Opcional)</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="192.168.10.x"
                  value={ip}
                  onChange={(e) => setIp(e.target.value)}
                />
              </div>
            </div>

            <div className="d-flex gap-2 mt-4 pt-3 border-top">
              <button type="submit" className="btn btn-sm btn-primary px-3 fw-semibold">
                Registrar y Aprovisionar
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ClientesView;