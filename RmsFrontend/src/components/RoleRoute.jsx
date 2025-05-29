// components/RoleRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RoleRoute({ allowedRoles, children }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (!allowedRoles.includes(currentUser.role)) {
    // optionally redirect or show “Not authorized”
    return <Navigate to="/homepage" replace />;
  }
  return children;
}
