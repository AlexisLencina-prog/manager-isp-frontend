import React from 'react';

const KpiCard = ({ titulo, valor, badgeTexto, badgeClase, icono, colorIcono, pathD, strokeColor }) => {
  return (
    <div className='col-12 col-sm-6 col-xl-3'>
      <div className='card border rounded-3 p-3 bg-white shadow-sm h-100'>
        {/* Cabecera: Título a la izquierda, Ícono en caja a la derecha */}
        <div className='d-flex justify-content-between align-items-center mb-2'>
          <span className='text-secondary small fw-semibold'>{titulo}</span>
          <div 
            className={`rounded-2 p-2 d-flex align-items-center justify-content-center ${colorIcono}`} 
            style={{ width: '32px', height: '32px' }}
          >
            <i className={`bi ${icono} fs-6`}></i>
          </div>
        </div>

        {/* Valor numérico y curva Sparkline SVG */}
        <div className='d-flex justify-content-between align-items-baseline my-1'>
          <h2 className='h4 fw-bold mb-0 text-dark'>{valor}</h2>
          <div style={{ width: '60px', height: '24px' }}>
            <svg viewBox='0 0 60 24' width='100%' height='100%'>
              <path d={pathD} fill='none' stroke={strokeColor} strokeWidth='2.5' strokeLinecap='round' />
            </svg>
          </div>
        </div>

        {/* Badge de tendencia/estado */}
        <div className='mt-2'>
          <span className={`badge ${badgeClase} small px-2 py-1`}>
            {badgeTexto}
          </span>
        </div>
      </div>
    </div>
  );
};

export default KpiCard;