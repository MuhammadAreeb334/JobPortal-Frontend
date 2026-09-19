import { useAuth } from "../../context/AuthContext";

const Me = () => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Auth Test</h1>

      <p>Authenticated: {isAuthenticated ? "Yes" : "No"}</p>

      {user && (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </>
      )}
    </div>
  );
};

export default Me;
