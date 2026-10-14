import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import KpiCard from "../Components/KpiCard";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Cell,
  LabelList,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TICKETS_INICIALES = [
  {
    id: "TK-101",
    codigoPrioridad: "P1",
    abonado: "Carlos Gómez (AB-882)",
    falla: "Corte de fibra óptica en acometida domiciliaria",
    categoria: "Fibra Óptica",
    prioridad: "Crítica",
    tiempo: "12m",
    estado: "Abierto",
  },
  {
    id: "TK-102",
    codigoPrioridad: "P2",
    abonado: "Empresa Alfa S.A. (AB-104)",
    falla: "Pérdida intermitente de paquetes en enlace dedicado",
    categoria: "Enlace IP",
    prioridad: "Alta",
    tiempo: "28m",
    estado: "Abierto",
  },
  {
    id: "TK-103",
    codigoPrioridad: "P3",
    abonado: "Mariana López (AB-309)",
    falla: "Baja señal Wi-Fi y desincronización en ONT",
    categoria: "Router / Wi-Fi",
    prioridad: "Media",
    tiempo: "45m",
    estado: "Abierto",
  },
  {
    id: "TK-104",
    codigoPrioridad: "P4",
    abonado: "Roberto D'Amico (AB-012)",
    falla: "Atenuación óptica corregida en roseta domiciliaria",
    categoria: "Fibra Óptica",
    prioridad: "Baja",
    tiempo: "1h 10m",
    estado: "Resuelto",
  },
  {
    id: "TK-105",
    codigoPrioridad: "P3",
    abonado: "Estudio Contable Sur (AB-415)",
    falla: "Reconfiguración de canales 5 GHz en router Wi-Fi 6",
    categoria: "Router / Wi-Fi",
    prioridad: "Media",
    tiempo: "1h 40m",
    estado: "Resuelto",
  },
];

const HISTORIAL_SLA = [
  { hora: "08:00", minutos: 18 },
  { hora: "10:00", minutos: 24 },
  { hora: "12:00", minutos: 29 },
  { hora: "14:00", minutos: 21 },
  { hora: "16:00", minutos: 16 },
  { hora: "18:00", minutos: 14 },
];

const COLORES_CATEGORIA = {
  "Fibra Óptica": "#ef4444",
  "Router / Wi-Fi": "#f59e0b",
  "Enlace IP": "#3b82f6",
  "Energía / ONT": "#10b981",
};

const ESTILO_TOOLTIP = {
  backgroundColor: "rgba(15, 23, 42, 0.96)",
  borderColor: "#334155",
  color: "#f8fafc",
  borderRadius: "4px",
  fontSize: "12px",
};

const SoportePage = () => {
  const [tickets, setTickets] = useState(TICKETS_INICIALES);
  const [abonadoForm, setAbonadoForm] = useState("");
  const [fallaForm, setFallaForm] = useState("");
  const [categoriaForm, setCategoriaForm] = useState("Fibra Óptica");
  const [prioridadForm, setPrioridadForm] = useState("Media");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [busquedaTicket, setBusquedaTicket] = useState("");
  const [vistaGrafico, setVistaGrafico] = useState("prioridad");

  const abiertos = tickets.filter((t) => t.estado === "Abierto").length;
  const resueltos = tickets.filter((t) => t.estado === "Resuelto").length;
  const porcentajeEficiencia = tickets.length
    ? Math.round((resueltos / tickets.length) * 100)
    : 0;

  useEffect(() => {
    document.title = `(${abiertos}) Tickets Abiertos - ISP Manager`;
    return () => {
      document.title =
        "ISP MANAGER - Sistema de Gestión NOC y Telecomunicaciones";
    };
  }, [abiertos]);

  const handleDiagnosticarTicket = (ticket) => {
    Swal.fire({
      title: `Analizando enlace: ${ticket.id}`,
      html: "Ejecutando telemetría remota sobre ONT y lectura óptica...",
      timer: 950,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then(() => {
      const potenciaSimulada =
        ticket.categoria === "Fibra Óptica"
          ? "-27.8 dBm (Alerta)"
          : "-19.2 dBm (Normal)";
      const distanciaCorte =
        ticket.categoria === "Fibra Óptica"
          ? "Corte detectado a 340 metros de caja NAP-04"
          : "Continuidad óptica sin cortes físicos";

      Swal.fire({
        icon: ticket.prioridad === "Crítica" ? "warning" : "info",
        title: `Diagnóstico Remoto: ${ticket.id}`,
        html: `
          <div class="small font-monospace text-start">
            <div><b>Abonado:</b> ${ticket.abonado}</div>
            <div><b>Categoría:</b> ${ticket.categoria}</div>
            <div><b>Potencia RX ONT:</b> ${potenciaSimulada}</div>
            <div><b>Resultado OTDR:</b> ${distanciaCorte}</div>
          </div>
        `,
        confirmButtonText: "Entendido",
        confirmButtonColor: "#0d6efd",
      });
    });
  };

  const handleResolver = (id, abonado) => {
    Swal.fire({
      title: "¿Confirmar resolución del reclamo?",
      text: `Se marcará como resuelto el ticket ${id} de ${abonado}.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, marcar resuelto",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setTickets((prev) =>
          prev.map((t) => (t.id === id ? { ...t, estado: "Resuelto" } : t)),
        );
        Swal.fire({
          title: "Reclamo Cerrado",
          text: `El ticket ${id} pasó a estado Resuelto y actualizó la métrica SLA.`,
          icon: "success",
          timer: 1800,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleReabrir = (id, abonado) => {
    Swal.fire({
      title: `¿Reabrir ticket ${id}?`,
      text: `El reclamo de ${abonado} volverá a la cola de pendientes.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, reabrir",
      cancelButtonText: "Cancelar",
    }).then((res) => {
      if (res.isConfirmed) {
        setTickets((prev) =>
          prev.map((t) => (t.id === id ? { ...t, estado: "Abierto" } : t)),
        );
      }
    });
  };

  const handleNuevoTicket = (e) => {
    e.preventDefault();
    if (!abonadoForm.trim() || !fallaForm.trim()) {
      Swal.fire({
        title: "Campos incompletos",
        text: "Complete el nombre del cliente y la descripción del problema.",
        icon: "warning",
        confirmButtonColor: "#0d6efd",
      });
      return;
    }

    const mapaCodigo = {
      Crítica: "P1",
      Alta: "P2",
      Media: "P3",
      Baja: "P4",
    };

    const nuevo = {
      id: `TK-${Math.floor(106 + Math.random() * 890)}`,
      codigoPrioridad: mapaCodigo[prioridadForm] || "P3",
      abonado: abonadoForm.trim(),
      falla: fallaForm.trim(),
      categoria: categoriaForm,
      prioridad: prioridadForm,
      tiempo: "1m",
      estado: "Abierto",
    };

    setTickets([nuevo, ...tickets]);
    setAbonadoForm("");
    setFallaForm("");

    Swal.fire({
      title: "Ticket Registrado",
      text: `Se ingresó el reclamo ${nuevo.id} (${nuevo.categoria}) en la guardia técnica.`,
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const baseCategorias = [
    { name: "Fibra Óptica", base: 8 },
    { name: "Router / Wi-Fi", base: 5 },
    { name: "Enlace IP", base: 3 },
    { name: "Energía / ONT", base: 2 },
  ];

  const conteoPorCategoria = baseCategorias.map((cat) => {
    const enLista = tickets.filter((t) => t.categoria === cat.name).length;
    return {
      name: cat.name,
      casos: cat.base + enLista,
      color: COLORES_CATEGORIA[cat.name],
    };
  });

  const totalCasosEstadistica = conteoPorCategoria.reduce(
    (acc, item) => acc + item.casos,
    0,
  );

  const datosFallasDinamicos = conteoPorCategoria.map((item) => ({
    ...item,
    porcentaje: Math.round((item.casos / totalCasosEstadistica) * 100),
  }));

  const datosPrioridad = ["Crítica", "Alta", "Media", "Baja"].map((niv) => ({
    prioridad: niv,
    abiertos: tickets.filter(
      (t) => t.prioridad === niv && t.estado === "Abierto",
    ).length,
    resueltos: tickets.filter(
      (t) => t.prioridad === niv && t.estado === "Resuelto",
    ).length,
  }));

  const datosRadial = [{ name: "Resueltos", value: porcentajeEficiencia }];

  const ticketsFiltrados = tickets.filter((ticket) => {
    const coincideEstado =
      filtroEstado === "Todos" ||
      (filtroEstado === "Abiertos" && ticket.estado === "Abierto") ||
      (filtroEstado === "Resueltos" && ticket.estado === "Resuelto");

    const termino = busquedaTicket.toLowerCase();
    const coincideTexto =
      ticket.abonado.toLowerCase().includes(termino) ||
      ticket.falla.toLowerCase().includes(termino) ||
      ticket.id.toLowerCase().includes(termino) ||
      ticket.categoria.toLowerCase().includes(termino);

    return coincideEstado && coincideTexto;
  });

  const contadores = {
    Todos: tickets.length,
    Abiertos: abiertos,
    Resueltos: resueltos,
  };

  const getBadgePrioridad = (prioridad) => {
    if (prioridad === "Crítica")
      return "bg-danger-subtle text-danger border border-danger-subtle";
    if (prioridad === "Alta")
      return "bg-warning-subtle text-warning border border-warning-subtle";
    if (prioridad === "Media")
      return "bg-info-subtle text-info border border-info-subtle";
    return "bg-secondary-subtle text-secondary border border-secondary-subtle";
  };

  return (
    <div className="fade-in">
      <div className="bg-body border rounded-1 px-3 py-2 mb-3 d-flex flex-wrap justify-content-between align-items-center gap-2">
        <div className="d-flex align-items-center gap-2">
          <span className="pulse-dot"></span>
          <h1 className="h6 fw-bold text-body mb-0">
            Mesa de Ayuda y Despacho de Reclamos Técnicos (NOC)
          </h1>
        </div>
        <div className="d-flex flex-wrap align-items-center gap-3 small font-monospace">
          <span>
            Tiempo medio de respuesta:{" "}
            <strong className="text-info">18 min</strong>
          </span>
          <span className="border-start ps-3 text-danger fw-bold">
            Pendientes: {abiertos}
          </span>
          <span className="border-start ps-3 text-success fw-bold">
            Resueltos: {resueltos}
          </span>
        </div>
      </div>

      <section className="mb-3" aria-label="Registrar nuevo reclamo">
        <div className="bg-body border rounded-1 overflow-hidden">
          <div className="bg-body-tertiary border-bottom px-3 py-2 d-flex justify-content-between align-items-center">
            <h2 className="small fw-bold text-uppercase mb-0 text-body">
              Ingresar Nuevo Reclamo Técnico
            </h2>
            <span className="font-monospace small text-body-secondary">
              Actualiza estadísticas y gráficos en tiempo real
            </span>
          </div>
          <form onSubmit={handleNuevoTicket} className="p-3">
            <div className="row g-2 align-items-end">
              <div className="col-12 col-md-3">
                <label
                  htmlFor="abonado"
                  className="form-label fw-semibold small mb-1"
                >
                  Cliente / N° de Abonado
                </label>
                <input
                  type="text"
                  id="abonado"
                  className="form-control form-control-sm bg-body"
                  placeholder="Ej. Juan Pérez (AB-501)"
                  value={abonadoForm}
                  onChange={(e) => setAbonadoForm(e.target.value)}
                  required
                />
              </div>

              <div className="col-12 col-md-3">
                <label
                  htmlFor="falla"
                  className="form-label fw-semibold small mb-1"
                >
                  Descripción del Problema
                </label>
                <input
                  type="text"
                  id="falla"
                  className="form-control form-control-sm bg-body"
                  placeholder="Detalle el corte o síntoma..."
                  value={fallaForm}
                  onChange={(e) => setFallaForm(e.target.value)}
                  required
                />
              </div>

              <div className="col-6 col-md-2">
                <label
                  htmlFor="categoria"
                  className="form-label fw-semibold small mb-1"
                >
                  Tipo de Falla
                </label>
                <select
                  id="categoria"
                  className="form-select form-select-sm bg-body"
                  value={categoriaForm}
                  onChange={(e) => setCategoriaForm(e.target.value)}
                >
                  <option value="Fibra Óptica">Fibra Óptica</option>
                  <option value="Router / Wi-Fi">Router / Wi-Fi</option>
                  <option value="Enlace IP">Enlace IP</option>
                  <option value="Energía / ONT">Energía / ONT</option>
                </select>
              </div>

              <div className="col-6 col-md-2">
                <label
                  htmlFor="prioridad"
                  className="form-label fw-semibold small mb-1"
                >
                  Prioridad
                </label>
                <select
                  id="prioridad"
                  className="form-select form-select-sm bg-body"
                  value={prioridadForm}
                  onChange={(e) => setPrioridadForm(e.target.value)}
                >
                  <option value="Baja">Baja</option>
                  <option value="Media">Media</option>
                  <option value="Alta">Alta</option>
                  <option value="Crítica">Crítica</option>
                </select>
              </div>

              <div className="col-12 col-md-2">
                <button
                  type="submit"
                  className="btn btn-sm btn-primary w-100 fw-semibold"
                >
                  Crear Ticket
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <div className="row g-3 mb-3 align-items-stretch">
        <div className="col-12 col-lg-8">
          <section
            className="bg-body border rounded-1 overflow-hidden h-100 d-flex flex-column"
            aria-label="Cola de reclamos"
          >
            <div className="bg-body-tertiary border-bottom px-3 py-2 d-flex flex-wrap justify-content-between align-items-center gap-2">
              <div
                className="btn-group btn-group-sm"
                role="group"
                aria-label="Filtrar tickets por estado"
              >
                {["Todos", "Abiertos", "Resueltos"].map((estado) => (
                  <button
                    key={estado}
                    type="button"
                    className={`btn ${
                      filtroEstado === estado
                        ? "btn-primary"
                        : "btn-outline-secondary"
                    }`}
                    onClick={() => setFiltroEstado(estado)}
                  >
                    {estado} ({contadores[estado]})
                  </button>
                ))}
              </div>

              <div
                className="input-group input-group-sm"
                style={{ width: "230px" }}
              >
                <span className="input-group-text bg-body border-end-0 text-body-secondary">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="search"
                  className="form-control bg-body border-start-0"
                  placeholder="Filtrar ticket o cliente..."
                  aria-label="Filtrar ticket o cliente"
                  value={busquedaTicket}
                  onChange={(e) => setBusquedaTicket(e.target.value)}
                />
              </div>
            </div>

            <div
              className="table-responsive flex-grow-1"
              style={{ maxHeight: "310px", overflowY: "auto" }}
            >
              <table className="table table-hover align-middle mb-0 small">
                <thead className="bg-body-tertiary text-body-secondary sticky-top">
                  <tr>
                    <th scope="col" className="ps-3">
                      Severidad
                    </th>
                    <th scope="col">Ticket</th>
                    <th scope="col">Cliente y Diagnóstico</th>
                    <th scope="col">Estado</th>
                    <th scope="col" className="pe-3 text-end">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ticketsFiltrados.map((ticket) => (
                    <tr key={ticket.id}>
                      <td className="ps-3 text-nowrap">
                        <span
                          className={`badge font-monospace ${getBadgePrioridad(
                            ticket.prioridad,
                          )}`}
                        >
                          {ticket.codigoPrioridad} -{" "}
                          {ticket.prioridad.toUpperCase()}
                        </span>
                      </td>
                      <td className="font-monospace fw-bold text-body-secondary text-nowrap">
                        {ticket.id}
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2 flex-wrap">
                          <span className="fw-semibold text-body">
                            {ticket.abonado}
                          </span>
                          <span
                            className="badge bg-body-secondary text-body-secondary border font-monospace"
                            style={{ fontSize: "0.65rem" }}
                          >
                            {ticket.categoria}
                          </span>
                        </div>
                        <div className="text-body-secondary small">
                          {ticket.falla}
                        </div>
                      </td>
                      <td className="text-nowrap">
                        <span
                          className={`badge font-monospace ${
                            ticket.estado === "Abierto"
                              ? "text-bg-warning"
                              : "text-bg-success"
                          }`}
                        >
                          {ticket.estado}
                        </span>
                        <small className="text-body-secondary font-monospace ms-2">
                          {ticket.tiempo}
                        </small>
                      </td>
                      <td className="pe-3 text-end text-nowrap">
                        <div className="btn-group btn-group-sm">
                          <button
                            type="button"
                            className="btn btn-outline-info py-0 px-2"
                            onClick={() => handleDiagnosticarTicket(ticket)}
                            title="Ejecutar prueba OTDR sobre el enlace"
                          >
                            Diagnosticar
                          </button>
                          {ticket.estado === "Abierto" ? (
                            <button
                              type="button"
                              className="btn btn-outline-success py-0 px-2"
                              onClick={() =>
                                handleResolver(ticket.id, ticket.abonado)
                              }
                            >
                              Resolver
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-outline-secondary py-0 px-2"
                              onClick={() =>
                                handleReabrir(ticket.id, ticket.abonado)
                              }
                              title="Reabrir ticket"
                            >
                              Reabrir
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {ticketsFiltrados.length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-4 text-body-secondary"
                      >
                        No hay reclamos que coincidan con el filtro aplicado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="bg-body-tertiary border-top px-3 py-1 d-flex justify-content-between align-items-center small font-monospace text-body-secondary mt-auto">
              <span>Mostrando {ticketsFiltrados.length} reclamos</span>
              <span className="text-success">● Despacho en línea</span>
            </div>
          </section>
        </div>

        <div className="col-12 col-lg-4">
          <section
            className="bg-body border rounded-1 overflow-hidden h-100 d-flex flex-column"
            aria-label="Estadística de fallas"
          >
            <div className="bg-body-tertiary border-bottom px-3 py-2 d-flex justify-content-between align-items-center">
              <h2 className="small fw-bold text-uppercase mb-0 text-body">
                Distribución por Tipo de Falla
              </h2>
              <span className="badge bg-body-secondary text-body border font-monospace">
                {totalCasosEstadistica} CASOS
              </span>
            </div>

            <div className="p-3 d-flex flex-column justify-content-between flex-grow-1">
              <div className="row align-items-center g-2 bg-body-tertiary border rounded-1 p-2 mb-2">
                <div className="col-6 d-flex justify-content-center">
                  <div
                    className="position-relative d-flex align-items-center justify-content-center"
                    style={{ width: "120px", height: "120px" }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={datosFallasDinamicos}
                          cx="50%"
                          cy="50%"
                          innerRadius={36}
                          outerRadius={55}
                          paddingAngle={3}
                          dataKey="porcentaje"
                          stroke="none"
                          isAnimationActive={true}
                        >
                          {datosFallasDinamicos.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={ESTILO_TOOLTIP}
                          itemStyle={{ color: "#f8fafc" }}
                          formatter={(value, name, props) => [
                            `${value}% (${props.payload.casos} casos)`,
                            name,
                          ]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="position-absolute text-center lh-1">
                      <span className="h5 fw-bold font-monospace text-body d-block mb-0">
                        {totalCasosEstadistica}
                      </span>
                      <small
                        className="text-body-secondary font-monospace"
                        style={{ fontSize: "0.6rem" }}
                      >
                        TOTALES
                      </small>
                    </div>
                  </div>
                </div>

                <div className="col-6 ps-2 border-start">
                  <div className="mb-2">
                    <span
                      className="text-body-secondary text-uppercase font-monospace d-block"
                      style={{ fontSize: "0.65rem" }}
                    >
                      Mayor Incidencia
                    </span>
                    <strong className="text-danger small d-block text-nowrap">
                      ● Fibra ({datosFallasDinamicos[0].porcentaje}%)
                    </strong>
                  </div>
                  <div>
                    <span
                      className="text-body-secondary text-uppercase font-monospace d-block"
                      style={{ fontSize: "0.65rem" }}
                    >
                      Cuadrillas Activas
                    </span>
                    <strong className="text-success font-monospace small d-block text-nowrap">
                      2 móviles en calle
                    </strong>
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-sm align-middle mb-0 small">
                  <thead className="bg-body-tertiary text-body-secondary">
                    <tr>
                      <th scope="col">Tipo de Falla</th>
                      <th scope="col" className="text-end">
                        Casos
                      </th>
                      <th scope="col" className="text-end">
                        Porcentaje
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {datosFallasDinamicos.map((item) => (
                      <tr key={item.name}>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <span
                              className="rounded-circle d-inline-block"
                              style={{
                                width: "8px",
                                height: "8px",
                                backgroundColor: item.color,
                              }}
                            ></span>
                            <span className="fw-semibold">{item.name}</span>
                          </div>
                        </td>
                        <td className="text-end font-monospace text-body-secondary">
                          {item.casos}
                        </td>
                        <td className="text-end font-monospace fw-bold">
                          {item.porcentaje}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="row g-3 align-items-stretch">
        <div className="col-12 col-lg-8">
          <section
            className="bg-body border rounded-1 overflow-hidden h-100 d-flex flex-column"
            aria-label="Gráfico de prioridades y tiempos de respuesta"
          >
            <div className="bg-body-tertiary border-bottom px-3 py-2 d-flex flex-wrap justify-content-between align-items-center gap-2">
              <h2 className="small fw-bold text-uppercase mb-0 text-body">
                {vistaGrafico === "prioridad"
                  ? "Volumen de Tickets por Prioridad (Abiertos vs. Resueltos)"
                  : "Evolución del Tiempo de Respuesta NOC (Umbral SLA: 30 min)"}
              </h2>
              <div className="btn-group btn-group-sm" role="group">
                <button
                  type="button"
                  className={`btn py-0 ${
                    vistaGrafico === "prioridad"
                      ? "btn-primary"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => setVistaGrafico("prioridad")}
                >
                  Por Severidad
                </button>
                <button
                  type="button"
                  className={`btn py-0 ${
                    vistaGrafico === "sla"
                      ? "btn-primary"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => setVistaGrafico("sla")}
                >
                  Curva SLA
                </button>
              </div>
            </div>

            <div
              className="p-3 my-auto"
              style={{ width: "100%", height: "235px" }}
            >
              <ResponsiveContainer width="100%" height="100%">
                {vistaGrafico === "prioridad" ? (
                  <BarChart
                    data={datosPrioridad}
                    margin={{ top: 18, right: 16, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="2 2"
                      stroke="rgba(148, 163, 184, 0.15)"
                    />
                    <XAxis
                      dataKey="prioridad"
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
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    <Bar
                      dataKey="abiertos"
                      name="Pendientes"
                      stackId="a"
                      fill="#f59e0b"
                      barSize={42}
                      isAnimationActive={true}
                    />
                    <Bar
                      dataKey="resueltos"
                      name="Resueltos"
                      stackId="a"
                      fill="#10b981"
                      barSize={42}
                      radius={[3, 3, 0, 0]}
                      isAnimationActive={true}
                    >
                      <LabelList
                        dataKey="abiertos"
                        position="top"
                        formatter={(v) => (v > 0 ? `${v} act.` : "")}
                        style={{ fontSize: "10px", fill: "#f59e0b" }}
                      />
                    </Bar>
                  </BarChart>
                ) : (
                  <AreaChart
                    data={HISTORIAL_SLA}
                    margin={{ top: 18, right: 16, left: -18, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="gradSla" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#10b981"
                          stopOpacity={0.35}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0.02}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="2 2"
                      stroke="rgba(148, 163, 184, 0.15)"
                    />
                    <XAxis
                      dataKey="hora"
                      tick={{ fontSize: 11, fill: "#64748b" }}
                    />
                    <YAxis
                      domain={[0, 40]}
                      tick={{ fontSize: 11, fill: "#64748b" }}
                      unit="m"
                    />
                    <Tooltip
                      cursor={{
                        stroke: "rgba(148, 163, 184, 0.3)",
                        strokeWidth: 1,
                      }}
                      contentStyle={ESTILO_TOOLTIP}
                      itemStyle={{ color: "#f8fafc" }}
                      formatter={(val) => `${val} min`}
                    />
                    <ReferenceLine
                      y={30}
                      stroke="#ef4444"
                      strokeDasharray="4 4"
                      label={{
                        value: "Máximo SLA (30m)",
                        position: "insideTopRight",
                        fill: "#ef4444",
                        fontSize: 11,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="minutos"
                      name="Tiempo de Respuesta"
                      stroke="#10b981"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: "#10b981" }}
                      fill="url(#gradSla)"
                      isAnimationActive={true}
                    />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        <div className="col-12 col-lg-4">
          <section
            className="bg-body border rounded-1 overflow-hidden h-100 d-flex flex-column"
            aria-label="Eficiencia de guardia"
          >
            <div className="bg-body-tertiary border-bottom px-3 py-2 d-flex justify-content-between align-items-center gap-2">
              <h2 className="small fw-bold text-uppercase mb-0 text-body">
                Eficiencia de Guardia
              </h2>
              <span className="badge bg-success-subtle text-success border border-success-subtle font-monospace">
                SLA ACTIVO
              </span>
            </div>

            <div className="p-3 d-flex flex-column justify-content-between flex-grow-1">
              <div className="row align-items-center g-2 bg-body-tertiary border rounded-1 p-2 mb-1">
                <div className="col-6 ps-2">
                  <span
                    className="text-body-secondary text-uppercase font-monospace d-block"
                    style={{ fontSize: "0.68rem" }}
                  >
                    Tasa de Cierre
                  </span>
                  <span className="h4 fw-bold font-monospace text-success d-block mb-0">
                    {porcentajeEficiencia}%
                  </span>
                  <small
                    className="text-body-secondary d-block text-nowrap"
                    style={{ fontSize: "0.72rem" }}
                  >
                    {resueltos} de {tickets.length} cerrados
                  </small>
                </div>

                <div className="col-6 d-flex justify-content-center">
                  <div
                    className="position-relative d-flex align-items-center justify-content-center"
                    style={{ width: "105px", height: "75px" }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart
                        cx="50%"
                        cy="82%"
                        innerRadius="68%"
                        outerRadius="100%"
                        barSize={12}
                        data={datosRadial}
                        startAngle={180}
                        endAngle={0}
                      >
                        <PolarAngleAxis
                          type="number"
                          domain={[0, 100]}
                          angleAxisId={0}
                          tick={false}
                        />
                        <RadialBar
                          background={{ fill: "rgba(148, 163, 184, 0.16)" }}
                          dataKey="value"
                          cornerRadius={6}
                          fill="#10b981"
                          isAnimationActive={true}
                        />
                      </RadialBarChart>
                    </ResponsiveContainer>
                    <span
                      className="position-absolute font-monospace fw-bold small text-body"
                      style={{ bottom: "4px" }}
                    >
                      {porcentajeEficiencia}%
                    </span>
                  </div>
                </div>
              </div>

              <KpiCard
                titulo="Cierre de Tickets"
                valorActual={`${resueltos}`}
                capacidadTotal={`${tickets.length}`}
                porcentaje={porcentajeEficiencia}
                colorBarra="bg-success"
                detalle="Meta operativa > 80%"
              />

              <KpiCard
                titulo="Respuesta < 30 min"
                valorActual="18 min"
                capacidadTotal="30 min"
                porcentaje={92}
                colorBarra="bg-info"
                detalle="Promedio actual de guardia"
                isLast={true}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SoportePage;
