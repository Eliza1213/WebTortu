import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId"); // Verificamos ambos

  return token && userId ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;