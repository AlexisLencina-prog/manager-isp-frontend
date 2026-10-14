const KpiCard = ({
  titulo,
  valorActual,
  capacidadTotal,
  porcentaje,
  colorBarra = "bg-primary",
  detalle,
  isLast = false,
}) => {
  return (
    <div className={`py-2 ${!isLast ? "border-bottom" : ""}`}>
      <div className="d-flex justify-content-between align-items-baseline mb-1">
        <span className="fw-semibold text-body small">{titulo}</span>
        <span className="font-monospace small">
          <strong className="text-body">{valorActual}</strong>
          {capacidadTotal && (
            <span className="text-body-secondary"> / {capacidadTotal}</span>
          )}
        </span>
      </div>

      <div
        className="progress my-1"
        style={{ height: "8px" }}
        role="progressbar"
        aria-label={titulo}
        aria-valuenow={porcentaje}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className={`progress-bar progress-bar-striped ${colorBarra}`}
          style={{ width: `${porcentaje}%` }}
        ></div>
      </div>

      <div
        className="d-flex justify-content-between align-items-center text-body-secondary"
        style={{ fontSize: "0.73rem" }}
      >
        <span>{detalle}</span>
        <span className="font-monospace fw-bold text-body">{porcentaje}%</span>
      </div>
    </div>
  );
};

export default KpiCard;
