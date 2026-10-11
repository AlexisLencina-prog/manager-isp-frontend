import React, { useState, useEffect } from "react";
import KpiCard from "../Components/KpiCard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const NODOS_RED = [
  {
    id: "NOD-01",
    nombre: "Troncal Centro",
    zona: "Área Central / Plaza Independencia",
    lat: -26.8305,
    lng: -65.2038,
    tecnologia: "OLT Huawei 5608T",
    latencia: 8,
    abonados: 620,
    capacidad: 85,
    potenciaOptica: "-19.4 dBm",
    estado: "Operativo",
  },
  {
    id: "NOD-02",
    nombre: "Anillo Norte",
    zona: "Sector Norte / Av. Sarmiento",
    lat: -26.8142,
    lng: -65.201,
    tecnologia: "Mikrotik CCR2004",
    latencia: 11,
    abonados: 480,
    capacidad: 68,
    potenciaOptica: "-21.2 dBm",
    estado: "Operativo",
  },
  {
    id: "NOD-03",
    nombre: "Subestación Sur",
    zona: "Sector Sur / Canal Sur",
    lat: -26.852,
    lng: -65.228,
    tecnologia: "Ubiquiti AirFiber 5X",
    latencia: 24,
    abonados: 320,
    capacidad: 92,
    potenciaOptica: "-24.8 dBm",
    estado: "Mantenimiento",
  },
];

const HISTORIAL_TRAFICO = [
  { hora: "02:00", downstream: 1.4, upstream: 0.7 },
  { hora: "06:00", downstream: 2.1, upstream: 1.1 },
  { hora: "10:00", downstream: 3.4, upstream: 1.8 },
  { hora: "14:00", downstream: 3.9, upstream: 2.0 },
  { hora: "18:00", downstream: 4.4, upstream: 2.4 },
  { hora: "22:00", downstream: 3.8, upstream: 1.9 },
];

const DashboardPage = () => {
  const [nodos, setNodos] = useState(NODOS_RED);
  const [nodoActivo, setNodoActivo] = useState(NODOS_RED[0]);
  const [traficoVivo, setTraficoVivo] = useState(3.8);
  const [filtroTexto, setFiltroTexto] = useState("");
  const [datosGrafico, setDatosGrafico] = useState(HISTORIAL_TRAFICO);

  useEffect(() => {
    const intervalo = setInterval(() => {
      const variacion = parseFloat(
        (Math.random() * (4.7 - 2.8) + 2.8).toFixed(1),
      );
      setTraficoVivo(variacion);

      setDatosGrafico((prev) => {
        const copia = [...prev];
        copia[copia.length - 1] = {
          ...copia[copia.length - 1],
          downstream: variacion,
          upstream: parseFloat((variacion * 0.52).toFixed(1)),
        };
        return copia;
      });

      setNodos((prevNodos) =>
        prevNodos.map((nodo) => {
          const delta = Math.floor(Math.random() * 5) - 2;
          const nuevaLatencia = Math.max(5, nodo.latencia + delta);
          return { ...nodo, latencia: nuevaLatencia };
        }),
      );
    }, 8000);

    return () => clearInterval(intervalo);
  }, []);

  const nodosFiltrados = nodos.filter(
    (n) =>
      n.nombre.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      n.zona.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      n.estado.toLowerCase().includes(filtroTexto.toLowerCase()),
  );

  return (
    <>
      {/* Banner de Estado NOC */}
      <section className="mb-3" aria-label="Estado general">
        <div className="card border rounded-3 p-3 bg-white shadow-sm">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1 d-inline-flex align-items-center gap-2">
                <span
                  className="rounded-circle bg-success"
                  style={{ width: "8px", height: "8px" }}
                ></span>
                Troncal GPON Online
              </span>
              <span className="fw-bold text-dark small">
                Disponibilidad de Red: 99.98% SLA
              </span>
            </div>
            <div className="text-secondary small d-flex align-items-center gap-2">
              <span className="badge bg-light text-secondary border">
                Sincronización NOC cada 8s
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Tarjetas KPI */}
      <section className="mb-4" aria-label="Métricas operativas">
        <div className="row g-3">
          <KpiCard
            titulo="Abonados Conectados"
            valor="1,420"
            badgeTexto="+14.8%"
            badgeClase="bg-success-subtle text-success border border-success-subtle"
            icono="bi-people-fill"
            colorIcono="bg-primary-subtle text-primary"
            subtitulo="Crecimiento intermensual"
          />
          <KpiCard
            titulo="Tráfico Backbone"
            valor={`${traficoVivo} Gbps`}
            badgeTexto="Simétrico"
            badgeClase="bg-info-subtle text-info-emphasis border border-info-subtle"
            icono="bi-activity"
            colorIcono="bg-info-subtle text-info-emphasis"
            subtitulo="Monitoreo en vivo"
          />
          <KpiCard
            titulo="Disponibilidad GPON"
            valor="98.5%"
            badgeTexto="Óptimo"
            badgeClase="bg-success-subtle text-success border border-success-subtle"
            icono="bi-hdd-network-fill"
            colorIcono="bg-success-subtle text-success"
            subtitulo="Tolerancia a fallos OK"
          />
          <KpiCard
            titulo="Alertas Activas"
            valor="3"
            badgeTexto="Guardia NOC"
            badgeClase="bg-warning-subtle text-warning-emphasis border border-warning-subtle"
            icono="bi-exclamation-triangle"
            colorIcono="bg-warning-subtle text-warning-emphasis"
            subtitulo="Atención técnica requerida"
          />
        </div>
      </section>

      {/* Telemetría con Recharts */}
      <section className="mb-4" aria-label="Telemetría de tráfico en vivo">
        <div className="card border rounded-3 bg-white shadow-sm p-3 p-md-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
            <div>
              <h2 className="h6 fw-bold mb-1 text-dark">
                Telemetría de Tráfico en Tiempo Real
              </h2>
              <p className="text-secondary small mb-0">
                Consumo acumulado en el nodo de salida (Gbps)
              </p>
            </div>
            <div>
              <span className="badge bg-primary-subtle text-primary border border-primary-subtle small px-2 py-1">
                <i className="bi bi-speedometer2 me-1"></i> {traficoVivo} Gbps
                actual
              </span>
            </div>
          </div>

          <div style={{ width: "100%", height: "240px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={datosGrafico}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorDown" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d6efd" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#0d6efd" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorUp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0dcaf0" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#0dcaf0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="hora"
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  stroke="#cbd5e1"
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  stroke="#cbd5e1"
                  unit="G"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#e2e8f0",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
                />
                <Area
                  type="monotone"
                  dataKey="downstream"
                  name="Downstream (Gbps)"
                  stroke="#0d6efd"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorDown)"
                />
                <Area
                  type="monotone"
                  dataKey="upstream"
                  name="Upstream (Gbps)"
                  stroke="#0dcaf0"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorUp)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Mapa Satelital y Ficha Técnica Equilibrada */}
      <section className="mb-4" aria-label="Mapa cartográfico de cobertura">
        <div className="card border rounded-3 bg-white shadow-sm overflow-hidden">
          {/* Cabecera con selector de nodos limpio */}
          <div className="p-3 border-bottom d-flex flex-wrap justify-content-between align-items-center gap-2">
            <div>
              <h2 className="h6 fw-bold mb-0 text-dark">
                Topología de Nodos y Cobertura Satelital
              </h2>
              <small className="text-secondary">
                Inspección geográfica del tendido urbano
              </small>
            </div>

            {/* Botones de selección ordenados en la cabecera */}
            <div
              className="btn-group btn-group-sm"
              role="group"
              aria-label="Seleccionar nodo"
            >
              {nodos.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  className={`btn ${nodoActivo.id === n.id ? "btn-primary" : "btn-outline-secondary"}`}
                  onClick={() => setNodoActivo(n)}
                >
                  <i className="bi bi-geo-alt me-1"></i>
                  {n.nombre}
                </button>
              ))}
            </div>
          </div>

          <div className="row g-0">
            {/* Contenedor del Mapa con margen propio (no pegado al borde) */}
            <div className="col-12 col-lg-8 border-end p-3">
              <div
                className="w-100 rounded-3 overflow-hidden border shadow-sm"
                style={{ height: "340px" }}
              >
                <iframe
                  title="Ubicación del Nodo NOC"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${nodoActivo.lat},${nodoActivo.lng}&z=15&output=embed`}
                ></iframe>
              </div>
            </div>

            {/* Ficha técnica en cuadrícula de métricas limpias */}
            <div className="col-12 col-lg-4 p-3 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge bg-light text-secondary border small">
                    {nodoActivo.id}
                  </span>
                  <span
                    className={`badge ${nodoActivo.estado === "Operativo" ? "bg-success-subtle text-success" : "bg-warning-subtle text-warning-emphasis"} small`}
                  >
                    {nodoActivo.estado}
                  </span>
                </div>

                <h3 className="h6 fw-bold text-dark mb-0">
                  {nodoActivo.nombre}
                </h3>
                <small className="text-muted d-block mb-3">
                  {nodoActivo.zona}
                </small>

                {/* Grid de 4 datos clave */}
                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <div className="p-2 bg-light rounded-2 border text-center">
                      <span
                        className="text-secondary d-block"
                        style={{ fontSize: "0.68rem" }}
                      >
                        LATENCIA
                      </span>
                      <strong className="text-success small">
                        {nodoActivo.latencia} ms
                      </strong>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-2 bg-light rounded-2 border text-center">
                      <span
                        className="text-secondary d-block"
                        style={{ fontSize: "0.68rem" }}
                      >
                        POTENCIA RX
                      </span>
                      <strong className="text-dark small">
                        {nodoActivo.potenciaOptica}
                      </strong>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-2 bg-light rounded-2 border text-center">
                      <span
                        className="text-secondary d-block"
                        style={{ fontSize: "0.68rem" }}
                      >
                        ABONADOS
                      </span>
                      <strong className="text-dark small">
                        {nodoActivo.abonados}
                      </strong>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-2 bg-light rounded-2 border text-center">
                      <span
                        className="text-secondary d-block"
                        style={{ fontSize: "0.68rem" }}
                      >
                        HARDWARE
                      </span>
                      <strong
                        className="text-truncate d-block text-dark"
                        style={{ fontSize: "0.72rem" }}
                      >
                        {nodoActivo.tecnologia}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Nivel de saturación */}
                <div className="p-2 bg-light rounded-2 border">
                  <div className="d-flex justify-content-between mb-1 small">
                    <span
                      className="text-secondary"
                      style={{ fontSize: "0.75rem" }}
                    >
                      Saturación de puerto:
                    </span>
                    <strong className="text-dark">
                      {nodoActivo.capacidad}%
                    </strong>
                  </div>
                  <div className="progress" style={{ height: "6px" }}>
                    <div
                      className={`progress-bar ${nodoActivo.capacidad > 90 ? "bg-danger" : nodoActivo.capacidad > 75 ? "bg-warning" : "bg-primary"}`}
                      style={{ width: `${nodoActivo.capacidad}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-sm btn-outline-primary w-100 fw-semibold mt-3"
                onClick={() =>
                  alert(
                    `Auditoría de loopback y ping enviada a ${nodoActivo.nombre}`,
                  )
                }
              >
                <i className="bi bi-activity me-1"></i> Auditar Tráfico del Nodo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Inventario de Nodos */}
      <section aria-label="Inventario de nodos">
        <div className="card border rounded-3 bg-white shadow-sm overflow-hidden">
          <div className="p-3 border-bottom d-flex justify-content-between align-items-center flex-wrap gap-2">
            <h2 className="h6 fw-bold mb-0 text-dark">
              Inventario de Nodos Troncales
            </h2>
            <div style={{ width: "220px" }}>
              <input
                type="search"
                className="form-control form-control-sm"
                placeholder="Filtrar por zona o nodo..."
                value={filtroTexto}
                onChange={(e) => setFiltroTexto(e.target.value)}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 small">
              <thead className="table-light text-secondary">
                <tr>
                  <th scope="col" className="ps-3">
                    ID
                  </th>
                  <th scope="col">NODO / ZONA</th>
                  <th scope="col">TECNOLOGÍA</th>
                  <th scope="col">ABONADOS</th>
                  <th scope="col">LATENCIA</th>
                  <th scope="col" className="pe-3">
                    ESTADO
                  </th>
                </tr>
              </thead>
              <tbody>
                {nodosFiltrados.map((nodo) => (
                  <tr
                    key={nodo.id}
                    onClick={() => setNodoActivo(nodo)}
                    style={{ cursor: "pointer" }}
                    className={nodoActivo.id === nodo.id ? "table-active" : ""}
                  >
                    <td className="ps-3 fw-bold text-secondary">{nodo.id}</td>
                    <td>
                      <span className="fw-semibold text-dark">
                        {nodo.nombre}
                      </span>
                      <small className="text-muted d-block">{nodo.zona}</small>
                    </td>
                    <td>
                      <span className="badge bg-light text-secondary border">
                        {nodo.tecnologia}
                      </span>
                    </td>
                    <td>{nodo.abonados}</td>
                    <td className="text-success fw-bold">{nodo.latencia} ms</td>
                    <td className="pe-3">
                      <span
                        className={`badge ${nodo.estado === "Operativo" ? "bg-success-subtle text-success" : "bg-warning-subtle text-warning-emphasis"}`}
                      >
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
