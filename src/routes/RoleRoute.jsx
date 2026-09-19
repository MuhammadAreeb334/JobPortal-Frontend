import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleRoute = ({ allowedRoles }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-[var(--color-ink-muted)]">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
