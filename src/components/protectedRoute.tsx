import { Navigate } from "react-router-dom";
import { useAuthState } from "../services/authStateListener";
import { FaSpinner } from "react-icons/fa";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuthState();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="text-4xl animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />; // Redireciona para a página de login
  }

  return children;
};

export default ProtectedRoute;
