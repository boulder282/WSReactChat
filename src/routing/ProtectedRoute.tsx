import { Navigate } from "react-router";
import getWithExpiry from "../functions/getWithExpiry";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = () => {
    // Проверяем наличие данных в localStorage
    const userEmail = getWithExpiry("userEmail");
    const userPassword = getWithExpiry("userPassword");
    return !!(userEmail && userPassword);
  };

  if (!isAuthenticated()) {
    // Если не авторизован - перенаправляем на страницу авторизации
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
