import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  ComposedChart,
  Bar,
  Line,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  RadarChart,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from "recharts";

const PLANES = [
  {
    id: "PLAN-BASICO",
    codigo: "FTTH-50M",
    nombre: "Plan Básico Residencial",
    velocidad: "50 Mbps",
    bajada: 50,
    subida: 25,
    rafagaNum: 60,
    porcentajeArco: 35,
    colorArco: "#06b6d4",
    bajadaSubida: "50 Mbps / 25 Mbps",
    prioridad: "Estándar (Nivel 4)",
    tipoIp: "IP Privada (CGNAT)",
    equipo: "Módem Fibra Wi-Fi 5",
    canalesTv: "60+ canales HD",
    precioMensual: 8000,
    caracteristicas: [
      "50 Mbps de bajada y 25 Mbps de subida",
      "Recomendado para 1 a 3 dispositivos simultáneos",
      "Módem óptico Wi-Fi Dual Band en comodato",
      "Soporte técnico estándar en 24 hs",
    ],
  },
  {
    id: "PLAN-HOGAR",
    codigo: "FTTH-150M",
    nombre: "Plan Hogar Fibra Simétrica",
    velocidad: "150 Mbps",
    bajada: 150,
    subida: 150,
    rafagaNum: 180,
    porcentajeArco: 68,
    colorArco: "#8b5cf6",
    bajadaSubida: "150 Mbps / 150 Mbps",
    prioridad: "Alta (Nivel 2)",
    tipoIp: "IP Dinámica Pública",
    equipo: "Módem Fibra Wi-Fi 6",
    canalesTv: "125+ canales HD",
    precioMensual: 12000,
    caracteristicas: [
      "150 Mbps simétricos (misma velocidad de subida y bajada)",
      "Ideal para hogares con teletrabajo y streaming 4K",
      "Router Wi-Fi 6 de alta cobertura incluido",
      "Prioridad de atención en mesa de ayuda",
    ],
  },
  {
    id: "PLAN-PREMIUM",
    codigo: "FTTH-300M",
    nombre: "Plan Corporativo / Dedicado",
    velocidad: "300 Mbps",
    bajada: 300,
    subida: 300,
    rafagaNum: 350,
    porcentajeArco: 100,
    colorArco: "#3b82f6",
    bajadaSubida: "300 Mbps / 300 Mbps",
    prioridad: "Máxima (Nivel 1)",
    tipoIp: "IP Pública Fija",
    equipo: "Router MikroTik + ONT Bridge",
    canalesTv: "Pack TV Full + IP Fija",
    precioMensual: 18000,
    caracteristicas: [
      "300 Mbps simétricos con prioridad máxima en la red",
      "Dirección IP Pública Fija para cámaras o servidores",
      "Reemplazo de equipo en el día ante fallas",
      "Soporte técnico preferencial 24/7",
    ],
  },
];

const DATOS_RADAR = [
  { metrica: "Descarga", Basico: 45, Hogar: 80, Corporativo: 100 },
  { metrica: "Subida", Basico: 35, Hogar: 80, Corporativo: 100 },
  { metrica: "Alcance Wi-Fi", Basico: 60, Hogar: 90, Corporativo: 95 },
  { metrica: "Estabilidad QoS", Basico: 65, Hogar: 85, Corporativo: 100 },
  { metrica: "Soporte NOC", Basico: 60, Hogar: 85, Corporativo: 100 },
];

const ESTILO_TOOLTIP = {
  backgroundColor: "rgba(15, 23, 42, 0.96)",
  borderColor: "#334155",
  color: "#f8fafc",
  borderRadius: "4px",
  fontSize: "12px",
};

const PlanesPage = () => {
  const [esAnual, setEsAnual] = useState(() => {
    const guardado = localStorage.getItem("facturacion_anual");
    return guardado ? JSON.parse(guardado) : false;
  });

  const [planSeleccionadoId, setPlanSeleccionadoId] = useState("PLAN-HOGAR");
  const [vistaGrafico, setVistaGrafico] = useState("barras");

  useEffect(() => {
    localStorage.setItem("facturacion_anual", JSON.stringify(esAnual));
  }, [esAnual]);

  const planActivo =
    PLANES.find((p) => p.id === planSeleccionadoId) || PLANES[0];

  const calcularPrecioMensual = (precioBase) =>
    esAnual ? Math.round(precioBase * 0.85) : precioBase;

  const datosVelocimetro = [
    {
      name: planActivo.nombre,
      value: planActivo.porcentajeArco,
      fill: planActivo.colorArco,
    },
  ];

  const handleConfirmarPlan = (plan) => {
    setPlanSeleccionadoId(plan.id);
    Swal.fire({
      title: "Plan Comercial Aplicado",
      text: `Se seleccionó el ${plan.nombre} (${plan.velocidad}) con facturación ${
        esAnual ? "Anual (-15% de descuento)" : "Mensual"
      }.`,
      icon: "success",
      timer: 2200,
      showConfirmButton: false,
    });
  };

  return (
    <div className="fade-in">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
        <div>
          <h1 className="h5 fw-bold text-body mb-0">
            Catálogo Técnico de Planes y Velocidades
          </h1>
          <small className="text-body-secondary">
            Parámetros de velocidad, prioridad de red y comparativa gráfica
          </small>
        </div>

        <div
          className="btn-group btn-group-sm"
          role="group"
          aria-label="Modalidad de facturación"
        >
          <button
            type="button"
            className={`btn ${
              !esAnual ? "btn-primary" : "btn-outline-secondary"
            }`}
            onClick={() => setEsAnual(false)}
          >
            Facturación Mensual
          </button>
          <button
            type="button"
            className={`btn ${
              esAnual ? "btn-primary" : "btn-outline-secondary"
            }`}
            onClick={() => setEsAnual(true)}
          >
            Facturación Anual (15% Descuento)
          </button>
        </div>
      </div>

      <div className="row g-3 align-items-stretch">
        <div className="col-12 col-lg-8 d-flex flex-column gap-3">
          <section
            className="bg-body border rounded-1 overflow-hidden"
            aria-label="Tabla comparativa de planes"
          >
            <div className="bg-body-tertiary border-bottom px-3 py-2 d-flex justify-content-between align-items-center">
              <h2 className="small fw-bold text-uppercase mb-0 text-body">
                Tabla Comparativa de Perfiles de Servicio
              </h2>
              <span className="font-monospace small text-body-secondary">
                Seleccione una fila para inspeccionar el plan
              </span>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 small">
                <thead className="bg-body-tertiary text-body-secondary">
                  <tr>
                    <th scope="col" className="ps-3">
                      Estado
                    </th>
                    <th scope="col">Código</th>
                    <th scope="col">Plan Comercial</th>
                    <th scope="col">Bajada / Subida</th>
                    <th scope="col">Prioridad</th>
                    <th scope="col">Tipo de IP</th>
                    <th scope="col" className="text-end pe-3">
                      Valor {esAnual ? "(con -15%)" : "Mensual"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PLANES.map((plan) => {
                    const seleccionado = plan.id === planActivo.id;
                    const precio = calcularPrecioMensual(plan.precioMensual);
                    return (
                      <tr
                        key={plan.id}
                        onClick={() => setPlanSeleccionadoId(plan.id)}
                        style={{ cursor: "pointer" }}
                        className={seleccionado ? "table-active" : ""}
                      >
                        <td className="ps-3">
                          <span
                            className={`badge font-monospace ${
                              seleccionado
                                ? "bg-primary-subtle text-primary border border-primary-subtle"
                                : "bg-secondary-subtle text-secondary border border-secondary-subtle"
                            }`}
                          >
                            {seleccionado ? "[ACTIVO]" : "[DISP]"}
                          </span>
                        </td>
                        <td className="font-monospace fw-semibold text-body-secondary">
                          {plan.codigo}
                        </td>
                        <td className="fw-semibold text-body">{plan.nombre}</td>
                        <td className="font-monospace">{plan.bajadaSubida}</td>
                        <td>{plan.prioridad}</td>
                        <td>{plan.tipoIp}</td>
                        <td className="text-end pe-3 font-monospace fw-bold text-body">
                          ${precio.toLocaleString("es-AR")}/mes
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section
            className="bg-body border rounded-1 overflow-hidden flex-grow-1 d-flex flex-column"
            aria-label="Gráfico comparativo de velocidades"
          >
            <div className="bg-body-tertiary border-bottom px-3 py-2 d-flex flex-wrap justify-content-between align-items-center gap-2">
              <h2 className="small fw-bold text-uppercase mb-0 text-body">
                {vistaGrafico === "barras"
                  ? "Curva de Ráfaga Máxima vs. Caudal Simétrico (Mbps)"
                  : "Radar Comparativo de Prestaciones Técnicas (%)"}
              </h2>
              <div className="btn-group btn-group-sm" role="group">
                <button
                  type="button"
                  className={`btn py-0 ${
                    vistaGrafico === "barras"
                      ? "btn-primary"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => setVistaGrafico("barras")}
                >
                  Caudal Mbps
                </button>
                <button
                  type="button"
                  className={`btn py-0 ${
                    vistaGrafico === "radar"
                      ? "btn-primary"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => setVistaGrafico("radar")}
                >
                  Radar Técnico
                </button>
              </div>
            </div>

            <div
              className="p-3 my-auto"
              style={{ width: "100%", height: "260px" }}
            >
              <ResponsiveContainer width="100%" height="100%">
                {vistaGrafico === "barras" ? (
                  <ComposedChart
                    data={PLANES}
                    margin={{ top: 18, right: 16, left: -15, bottom: 0 }}
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
                      domain={[0, 400]}
                      tick={{ fontSize: 11, fill: "#64748b" }}
                      unit=" M"
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(148, 163, 184, 0.1)" }}
                      contentStyle={ESTILO_TOOLTIP}
                      itemStyle={{ color: "#f8fafc" }}
                      labelStyle={{ color: "#94a3b8", fontWeight: "bold" }}
                      formatter={(val) => `${val} Mbps`}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    <Bar
                      dataKey="bajada"
                      name="Bajada Estable"
                      fill="#3b82f6"
                      radius={[3, 3, 0, 0]}
                      barSize={34}
                    />
                    <Bar
                      dataKey="subida"
                      name="Subida Estable"
                      fill="#06b6d4"
                      radius={[3, 3, 0, 0]}
                      barSize={34}
                    />
                    <Line
                      type="monotone"
                      dataKey="rafagaNum"
                      name="Pico de Ráfaga"
                      stroke="#f59e0b"
                      strokeWidth={2.5}
                      dot={{ r: 5, fill: "#f59e0b" }}
                    >
                      <LabelList
                        dataKey="rafagaNum"
                        position="top"
                        formatter={(v) => `${v}M`}
                        style={{
                          fontSize: "10px",
                          fill: "#f59e0b",
                          fontWeight: "bold",
                        }}
                      />
                    </Line>
                  </ComposedChart>
                ) : (
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="75%"
                    data={DATOS_RADAR}
                  >
                    <PolarGrid stroke="rgba(148, 163, 184, 0.25)" />
                    <PolarAngleAxis
                      dataKey="metrica"
                      tick={{ fontSize: 11, fill: "#94a3b8" }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 100]}
                      tick={false}
                      axisLine={false}
                    />
                    <Radar
                      name="Plan Básico (50M)"
                      dataKey="Basico"
                      stroke="#06b6d4"
                      fill="#06b6d4"
                      fillOpacity={0.25}
                    />
                    <Radar
                      name="Plan Hogar (150M)"
                      dataKey="Hogar"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.35}
                    />
                    <Radar
                      name="Corporativo (300M)"
                      dataKey="Corporativo"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.4}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    <Tooltip
                      contentStyle={ESTILO_TOOLTIP}
                      itemStyle={{ color: "#f8fafc" }}
                    />
                  </RadarChart>
                )}
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        <div className="col-12 col-lg-4">
          <section
            className="bg-body border rounded-1 overflow-hidden h-100 d-flex flex-column justify-content-between"
            aria-label="Detalle del plan seleccionado"
          >
            <div>
              <div
                className="px-3 py-2 d-flex justify-content-between align-items-center text-white"
                style={{
                  background:
                    "linear-gradient(90deg, #312e81 0%, #6d28d9 100%)",
                }}
              >
                <h2 className="small fw-bold text-uppercase mb-0">
                  {planActivo.nombre}
                </h2>
                <span className="font-monospace small fw-bold">
                  {planActivo.codigo}
                </span>
              </div>

              <div className="p-3">
                <div className="bg-body-tertiary border rounded-1 p-2 mb-3">
                  <div className="row align-items-center g-2">
                    <div className="col-6 ps-2">
                      <div className="mb-2">
                        <span
                          className="text-info fw-bold text-uppercase d-block font-monospace"
                          style={{ fontSize: "0.68rem" }}
                        >
                          Internet Fibra
                        </span>
                        <span className="h5 fw-bold text-body font-monospace d-block mb-0">
                          {planActivo.bajada} Mbps
                        </span>
                        <small
                          className="text-body-secondary"
                          style={{ fontSize: "0.7rem" }}
                        >
                          Velocidad de bajada
                        </small>
                      </div>

                      <div>
                        <span
                          className="text-info fw-bold text-uppercase d-block font-monospace"
                          style={{ fontSize: "0.68rem" }}
                        >
                          Ráfaga / Extra
                        </span>
                        <span className="h6 fw-bold text-body font-monospace d-block mb-0">
                          {planActivo.rafagaNum} Mbps
                        </span>
                        <small
                          className="text-body-secondary"
                          style={{ fontSize: "0.7rem" }}
                        >
                          {planActivo.canalesTv}
                        </small>
                      </div>
                    </div>

                    <div className="col-6 d-flex justify-content-center">
                      <div
                        className="position-relative d-flex align-items-center justify-content-center"
                        style={{ width: "130px", height: "130px" }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <RadialBarChart
                            cx="50%"
                            cy="50%"
                            innerRadius="72%"
                            outerRadius="100%"
                            barSize={10}
                            data={datosVelocimetro}
                            startAngle={225}
                            endAngle={-45}
                          >
                            <PolarAngleAxis
                              type="number"
                              domain={[0, 100]}
                              angleAxisId={0}
                              tick={false}
                            />
                            <RadialBar
                              background={{
                                fill: "rgba(148, 163, 184, 0.16)",
                              }}
                              dataKey="value"
                              cornerRadius={10}
                              isAnimationActive={true}
                            />
                          </RadialBarChart>
                        </ResponsiveContainer>
                        <div className="position-absolute text-center lh-1">
                          <span className="h3 fw-bold font-monospace d-block mb-0 text-body">
                            {planActivo.bajada}
                          </span>
                          <small
                            className="text-body-secondary font-monospace fw-semibold"
                            style={{ fontSize: "0.72rem" }}
                          >
                            Mbps
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <table className="table table-sm mb-3 small">
                  <tbody>
                    <tr>
                      <td className="text-body-secondary ps-0">
                        Velocidad Simétrica
                      </td>
                      <td className="text-end font-monospace fw-semibold pe-0">
                        {planActivo.bajadaSubida}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-body-secondary ps-0">
                        Equipo en Comodato
                      </td>
                      <td className="text-end fw-semibold pe-0">
                        {planActivo.equipo}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-body-secondary ps-0">
                        Tipo de Dirección IP
                      </td>
                      <td className="text-end pe-0">{planActivo.tipoIp}</td>
                    </tr>
                  </tbody>
                </table>

                <ul className="list-unstyled small mb-3">
                  {planActivo.caracteristicas.map((item, idx) => (
                    <li
                      key={idx}
                      className="py-1 d-flex align-items-start gap-2 text-body"
                    >
                      <i className="bi bi-check2 text-info fw-bold"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="d-flex justify-content-between align-items-baseline pt-2 border-top">
                  <span className="text-body-secondary small fw-semibold">
                    Abono {esAnual ? "Mensual (-15%)" : "Mensual"}:
                  </span>
                  <div className="text-end">
                    <span className="h3 fw-bold text-info font-monospace mb-0">
                      $
                      {calcularPrecioMensual(
                        planActivo.precioMensual
                      ).toLocaleString("es-AR")}
                    </span>
                    <small className="text-body-secondary font-monospace">
                      /mes
                    </small>
                    {esAnual && (
                      <small className="d-block text-success font-monospace fw-semibold">
                        Anual: $
                        {(
                          calcularPrecioMensual(planActivo.precioMensual) * 12
                        ).toLocaleString("es-AR")}
                      </small>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 border-top bg-body-tertiary">
              <button
                type="button"
                onClick={() => handleConfirmarPlan(planActivo)}
                className="btn btn-sm btn-primary w-100 fw-semibold py-2"
              >
                Confirmar y Seleccionar {planActivo.nombre}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PlanesPage;