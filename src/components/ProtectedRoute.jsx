import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    if (userRole === 'teacher') {
      return <Navigate to="/teacher-dashboard" replace />;
    } else if (userRole === 'admin') {
      return <Navigate to="/" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;