import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal, Button } from "react-bootstrap";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from "recharts";

const API_URL =
  import.meta.env.VITE_API_URL || "https://jsonplaceholder.typicode.com/users";

const PLANES_DISPONIBLES = [
  "Fibra Óptica 100 Mbps",
  "Fibra Óptica 300 Mbps",
  "Fibra Óptica 600 Mbps",
  "Inalámbrico 50 Mbps",
];

const ESTILO_TOOLTIP = {
  backgroundColor: "rgba(15, 23, 42, 0.96)",
  borderColor: "#334155",
  color: "#f8fafc",
  borderRadius: "4px",
  fontSize: "12px",
};

const formatearUsuarios = (datos) =>
  datos.map((usuario, index) => ({
    id: `#${1000 + usuario.id}`,
    nombre: usuario.name,
    dni: `${30000000 + usuario.id * 1234}`,
    email: usuario.email.toLowerCase(),
    ciudad: usuario.address?.city || "San Miguel de Tucumán",
    plan: PLANES_DISPONIBLES[index % PLANES_DISPONIBLES.length],
    ip: `192.168.10.${10 + usuario.id}`,
    estado: index % 4 === 0 ? "Suspendido" : "Habilitado",
    fechaAlta: "01/03/2026",
  }));

const ClientesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const busqueda = searchParams.get("q") || "";

  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [plan, setPlan] = useState("");
  const [ip, setIp] = useState("");

  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Carga inicial al montar el componente
  useEffect(() => {
    axios
      .get(API_URL)
      .then((respuesta) => {
        setClientes(formatearUsuarios(respuesta.data));
        setErrorCarga(false);
      })
      .catch((err) => {
        console.error("Error al sincronizar clientes:", err);
        setErrorCarga(true);
        Swal.fire({
          icon: "error",
          title: "Error de Comunicación",
          text: "No se pudo sincronizar la nómina desde el servidor central. Verifique la conexión.",
          confirmButtonColor: "#0d6efd",
        });
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  // Recarga manual desde el botón Sincronizar
  const obtenerClientes = async () => {
    setCargando(true);
    setErrorCarga(false);
    try {
      const respuesta = await axios.get(API_URL);
      setClientes(formatearUsuarios(respuesta.data));
    } catch (err) {
      console.error("Error al sincronizar clientes:", err);
      setErrorCarga(true);
      Swal.fire({
        icon: "error",
        title: "Error de Comunicación",
        text: "No se pudo sincronizar la nómina desde el servidor central. Verifique la conexión.",
        confirmButtonColor: "#0d6efd",
      });
    } finally {
      setCargando(false);
    }
  };

  const handleBusquedaChange = (valor) => {
    if (valor) {
      setSearchParams({ q: valor }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !dni.trim() || !plan) {
      Swal.fire({
        icon: "warning",
        title: "Campos requeridos",
        text: "Complete el nombre, DNI y plan comercial del cliente.",
        confirmButtonColor: "#0d6efd",
      });
      return;
    }

    if (!/^\d{7,8}$/.test(dni.trim())) {
      Swal.fire({
        icon: "warning",
        title: "Documento inválido",
        text: "El DNI debe tener entre 7 y 8 dígitos numéricos sin puntos.",
        confirmButtonColor: "#0d6efd",
      });
      return;
    }

    const maxIdActual = clientes.reduce((max, c) => {
      const numero = parseInt(c.id.replace(/\D/g, ""), 10);
      return !Number.isNaN(numero) && numero > max ? numero : max;
    }, 1000);

    const nuevoCliente = {
      id: `#${maxIdActual + 1}`,
      nombre: nombre.trim(),
      dni: dni.trim(),
      email: `${nombre.trim().toLowerCase().replace(/\s+/g, ".")}@clientes.isp.net`,
      ciudad: "San Miguel de Tucumán",
      plan,
      ip: ip.trim() || `192.168.10.${Math.floor(Math.random() * 200) + 25}`,
      estado: "Habilitado",
      fechaAlta: new Date().toLocaleDateString("es-AR"),
    };

    setClientes([nuevoCliente, ...clientes]);
    setNombre("");
    setDni("");
    setPlan("");
    setIp("");

    Swal.fire({
      icon: "success",
      title: "Cliente Registrado",
      text: `El servicio de ${nuevoCliente.nombre} (${nuevoCliente.id}) fue dado de alta correctamente.`,
      confirmButtonColor: "#0d6efd",
    });
  };

  const handleAbrirModal = (cliente) => {
    setClienteSeleccionado(cliente);
    setMostrarModal(true);
  };

  const handleToggleEstado = () => {
    if (!clienteSeleccionado) return;
    const nuevoEstado =
      clienteSeleccionado.estado === "Habilitado" ? "Suspendido" : "Habilitado";
    const accion = nuevoEstado === "Suspendido" ? "suspender" : "habilitar";

    Swal.fire({
      title: `¿Desea ${accion} el servicio?`,
      text: `El cliente ${clienteSeleccionado.nombre} pasará a estado ${nuevoEstado}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: nuevoEstado === "Suspendido" ? "#dc3545" : "#198754",
      cancelButtonColor: "#6c757d",
      confirmButtonText: `Sí, ${accion}`,
      cancelButtonText: "Cancelar",
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        setClientes((prev) =>
          prev.map((c) =>
            c.id === clienteSeleccionado.id ? { ...c, estado: nuevoEstado } : c,
          ),
        );
        setClienteSeleccionado({
          ...clienteSeleccionado,
          estado: nuevoEstado,
        });

        Swal.fire({
          icon: "success",
          title: "Estado Actualizado",
          text: `El servicio ahora se encuentra ${nuevoEstado}.`,
          confirmButtonColor: "#0d6efd",
        });
      }
    });
  };

  const handleEliminarCliente = (cliente) => {
    Swal.fire({
      title: `¿Dar de baja a ${cliente.nombre}?`,
      text: `Se liberará la IP ${cliente.ip} del padrón activo.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((res) => {
      if (res.isConfirmed) {
        setClientes((prev) => prev.filter((c) => c.id !== cliente.id));
        Swal.fire({
          icon: "success",
          title: "Cliente Eliminado",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const totalHabilitados = clientes.filter(
    (c) => c.estado === "Habilitado",
  ).length;
  const totalSuspendidos = clientes.filter(
    (c) => c.estado === "Suspendido",
  ).length;

  const datosApiladosPorPlan = PLANES_DISPONIBLES.map((p) => ({
    nombre: p
      .replace("Fibra Óptica ", "Fibra ")
      .replace("Inalámbrico ", "WiFi "),
    habilitados: clientes.filter(
      (c) => c.plan === p && c.estado === "Habilitado",
    ).length,
    suspendidos: clientes.filter(
      (c) => c.plan === p && c.estado === "Suspendido",
    ).length,
  }));

  const datosEstado = [
    { name: "Habilitados", value: totalHabilitados, color: "#10b981" },
    { name: "Suspendidos", value: totalSuspendidos, color: "#ef4444" },
  ];

  const clientesFiltrados = clientes.filter((c) => {
    const termino = busqueda.toLowerCase();
    const coincideTexto =
      c.nombre.toLowerCase().includes(termino) ||
      c.dni.includes(termino) ||
      c.ip.includes(termino);
    const coincideEstado =
      filtroEstado === "Todos" || c.estado === filtroEstado;
    return coincideTexto && coincideEstado;
  });

  const contadoresFiltro = {
    Todos: clientes.length,
    Habilitado: totalHabilitados,
    Suspendido: totalSuspendidos,
  };

  const porcentajeActivo = clientes.length
    ? Math.round((totalHabilitados / clientes.length) * 100)
    : 0;

  return (
    <div className="fade-in">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
        <div>
          <h1 className="h5 fw-bold text-body mb-0">
            Padrón General de Clientes y Enlaces
          </h1>
          <small className="text-body-secondary">
            Administración de altas, direcciones IP asignadas y distribución por
            plan
          </small>
        </div>

        <button
          type="button"
          className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-2"
          onClick={obtenerClientes}
          disabled={cargando}
        >
          <i className={`bi bi-arrow-clockwise ${cargando ? "spin" : ""}`}></i>
          <span>Sincronizar con Servidor</span>
        </button>
      </div>

      <section className="row g-3 mb-3" aria-label="Gráficos del padrón">
        <div className="col-12 col-lg-8">
          <div className="bg-body border rounded-1 h-100 overflow-hidden">
            <div className="bg-body-tertiary border-bottom px-3 py-2 d-flex justify-content-between align-items-center">
              <h2 className="small fw-bold text-uppercase mb-0 text-body">
                Clientes Habilitados vs. Suspendidos por Plan
              </h2>
              <span className="font-monospace small text-body-secondary">
                Total: {clientes.length} abonados
              </span>
            </div>
            <div className="p-2" style={{ width: "100%", height: "175px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={datosApiladosPorPlan}
                  margin={{ top: 15, right: 12, left: -22, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="2 2"
                    stroke="rgba(148, 163, 184, 0.15)"
                  />
                  <XAxis
                    dataKey="nombre"
                    tick={{ fontSize: 11, fill: "#64748b" }}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 11, fill: "#64748b" }}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(148, 163, 184, 0.1)" }}
                    contentStyle={ESTILO_TOOLTIP}
                    itemStyle={{ color: "#f8fafc" }}
                    labelStyle={{ color: "#94a3b8", fontWeight: "bold" }}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                  <Bar
                    dataKey="habilitados"
                    name="Habilitados"
                    stackId="a"
                    fill="#10b981"
                    isAnimationActive={true}
                  >
                    <LabelList
                      dataKey="habilitados"
                      position="inside"
                      formatter={(v) => (v > 0 ? v : "")}
                      style={{
                        fill: "#ffffff",
                        fontSize: "10px",
                        fontWeight: "bold",
                      }}
                    />
                  </Bar>
                  <Bar
                    dataKey="suspendidos"
                    name="Suspendidos"
                    stackId="a"
                    fill="#ef4444"
                    radius={[3, 3, 0, 0]}
                    isAnimationActive={true}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="bg-body border rounded-1 h-100 overflow-hidden d-flex flex-column justify-content-between">
            <div className="bg-body-tertiary border-bottom px-3 py-2 d-flex justify-content-between align-items-center">
              <h2 className="small fw-bold text-uppercase mb-0 text-body">
                Tasa de Servicio Activo
              </h2>
              <span className="badge bg-success-subtle text-success font-monospace">
                {porcentajeActivo}% ONLINE
              </span>
            </div>
            <div className="p-2 d-flex align-items-center justify-content-around my-auto">
              <div
                className="position-relative d-flex align-items-center justify-content-center"
                style={{ width: "135px", height: "135px" }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={datosEstado}
                      cx="50%"
                      cy="50%"
                      innerRadius={38}
                      outerRadius={58}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="none"
                      isAnimationActive={true}
                    >
                      {datosEstado.map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={ESTILO_TOOLTIP}
                      itemStyle={{ color: "#f8fafc" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <span className="position-absolute font-monospace fw-bold small text-body">
                  {porcentajeActivo}%
                </span>
              </div>

              <div className="small font-monospace">
                <div className="mb-2 text-success fw-bold">
                  [ACT] {totalHabilitados} activos
                </div>
                <div className="text-danger fw-bold">
                  [SUS] {totalSuspendidos} cortados
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-3" aria-label="Registro de nuevo cliente">
        <div className="bg-body border rounded-1 overflow-hidden">
          <div className="bg-body-tertiary border-bottom px-3 py-2 d-flex justify-content-between align-items-center">
            <h2 className="small fw-bold text-uppercase mb-0 text-body">
              Registrar Nuevo Cliente en el Padrón
            </h2>
            <span className="font-monospace small text-body-secondary">
              Rango IP automático: 192.168.10.x
            </span>
          </div>

          <form onSubmit={handleSubmit} className="p-3">
            <div className="row g-2 align-items-end">
              <div className="col-12 col-md-3">
                <label
                  htmlFor="nombreCliente"
                  className="form-label fw-semibold small mb-1"
                >
                  Nombre y Apellido
                </label>
                <input
                  id="nombreCliente"
                  type="text"
                  className="form-control form-control-sm bg-body"
                  placeholder="Ej. Roberto Sánchez"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 col-sm-6 col-md-2">
                <label
                  htmlFor="dniCliente"
                  className="form-label fw-semibold small mb-1"
                >
                  DNI (sin puntos)
                </label>
                <input
                  id="dniCliente"
                  type="text"
                  inputMode="numeric"
                  className="form-control form-control-sm bg-body font-monospace"
                  placeholder="34567890"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 col-sm-6 col-md-3">
                <label
                  htmlFor="planCliente"
                  className="form-label fw-semibold small mb-1"
                >
                  Plan Contratado
                </label>
                <select
                  id="planCliente"
                  className="form-select form-select-sm bg-body"
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Seleccione un plan...
                  </option>
                  {PLANES_DISPONIBLES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-sm-6 col-md-2">
                <label
                  htmlFor="ipCliente"
                  className="form-label fw-semibold small mb-1"
                >
                  Dirección IP (Opcional)
                </label>
                <input
                  id="ipCliente"
                  type="text"
                  className="form-control form-control-sm bg-body font-monospace"
                  placeholder="192.168.10.x"
                  value={ip}
                  onChange={(e) => setIp(e.target.value)}
                />
              </div>
              <div className="col-12 col-sm-6 col-md-2">
                <button
                  type="submit"
                  className="btn btn-sm btn-primary w-100 fw-semibold"
                >
                  Dar de Alta
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section aria-label="Listado de clientes">
        <div className="bg-body border rounded-1 overflow-hidden">
          <div className="bg-body-tertiary border-bottom px-3 py-2 d-flex flex-wrap justify-content-between align-items-center gap-2">
            <div
              className="btn-group btn-group-sm"
              role="group"
              aria-label="Filtro por estado"
            >
              {["Todos", "Habilitado", "Suspendido"].map((est) => (
                <button
                  key={est}
                  type="button"
                  className={`btn ${
                    filtroEstado === est
                      ? "btn-primary"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => setFiltroEstado(est)}
                >
                  {est} ({contadoresFiltro[est]})
                </button>
              ))}
            </div>

            <div
              className="input-group input-group-sm"
              style={{ width: "250px" }}
            >
              <span className="input-group-text bg-body border-end-0 text-body-secondary">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="search"
                className="form-control bg-body border-start-0"
                placeholder="Filtrar por nombre, DNI o IP..."
                aria-label="Filtrar por nombre, DNI o IP"
                value={busqueda}
                onChange={(e) => handleBusquedaChange(e.target.value)}
              />
            </div>
          </div>

          <div className="table-responsive">
            {cargando ? (
              <div className="text-center py-5">
                <div
                  className="spinner-border spinner-border-sm text-primary"
                  role="status"
                >
                  <span className="visually-hidden">Cargando clientes...</span>
                </div>
                <p className="text-body-secondary small mt-2 mb-0">
                  Sincronizando nómina de clientes con el servidor...
                </p>
              </div>
            ) : errorCarga ? (
              <div className="text-center py-5">
                <h2 className="h6 fw-bold text-danger mb-1">
                  Error de Conexión con la API
                </h2>
                <p className="text-body-secondary small mb-3">
                  No se pudieron obtener los datos desde {API_URL}
                </p>
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={obtenerClientes}
                >
                  Reintentar sincronización
                </button>
              </div>
            ) : (
              <table className="table table-hover align-middle mb-0 small">
                <thead className="bg-body-tertiary text-body-secondary">
                  <tr>
                    <th scope="col" className="ps-3">
                      Estado
                    </th>
                    <th scope="col">N° Cliente</th>
                    <th scope="col">Titular</th>
                    <th scope="col">Correo Electrónico</th>
                    <th scope="col">DNI</th>
                    <th scope="col">Plan Activo</th>
                    <th scope="col">IP Asignada</th>
                    <th scope="col" className="pe-3 text-end">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clientesFiltrados.map((c) => (
                    <tr key={c.id}>
                      <td className="ps-3">
                        <span
                          className={`badge font-monospace ${
                            c.estado === "Habilitado"
                              ? "bg-success-subtle text-success border border-success-subtle"
                              : "bg-danger-subtle text-danger border border-danger-subtle"
                          }`}
                        >
                          {c.estado === "Habilitado" ? "[ACT]" : "[SUS]"}
                        </span>
                      </td>
                      <td className="font-monospace fw-semibold text-body-secondary">
                        {c.id}
                      </td>
                      <td className="fw-semibold text-body">{c.nombre}</td>
                      <td className="text-body-secondary">{c.email}</td>
                      <td className="font-monospace text-body-secondary">
                        {c.dni}
                      </td>
                      <td>{c.plan}</td>
                      <td className="font-monospace">{c.ip}</td>
                      <td className="pe-3 text-end text-nowrap">
                        <div className="btn-group btn-group-sm">
                          <button
                            type="button"
                            className="btn btn-outline-secondary py-0 px-2"
                            onClick={() => handleAbrirModal(c)}
                          >
                            Ver Ficha
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger py-0 px-2"
                            onClick={() => handleEliminarCliente(c)}
                            title="Dar de baja"
                            aria-label={`Dar de baja a ${c.nombre}`}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {clientesFiltrados.length === 0 && (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-center py-4 text-body-secondary"
                      >
                        No se encontraron clientes con ese criterio de búsqueda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>

      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
        <Modal.Header
          closeButton
          className="bg-body-tertiary border-bottom py-2"
        >
          <Modal.Title className="h6 fw-bold mb-0">
            Ficha Técnica del Cliente {clienteSeleccionado?.id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="small bg-body">
          {clienteSeleccionado && (
            <table className="table table-sm mb-0">
              <tbody>
                <tr>
                  <td className="text-body-secondary">Titular del Servicio</td>
                  <td className="text-end fw-semibold">
                    {clienteSeleccionado.nombre}
                  </td>
                </tr>
                <tr>
                  <td className="text-body-secondary">DNI / Documento</td>
                  <td className="text-end font-monospace">
                    {clienteSeleccionado.dni}
                  </td>
                </tr>
                <tr>
                  <td className="text-body-secondary">Correo de Contacto</td>
                  <td className="text-end">{clienteSeleccionado.email}</td>
                </tr>
                <tr>
                  <td className="text-body-secondary">Localidad</td>
                  <td className="text-end">{clienteSeleccionado.ciudad}</td>
                </tr>
                <tr>
                  <td className="text-body-secondary">Plan Contratado</td>
                  <td className="text-end fw-semibold">
                    {clienteSeleccionado.plan}
                  </td>
                </tr>
                <tr>
                  <td className="text-body-secondary">Dirección IP Asignada</td>
                  <td className="text-end font-monospace">
                    {clienteSeleccionado.ip}
                  </td>
                </tr>
                <tr>
                  <td className="text-body-secondary border-bottom-0">
                    Estado Actual
                  </td>
                  <td className="text-end border-bottom-0">
                    <span
                      className={`badge font-monospace ${
                        clienteSeleccionado.estado === "Habilitado"
                          ? "bg-success-subtle text-success border border-success-subtle"
                          : "bg-danger-subtle text-danger border border-danger-subtle"
                      }`}
                    >
                      {clienteSeleccionado.estado.toUpperCase()}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between bg-body-tertiary border-top py-2">
          <Button
            variant={
              clienteSeleccionado?.estado === "Habilitado"
                ? "outline-danger"
                : "outline-success"
            }
            size="sm"
            onClick={handleToggleEstado}
          >
            {clienteSeleccionado?.estado === "Habilitado"
              ? "Suspender Servicio"
              : "Reactivar Servicio"}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setMostrarModal(false)}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ClientesPage;
