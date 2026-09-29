import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Home from "../pages/Home";

const HomeRoute = () => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-[var(--color-ink-muted)]">Loading...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    if (user?.role === "candidate") {
      return <Navigate to="/candidate/dashboard" replace />;
    }
    // add other role checks here later
    return <Navigate to="/candidate/dashboard" replace />;
  }

  return <Home />;
};

export default HomeRoute;
