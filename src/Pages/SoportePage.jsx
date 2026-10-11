import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const TICKETS_INICIALES = [
  {
    id: "TK-101",
    abonado: "Carlos Gómez (AB-882)",
    falla: "Caída de fibra óptica en nodo central",
    prioridad: "Crítica",
    estado: "Abierto",
  },
  {
    id: "TK-102",
    abonado: "Empresa Alfa S.A. (AB-104)",
    falla: "Pérdida de paquetes en enlace dedicado",
    prioridad: "Alta",
    estado: "Abierto",
  },
  {
    id: "TK-103",
    abonado: "Mariana López (AB-309)",
    falla: "Lentitud y microcortes WiFi",
    prioridad: "Media",
    estado: "Abierto",
  },
  {
    id: "TK-104",
    abonado: "Roberto D'Amico (AB-012)",
    falla: "Solicitud de cambio de clave ONT",
    prioridad: "Baja",
    estado: "Resuelto",
  },
];

const DATOS_FALLAS = [
  { name: "Fibra Óptica", value: 50, color: "#dc3545" },
  { name: "WiFi / Router", value: 30, color: "#ffc107" },
  { name: "Enlace IP", value: 20, color: "#0dcaf0" },
];

export const SoportePage = () => {
  const [tickets, setTickets] = useState(TICKETS_INICIALES);
  const [fallaForm, setFallaForm] = useState("");
  const [abonadoForm, setAbonadoForm] = useState("");
  const [prioridadForm, setPrioridadForm] = useState("Media");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  const abiertos = tickets.filter((t) => t.estado === "Abierto").length;
  const resueltos = tickets.filter((t) => t.estado === "Resuelto").length;

  useEffect(() => {
    document.title = `(${abiertos}) Tickets Abiertos - ISP Manager`;
    return () => {
      document.title = "ISP MANAGER - Sistema de Gestión NOC";
    };
  }, [abiertos]);

  const handleResolver = (id, abonado) => {
    Swal.fire({
      title: "¿Confirmar resolución?",
      text: `¿Deseas marcar como resuelta la incidencia ${id} de ${abonado}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, resolver",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setTickets((prev) =>
          prev.map((t) => (t.id === id ? { ...t, estado: "Resuelto" } : t)),
        );
        Swal.fire({
          title: "Incidencia Resuelta",
          text: `El ticket ${id} fue cerrado con éxito en la guardia NOC.`,
          icon: "success",
          confirmButtonColor: "#0d6efd",
          timer: 2200,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleNuevoTicket = (e) => {
    e.preventDefault();

    if (!abonadoForm.trim() || !fallaForm.trim()) {
      Swal.fire({
        title: "Campos Incompletos",
        text: "Ingrese el titular o abonado y el detalle de la falla técnica.",
        icon: "warning",
        confirmButtonColor: "#0d6efd",
      });
      return;
    }

    const nuevo = {
      id: `TK-${Math.floor(100 + Math.random() * 900)}`,
      abonado: abonadoForm.trim(),
      falla: fallaForm.trim(),
      prioridad: prioridadForm,
      estado: "Abierto",
    };

    setTickets([nuevo, ...tickets]);
    setAbonadoForm("");
    setFallaForm("");

    Swal.fire({
      title: "Ticket Ingresado",
      text: `La incidencia ${nuevo.id} fue registrada en la cola activa.`,
      icon: "success",
      confirmButtonColor: "#0d6efd",
      timer: 2200,
      showConfirmButton: false,
    });
  };

  const ticketsFiltrados = tickets.filter((ticket) => {
    if (filtroEstado === "Abiertos") return ticket.estado === "Abierto";
    if (filtroEstado === "Resueltos") return ticket.estado === "Resuelto";
    return true;
  });

  const getBadgePrioridad = (prioridad) => {
    switch (prioridad) {
      case "Crítica":
      case "Alta":
        return "bg-danger-subtle text-danger border border-danger-subtle";
      case "Media":
        return "bg-warning-subtle text-warning-emphasis border border-warning-subtle";
      default:
        return "bg-secondary-subtle text-secondary border border-secondary-subtle";
    }
  };

  return (
    <>
      {/* Cabecera Técnica */}
      <section className="mb-4" aria-label="Cabecera mesa de ayuda">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div>
            <h1 className="h5 fw-bold text-body mb-1">
              Mesa de Ayuda & Tickets NOC
            </h1>
            <p className="text-body-secondary small mb-0">
              Gestión y resolución de incidencias técnicas en infraestructura
              GPON
            </p>
          </div>
          <span className="badge bg-body-secondary text-body border px-2 py-1 small">
            <i className="bi bi-headset me-1 text-primary"></i> Guardia Activa
            24/7
          </span>
        </div>
      </section>

      {/* Métricas Homogéneas */}
      <section className="row g-3 mb-4" aria-label="Métricas de incidencias">
        {/* Tarjeta 1: Abiertos */}
        <div className="col-12 col-md-4">
          <div className="card border-0 rounded-3 shadow-sm p-3 bg-body-tertiary text-body h-100">
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-body-secondary small fw-semibold">
                Tickets Abiertos
              </span>
              <div
                className="bg-danger-subtle text-danger rounded-2 p-2 d-flex align-items-center justify-content-center"
                style={{ width: "32px", height: "32px" }}
              >
                <i className="bi bi-exclamation-octagon-fill fs-6"></i>
              </div>
            </div>
            <div className="d-flex align-items-baseline gap-2 mt-2">
              <h2 className="h3 fw-bold mb-0 text-body">{abiertos}</h2>
              <span className="badge bg-danger-subtle text-danger border border-danger-subtle small">
                Atención pendiente
              </span>
            </div>
            <div
              className="text-body-secondary mt-2"
              style={{ fontSize: "0.72rem" }}
            >
              <i className="bi bi-clock-history text-danger me-1"></i> Cola
              prioritaria NOC
            </div>
          </div>
        </div>

        {/* Tarjeta 2: Resueltos */}
        <div className="col-12 col-md-4">
          <div className="card border-0 rounded-3 shadow-sm p-3 bg-body-tertiary text-body h-100">
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-body-secondary small fw-semibold">
                Tickets Resueltos
              </span>
              <div
                className="bg-success-subtle text-success rounded-2 p-2 d-flex align-items-center justify-content-center"
                style={{ width: "32px", height: "32px" }}
              >
                <i className="bi bi-check-circle-fill fs-6"></i>
              </div>
            </div>
            <div className="d-flex align-items-baseline gap-2 mt-2">
              <h2 className="h3 fw-bold mb-0 text-body">{resueltos}</h2>
              <span className="badge bg-success-subtle text-success border border-success-subtle small">
                Cerrados
              </span>
            </div>
            <div
              className="text-body-secondary mt-2"
              style={{ fontSize: "0.72rem" }}
            >
              <i className="bi bi-shield-check text-success me-1"></i> SLA de
              respuesta cumplido
            </div>
          </div>
        </div>

        {/* Tarjeta 3: Tipología con Donut y desglose lateral */}
        <div className="col-12 col-md-4">
          <div className="card border-0 rounded-3 shadow-sm p-3 bg-body-tertiary text-body h-100">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-body-secondary small fw-semibold">
                Tipología de Fallas
              </span>
              <div
                className="bg-info-subtle text-info-emphasis rounded-2 p-2 d-flex align-items-center justify-content-center"
                style={{ width: "32px", height: "32px" }}
              >
                <i className="bi bi-pie-chart-fill fs-6"></i>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between mt-1">
              {/* Desglose a la izquierda */}
              <div className="small lh-sm">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <span
                    className="rounded-circle"
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: "#dc3545",
                    }}
                  ></span>
                  <span
                    className="text-body-secondary"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Fibra:
                  </span>
                  <strong className="text-body" style={{ fontSize: "0.78rem" }}>
                    50%
                  </strong>
                </div>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <span
                    className="rounded-circle"
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: "#ffc107",
                    }}
                  ></span>
                  <span
                    className="text-body-secondary"
                    style={{ fontSize: "0.75rem" }}
                  >
                    WiFi:
                  </span>
                  <strong className="text-body" style={{ fontSize: "0.78rem" }}>
                    30%
                  </strong>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span
                    className="rounded-circle"
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: "#0dcaf0",
                    }}
                  ></span>
                  <span
                    className="text-body-secondary"
                    style={{ fontSize: "0.75rem" }}
                  >
                    IP / Red:
                  </span>
                  <strong className="text-body" style={{ fontSize: "0.78rem" }}>
                    20%
                  </strong>
                </div>
              </div>

              {/* Donut Recharts compacto a la derecha */}
              <div style={{ width: "84px", height: "84px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={DATOS_FALLAS}
                      cx="50%"
                      cy="50%"
                      innerRadius={23}
                      outerRadius={38}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                    >
                      {DATOS_FALLAS.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--bs-tertiary-bg)",
                        borderColor: "var(--bs-border-color)",
                        color: "var(--bs-body-color)",
                        borderRadius: "8px",
                        fontSize: "11px",
                        padding: "4px 8px",
                      }}
                      formatter={(value) => `${value}%`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cola de Incidencias */}
      <section className="mb-4" aria-label="Cola de incidencias">
        <div className="card border-0 rounded-3 shadow-sm overflow-hidden bg-body-tertiary text-body">
          <div className="p-3 border-bottom d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div>
              <div className="d-flex align-items-center gap-2">
                <h2 className="h6 mb-0 fw-bold text-body">
                  Cola de Incidencias en Tiempo Real
                </h2>
                <span className="badge bg-primary-subtle text-primary border border-primary-subtle small">
                  {ticketsFiltrados.length} en pantalla
                </span>
              </div>
              <small className="text-body-secondary">
                Seguimiento de eventos de enlace y reportes de abonados
              </small>
            </div>

            <div
              className="btn-group btn-group-sm"
              role="group"
              aria-label="Filtro por estado"
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
                  {estado}
                </button>
              ))}
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 small text-body">
              <thead className="table-dark text-body-secondary">
                <tr>
                  <th scope="col" className="ps-3">
                    ID
                  </th>
                  <th scope="col">ABONADO</th>
                  <th scope="col">DESCRIPCIÓN DE LA FALLA</th>
                  <th scope="col">PRIORIDAD</th>
                  <th scope="col">ESTADO</th>
                  <th scope="col" className="pe-3 text-end">
                    ACCIÓN
                  </th>
                </tr>
              </thead>
              <tbody>
                {ticketsFiltrados.map((ticket) => (
                  <tr key={ticket.id}>
                    <td className="ps-3 fw-bold text-body-secondary">
                      {ticket.id}
                    </td>
                    <td className="fw-semibold text-body">{ticket.abonado}</td>
                    <td className="text-body-secondary">{ticket.falla}</td>
                    <td>
                      <span
                        className={`badge ${getBadgePrioridad(ticket.prioridad)} px-2 py-1`}
                      >
                        {ticket.prioridad}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          ticket.estado === "Abierto"
                            ? "bg-warning-subtle text-warning-emphasis border border-warning-subtle"
                            : "bg-success-subtle text-success border border-success-subtle"
                        } px-2 py-1`}
                      >
                        {ticket.estado}
                      </span>
                    </td>
                    <td className="pe-3 text-end">
                      {ticket.estado === "Abierto" ? (
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-success py-1 px-2 fw-semibold"
                          style={{ fontSize: "0.75rem" }}
                          onClick={() =>
                            handleResolver(ticket.id, ticket.abonado)
                          }
                        >
                          <i className="bi bi-check2-circle me-1"></i> Resolver
                        </button>
                      ) : (
                        <span className="badge bg-body-secondary text-body-secondary border small">
                          Atendido
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                {ticketsFiltrados.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      No hay incidencias para mostrar en este criterio de
                      búsqueda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Formulario de Alta de Incidencias */}
      <section aria-label="Abrir incidencia">
        <div className="card border-0 rounded-3 shadow-sm p-4 bg-body-tertiary text-body">
          <div className="border-bottom pb-2 mb-3">
            <h2 className="h6 fw-bold mb-1 text-body">
              Abrir Nueva Incidencia Técnica
            </h2>
            <p className="text-body-secondary small mb-0">
              Registro inmediato en el sistema de guardias operativas
            </p>
          </div>

          <form onSubmit={handleNuevoTicket}>
            <div className="row g-3">
              <div className="col-12 col-md-5">
                <label
                  htmlFor="abonado"
                  className="form-label fw-semibold small"
                >
                  Abonado / Identificador
                </label>
                <input
                  type="text"
                  id="abonado"
                  className="form-control form-control-sm bg-body text-body"
                  placeholder="Ej. Juan Pérez (AB-501)"
                  value={abonadoForm}
                  onChange={(e) => setAbonadoForm(e.target.value)}
                  required
                />
              </div>

              <div className="col-12 col-md-4">
                <label
                  htmlFor="prioridad"
                  className="form-label fw-semibold small"
                >
                  Nivel de Prioridad
                </label>
                <select
                  id="prioridad"
                  className="form-select form-select-sm bg-body text-body"
                  value={prioridadForm}
                  onChange={(e) => setPrioridadForm(e.target.value)}
                >
                  <option value="Baja">Baja</option>
                  <option value="Media">Media</option>
                  <option value="Alta">Alta</option>
                  <option value="Crítica">Crítica</option>
                </select>
              </div>

              <div className="col-12 col-md-3 d-flex align-items-end">
                <button
                  type="submit"
                  className="btn btn-sm btn-primary w-100 fw-semibold shadow-sm"
                >
                  <i className="bi bi-plus-circle me-1"></i> Registrar Ticket
                </button>
              </div>

              <div className="col-12">
                <label htmlFor="falla" className="form-label fw-semibold small">
                  Descripción Técnica del Problema
                </label>
                <textarea
                  id="falla"
                  className="form-control form-control-sm bg-body text-body"
                  rows="2"
                  placeholder="Detalle el corte, microcorte o degradación de señal reportada..."
                  value={fallaForm}
                  onChange={(e) => setFallaForm(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default SoportePage;
