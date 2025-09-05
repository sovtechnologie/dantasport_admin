import { Navigate, Outlet } from 'react-router-dom';
import { getUserRole } from '../utils/auth';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ allowedRole }) => {
  const user = useSelector(state => state.auth.user);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  // Map Role
  const role = user?.role === 3 ? "admin" : user?.role === 2 ? "vendor" : null;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

    if (role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return  <Outlet />;
};

export default ProtectedRoute;

