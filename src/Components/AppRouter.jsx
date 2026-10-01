import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from '../Pages/DashboardPage';
import ClientesPage from '../Pages/ClientesPage';
import NotFoundPage from '../Pages/NotFoundPage';

const AppRouter = ({ trafico }) => {
  return (
    <Routes>
      {/* Rutas principales del módulo base */}
      <Route path='/' element={<DashboardPage trafico={trafico} />} />
      <Route path='/clientes' element={<ClientesPage />} />

      {/* Rutas pendientes para la integración de Alexis */}
      <Route 
        path='/planes' 
        element={
          <div className='card border rounded-3 p-4 bg-white text-center'>
            <h2 className='h6 fw-bold text-dark'>Módulo en Integración</h2>
            <p className='text-secondary small mb-0'>La vista de perfiles comerciales y enlaces está siendo implementada en la rama correspondiente.</p>
          </div>
        } 
      />
      <Route 
        path='/soporte' 
        element={
          <div className='card border rounded-3 p-4 bg-white text-center'>
            <h2 className='h6 fw-bold text-dark'>Módulo en Integración</h2>
            <p className='text-secondary small mb-0'>La mesa de ayuda y cola de incidencias está siendo implementada en la rama correspondiente.</p>
          </div>
        } 
      />

      {/* Ruta comodín para control de errores 404 */}
      <Route path='/404' element={<NotFoundPage />} />
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Routes>
  );
};

export default AppRouter;