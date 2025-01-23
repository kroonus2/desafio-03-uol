import { logoutUser } from "../services/basicAuth"; // Importa a função de logout
import { useNavigate } from "react-router-dom"; // Para redirecionamento após logout

const Homepage = () => {
  const navigate = useNavigate(); // Hook para redirecionar o usuário

  const handleLogout = async () => {
    try {
      await logoutUser(); // Executa o logout
      console.log("Usuário deslogado com sucesso!");
      navigate("/signin"); // Redireciona para a página de login
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  return (
    <>
      <h3>Desafio 03 PB Compass Uol</h3>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </>
  );
};

export default Homepage;
