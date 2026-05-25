import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If no token exists, send them to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the child component (Donation, Request, Dashboard, etc.)
  return children ? children : <Outlet />;
};

export default ProtectedRoute;