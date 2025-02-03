import { Navigate } from "react-router-dom";
import { useAuthState } from "../services/authStateListener";
import LoadingSpinner from "./loadingSpinner";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuthState();

  if (loading) {
    return <LoadingSpinner />;
  }
  // Redireciona para a página de login, caso ninguem esteja logado
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
