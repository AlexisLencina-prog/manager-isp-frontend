import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../Pages/DashboardPage";
import ClientesPage from "../Pages/ClientesPage";
import PlanesPage from "../Pages/PlanesPage";
import SoportePage from "../Pages/SoportePage";
import NotFoundPage from "../Pages/NotFoundPage";

const AppRouter = ({ trafico, setTrafico }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<DashboardPage trafico={trafico} setTrafico={setTrafico} />}
      />
      <Route path="/clientes" element={<ClientesPage />} />
      <Route path="/planes" element={<PlanesPage />} />
      <Route path="/soporte" element={<SoportePage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRouter;
