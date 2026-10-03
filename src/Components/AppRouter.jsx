import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from '../Pages/DashboardPage';
import ClientesPage from '../Pages/ClientesPage';
import PlanesPage from '../Pages/PlanesPage';
import SoportePage from '../Pages/SoportePage';
import NotFoundPage from '../Pages/NotFoundPage';

const AppRouter = ({ trafico }) => {
  return (
    <Routes>
      {/* Rutas principales del módulo base */}
      <Route path='/' element={<DashboardPage trafico={trafico} />} />
      <Route path='/clientes' element={<ClientesPage />} />

      {/* Rutas integradas para el TP6 */}
      <Route path='/planes' element={<PlanesPage />} />
      <Route path='/soporte' element={<SoportePage />} />

      {/* Ruta comodín para control de errores 404 */}
      <Route path='/404' element={<NotFoundPage />} />
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Routes>
  );
};

export default AppRouter;