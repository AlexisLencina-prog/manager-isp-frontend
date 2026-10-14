import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import KpiCard from "../Components/KpiCard";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  LabelList,
  ResponsiveContainer,
} from "recharts";

const NODOS_RED = [
  {
    id: "NOD-01",
    nombre: "Troncal Centro",
    zona: "Área Central / Plaza Independencia",
    lat: -26.8305,
    lng: -65.2038,
    tecnologia: "OLT Huawei MA5608T",
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
    tecnologia: "MikroTik CCR2004",
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
    tecnologia: "Ubiquiti airFiber 5X",
    latencia: 24,
    abonados: 320,
    capacidad: 92,
    potenciaOptica: "-24.8 dBm",
    estado: "Mantenimiento",
  },
];

const HISTORIAL_BASE = [
  { hora: "02:00", downstream: 1.4, upstream: 0.7 },
  { hora: "06:00", downstream: 2.1, upstream: 1.1 },
  { hora: "10:00", downstream: 3.4, upstream: 1.8 },
  { hora: "14:00", downstream: 3.9, upstream: 2.0 },
  { hora: "18:00", downstream: 4.4, upstream: 2.4 },
];

const TooltipGrafana = ({ active, payload, label, unidad = "Gbps" }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      className="p-2 rounded-1 border shadow-sm font-monospace small"
      style={{
        backgroundColor: "rgba(15, 23, 42, 0.96)",
        borderColor: "#334155",
        color: "#f8fafc",
        fontSize: "0.75rem",
      }}
    >
      <div className="fw-bold border-bottom border-secondary pb-1 mb-1">
        Lectura: {label}
      </div>
      {payload.map((item, idx) => (
        <div key={idx} className="d-flex justify-content-between gap-3">
          <span style={{ color: item.color || "#38bdf8" }}>● {item.name}:</span>
          <strong>
            {item.value} {unidad}
          </strong>
        </div>
      ))}
    </div>
  );
};

const DashboardPage = ({ trafico = 3.8, setTrafico }) => {
  const [nodos, setNodos] = useState(NODOS_RED);
  const [nodoActivoId, setNodoActivoId] = useState(NODOS_RED[0].id);
  const [filtroTexto, setFiltroTexto] = useState("");

  // Derivación reactiva del nodo activo para que su latencia se actualice en vivo
  const nodoActivo = nodos.find((n) => n.id === nodoActivoId) || nodos[0];

  // El último punto del gráfico refleja siempre el tráfico actual
  const traficoActual = Number(trafico) || 3.8;
  const subidaActual = parseFloat((traficoActual * 0.52).toFixed(1));
  const datosGrafico = [
    ...HISTORIAL_BASE,
    { hora: "22:00", downstream: traficoActual, upstream: subidaActual },
  ];

  // Muestreo automático cada 8 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      const variacion = parseFloat(
        (Math.random() * (4.7 - 2.8) + 2.8).toFixed(1),
      );
      if (setTrafico) {
        setTrafico(variacion);
      }

      setNodos((prevNodos) =>
        prevNodos.map((nodo) => {
          const delta = Math.floor(Math.random() * 5) - 2;
          const nuevaLatencia = Math.max(5, nodo.latencia + delta);
          return { ...nodo, latencia: nuevaLatencia };
        }),
      );
    }, 8000);

    return () => clearInterval(intervalo);
  }, [setTrafico]);

  const handleProbarNodo = (nodo) => {
    Swal.fire({
      title: `Probando respuesta: ${nodo.nombre}`,
      html: "Enviando paquetes ICMP y verificando nivel óptico...",
      timer: 800,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then(() => {
      Swal.fire({
        title: `Diagnóstico: ${nodo.nombre}`,
        html: `Respuesta recibida correctamente.<br><b>Latencia actual:</b> ${nodo.latencia} ms<br><b>Señal óptica:</b> ${nodo.potenciaOptica}`,
        icon: "info",
        confirmButtonColor: "#0d6efd",
      });
    });
  };

  const nodosFiltrados = nodos.filter(
    (n) =>
      n.nombre.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      n.zona.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      n.estado.toLowerCase().includes(filtroTexto.toLowerCase()),
  );

  const valoresBajada = datosGrafico.map((d) => d.downstream);
  const valoresSubida = datosGrafico.map((d) => d.upstream);
  const minBajada = Math.min(...valoresBajada).toFixed(1);
  const maxBajada = Math.max(...valoresBajada).toFixed(1);
  const promBajada = (
    valoresBajada.reduce((a, b) => a + b, 0) / valoresBajada.length
  ).toFixed(2);
  const minSubida = Math.min(...valoresSubida).toFixed(1);
  const maxSubida = Math.max(...valoresSubida).toFixed(1);
  const promSubida = (
    valoresSubida.reduce((a, b) => a + b, 0) / valoresSubida.length
  ).toFixed(2);
  const porcentajeWan = Math.round((traficoActual / 6) * 100);

  return (
    <div className="fade-in">
      <div className="bg-body border rounded-1 px-3 py-2 mb-3 d-flex flex-wrap justify-content-between align-items-center gap-2">
        <div className="d-flex align-items-center gap-2">
          <span className="pulse-dot"></span>
          <h1 className="h6 fw-bold text-body mb-0">
            Monitor General del Centro de Operaciones (NOC)
          </h1>
        </div>
        <div className="d-flex flex-wrap align-items-center gap-3 small font-monospace">
          <span>
            Clientes conectados: <strong className="text-body">1,420</strong>
          </span>
          <span className="border-start ps-3">
            Disponibilidad mensual:{" "}
            <strong className="text-success">99.98%</strong>
          </span>
          <Link
            to="/soporte"
            className="border-start ps-3 text-danger fw-bold text-decoration-none"
          >
            Reclamos abiertos: 3 (Ver cola &rarr;)
          </Link>
        </div>
      </div>

      <section
        className="row g-3 mb-3 align-items-stretch"
        aria-label="Tráfico y capacidad del sistema"
      >
        <div className="col-12 col-lg-8">
          <div className="bg-body border rounded-1 h-100 d-flex flex-column justify-content-between overflow-hidden">
            <div className="bg-body-tertiary border-bottom px-3 py-2 d-flex flex-wrap justify-content-between align-items-center gap-2">
              <h2 className="small fw-bold text-uppercase mb-0 text-body">
                Consumo de Ancho de Banda en Tiempo Real (Umbral: 4.5 Gbps)
              </h2>
              <span className="font-monospace small text-body-secondary">
                Muestreo automático: 8s
              </span>
            </div>

            <div
              className="p-3 pb-1"
              style={{ width: "100%", height: "255px" }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={datosGrafico}
                  margin={{ top: 14, right: 16, left: -18, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorDown" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#3b82f6"
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="95%"
                        stopColor="#3b82f6"
                        stopOpacity={0.02}
                      />
                    </linearGradient>
                    <linearGradient id="colorUp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop
                        offset="95%"
                        stopColor="#06b6d4"
                        stopOpacity={0.02}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="2 2"
                    stroke="rgba(148, 163, 184, 0.2)"
                  />
                  <XAxis
                    dataKey="hora"
                    tick={{ fontSize: 11, fill: "#64748b" }}
                  />
                  <YAxis
                    domain={[0, 5.2]}
                    tick={{ fontSize: 11, fill: "#64748b" }}
                    unit=" G"
                  />
                  <Tooltip
                    cursor={{
                      stroke: "rgba(148, 163, 184, 0.3)",
                      strokeWidth: 1,
                    }}
                    content={<TooltipGrafana unidad="Gbps" />}
                  />
                  <ReferenceLine
                    y={4.5}
                    stroke="#ef4444"
                    strokeDasharray="4 4"
                    label={{
                      value: "Umbral Crítico (4.5G)",
                      position: "insideTopRight",
                      fill: "#ef4444",
                      fontSize: 11,
                    }}
                  />
                  <Area
                    type="linear"
                    dataKey="downstream"
                    name="Bajada (RX)"
                    stroke="#3b82f6"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: "#3b82f6" }}
                    activeDot={{ r: 6 }}
                    fillOpacity={1}
                    fill="url(#colorDown)"
                    isAnimationActive={true}
                  />
                  <Area
                    type="linear"
                    dataKey="upstream"
                    name="Subida (TX)"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#06b6d4" }}
                    activeDot={{ r: 5 }}
                    fillOpacity={1}
                    fill="url(#colorUp)"
                    isAnimationActive={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="px-3 pb-3">
              <div className="table-responsive border rounded-1">
                <table className="table table-sm mb-0 small">
                  <thead className="bg-body-tertiary text-body-secondary">
                    <tr>
                      <th scope="col">Canal de Tráfico</th>
                      <th scope="col" className="text-end">
                        Mínimo
                      </th>
                      <th scope="col" className="text-end">
                        Máximo
                      </th>
                      <th scope="col" className="text-end">
                        Promedio
                      </th>
                      <th scope="col" className="text-end">
                        Valor Actual
                      </th>
                    </tr>
                  </thead>
                  <tbody className="font-monospace">
                    <tr>
                      <td>
                        <span className="badge text-bg-primary me-2">RX</span>
                        <span className="fw-semibold">
                          Descarga / Bajada (Downstream)
                        </span>
                      </td>
                      <td className="text-end">{minBajada} Gbps</td>
                      <td className="text-end">{maxBajada} Gbps</td>
                      <td className="text-end">{promBajada} Gbps</td>
                      <td className="text-end fw-bold text-primary">
                        {traficoActual.toFixed(1)} Gbps
                      </td>
                    </tr>
                    <tr>
                      <td className="border-bottom-0">
                        <span className="badge text-bg-info me-2">TX</span>
                        <span className="fw-semibold">
                          Subida / Envío (Upstream)
                        </span>
                      </td>
                      <td className="text-end border-bottom-0">
                        {minSubida} Gbps
                      </td>
                      <td className="text-end border-bottom-0">
                        {maxSubida} Gbps
                      </td>
                      <td className="text-end border-bottom-0">
                        {promSubida} Gbps
                      </td>
                      <td className="text-end fw-bold text-info border-bottom-0">
                        {subidaActual.toFixed(1)} Gbps
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4 d-flex flex-column gap-3">
          <div className="bg-body border rounded-1 overflow-hidden">
            <div className="bg-body-tertiary border-bottom px-3 py-2 d-flex justify-content-between align-items-center">
              <h2 className="small fw-bold text-uppercase mb-0 text-body">
                Capacidad y Recursos
              </h2>
              <span className="font-monospace small text-body-secondary">
                TIEMPO REAL
              </span>
            </div>
            <div className="p-3 py-2">
              <KpiCard
                titulo="Uso del Troncal Principal"
                valorActual={`${traficoActual.toFixed(1)} Gbps`}
                capacidadTotal="6.0 Gbps"
                porcentaje={porcentajeWan}
                colorBarra="bg-primary"
                detalle="Caudal óptico agregado"
              />
              <KpiCard
                titulo="Clientes Aprovisionados"
                valorActual="1,420"
                capacidadTotal="1,600 cupos"
                porcentaje={89}
                colorBarra="bg-info"
                detalle="28 altas nuevas este mes"
              />
              <KpiCard
                titulo="Nodos de Fibra Operativos"
                valorActual="2 activos"
                capacidadTotal="3 totales"
                porcentaje={98}
                colorBarra="bg-success"
                detalle="1 en mantenimiento (NOD-03)"
              />
              <KpiCard
                titulo="Eficiencia de Guardia NOC"
                valorActual="7 resueltos"
                capacidadTotal="10 tickets"
                porcentaje={70}
                colorBarra="bg-warning"
                detalle="3 reclamos pendientes"
                isLast={true}
              />
            </div>
          </div>

          <div className="bg-body border rounded-1 overflow-hidden flex-grow-1 d-flex flex-column">
            <div className="bg-body-tertiary border-bottom px-3 py-2 d-flex justify-content-between align-items-center">
              <h2 className="small fw-bold text-uppercase mb-0 text-body">
                Latencia por Nodo (Límite SLA: 20 ms)
              </h2>
              <span className="badge bg-success-subtle text-success border border-success-subtle font-monospace">
                ICMP VIVO
              </span>
            </div>
            <div
              className="p-2 flex-grow-1"
              style={{ width: "100%", minHeight: "145px" }}
            >
              <ResponsiveContainer width="100%" height={140}>
                <BarChart
                  data={nodos}
                  margin={{ top: 18, right: 12, left: -22, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="2 2"
                    stroke="rgba(148, 163, 184, 0.15)"
                  />
                  <XAxis
                    dataKey="nombre"
                    tick={{ fontSize: 10, fill: "#64748b" }}
                  />
                  <YAxis
                    domain={[0, 32]}
                    tick={{ fontSize: 10, fill: "#64748b" }}
                    unit="ms"
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(148, 163, 184, 0.1)" }}
                    content={<TooltipGrafana unidad="ms" />}
                  />
                  <ReferenceLine
                    y={20}
                    stroke="#f59e0b"
                    strokeDasharray="3 3"
                  />
                  <Bar
                    dataKey="latencia"
                    name="Latencia"
                    radius={[3, 3, 0, 0]}
                    isAnimationActive={true}
                  >
                    <LabelList
                      dataKey="latencia"
                      position="top"
                      formatter={(v) => `${v}ms`}
                      style={{ fontSize: "10px", fill: "#94a3b8" }}
                    />
                    {nodos.map((n) => (
                      <Cell
                        key={n.id}
                        fill={n.latencia > 20 ? "#f59e0b" : "#10b981"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-3" aria-label="Mapa de nodos y detalles técnicos">
        <div className="bg-body border rounded-1 overflow-hidden">
          <div className="bg-body-tertiary border-bottom px-3 py-2 d-flex flex-wrap justify-content-between align-items-center gap-2">
            <h2 className="small fw-bold text-uppercase mb-0 text-body">
              Ubicación Geográfica y Ficha Técnica por Nodo
            </h2>
            <div
              className="btn-group btn-group-sm"
              role="group"
              aria-label="Seleccionar nodo"
            >
              {nodos.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  className={`btn ${
                    nodoActivo.id === n.id
                      ? "btn-primary"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => setNodoActivoId(n.id)}
                >
                  {n.nombre}
                </button>
              ))}
            </div>
          </div>

          <div className="row g-0">
            <div className="col-12 col-lg-8 border-end p-3">
              <div
                className="w-100 overflow-hidden border rounded-1"
                style={{ height: "310px" }}
              >
                <iframe
                  title={`Mapa de ubicación de ${nodoActivo.nombre}`}
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

            <div className="col-12 col-lg-4 p-3 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="font-monospace small fw-bold text-body-secondary">
                    CÓDIGO: {nodoActivo.id}
                  </span>
                  <span
                    className={`badge font-monospace ${
                      nodoActivo.estado === "Operativo"
                        ? "bg-success-subtle text-success border border-success-subtle"
                        : "bg-warning-subtle text-warning border border-warning-subtle"
                    }`}
                  >
                    {nodoActivo.estado === "Operativo"
                      ? "[ACTIVO]"
                      : "[MANTENIMIENTO]"}
                  </span>
                </div>

                <h3 className="h5 fw-bold text-body mb-1">
                  {nodoActivo.nombre}
                </h3>
                <p className="text-body-secondary small mb-3">
                  {nodoActivo.zona}
                </p>

                <table className="table table-sm mb-3 small">
                  <tbody>
                    <tr>
                      <td className="text-body-secondary ps-0">
                        Equipo Principal
                      </td>
                      <td className="text-end fw-semibold pe-0">
                        {nodoActivo.tecnologia}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-body-secondary ps-0">
                        Tiempo de Respuesta (Latencia)
                      </td>
                      <td className="text-end font-monospace fw-bold text-success pe-0">
                        {nodoActivo.latencia} ms
                      </td>
                    </tr>
                    <tr>
                      <td className="text-body-secondary ps-0">
                        Nivel de Señal Óptica
                      </td>
                      <td className="text-end font-monospace fw-semibold pe-0">
                        {nodoActivo.potenciaOptica}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-body-secondary ps-0">
                        Clientes Conectados
                      </td>
                      <td className="text-end font-monospace fw-semibold pe-0">
                        {nodoActivo.abonados} hogares
                      </td>
                    </tr>
                  </tbody>
                </table>

                <KpiCard
                  titulo="Nivel de Ocupación del Nodo"
                  valorActual={`${nodoActivo.abonados} ONTs`}
                  capacidadTotal=""
                  porcentaje={nodoActivo.capacidad}
                  colorBarra={
                    nodoActivo.capacidad > 90
                      ? "bg-danger"
                      : nodoActivo.capacidad > 75
                        ? "bg-warning"
                        : "bg-primary"
                  }
                  detalle="Capacidad de puertos ópticos"
                  isLast={true}
                />
              </div>

              <button
                type="button"
                className="btn btn-sm btn-outline-primary w-100 fw-semibold mt-2"
                onClick={() => handleProbarNodo(nodoActivo)}
              >
                Probar Respuesta del Nodo
              </button>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Tabla de nodos de red">
        <div className="bg-body border rounded-1 overflow-hidden">
          <div className="bg-body-tertiary border-bottom px-3 py-2 d-flex justify-content-between align-items-center flex-wrap gap-2">
            <h2 className="small fw-bold text-uppercase mb-0 text-body">
              Listado de Nodos de la Red
            </h2>
            <div style={{ width: "240px" }}>
              <input
                type="search"
                className="form-control form-control-sm bg-body"
                placeholder="Filtrar por nombre, zona o estado..."
                aria-label="Filtrar nodos"
                value={filtroTexto}
                onChange={(e) => setFiltroTexto(e.target.value)}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 small">
              <thead className="bg-body-tertiary text-body-secondary">
                <tr>
                  <th scope="col" className="ps-3">
                    Estado
                  </th>
                  <th scope="col">Código</th>
                  <th scope="col">Nombre del Nodo / Zona</th>
                  <th scope="col">Equipo Instalado</th>
                  <th scope="col">Clientes</th>
                  <th scope="col" className="pe-3">
                    Latencia
                  </th>
                </tr>
              </thead>
              <tbody>
                {nodosFiltrados.map((nodo) => (
                  <tr
                    key={nodo.id}
                    onClick={() => setNodoActivoId(nodo.id)}
                    style={{ cursor: "pointer" }}
                    className={nodoActivo.id === nodo.id ? "table-active" : ""}
                  >
                    <td className="ps-3">
                      <span
                        className={`badge font-monospace ${
                          nodo.estado === "Operativo"
                            ? "bg-success-subtle text-success border border-success-subtle"
                            : "bg-warning-subtle text-warning border border-warning-subtle"
                        }`}
                      >
                        {nodo.estado === "Operativo" ? "[OK]" : "[MANT]"}
                      </span>
                    </td>
                    <td className="font-monospace fw-semibold text-body-secondary">
                      {nodo.id}
                    </td>
                    <td>
                      <span className="fw-semibold text-body">
                        {nodo.nombre}
                      </span>
                      <span className="text-body-secondary ms-2 small">
                        ({nodo.zona})
                      </span>
                    </td>
                    <td className="font-monospace">{nodo.tecnologia}</td>
                    <td className="font-monospace">{nodo.abonados}</td>
                    <td className="pe-3 font-monospace text-success fw-bold">
                      {nodo.latencia} ms
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

export default DashboardPage;
