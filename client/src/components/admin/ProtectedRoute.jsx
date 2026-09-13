import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../ui/Spinner';

// Wraps the /admin/* route tree. While AuthContext is still checking a stored
// token, show a spinner instead of flashing the login page; once resolved,
// bounce anonymous visitors to /admin/login and remember where they came from.
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, checking } = useAuth();
  const location = useLocation();

  if (checking) return <Spinner className="min-h-screen" />;

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
}
