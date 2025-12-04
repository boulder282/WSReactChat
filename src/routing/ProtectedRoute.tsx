import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = () => {
    // Проверяем наличие данных в localStorage
    const userEmail = localStorage.getItem("userEmail");
    const userPassword = localStorage.getItem("userPassword");
    return !!(userEmail && userPassword);
  };

  if (!isAuthenticated()) {
    // Если не авторизован - перенаправляем на страницу авторизации
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
