import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { authReady, isAuthenticated, user } = useAuth();

  if (!authReady) {
    return <p>Please wait..</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
