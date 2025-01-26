import { logoutUser } from "../services/basicAuth"; // Importa a função de logout
import { useNavigate } from "react-router-dom"; // Para redirecionamento após logout
import { useEffect, useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import SearchInput from "../components/search";
import { FaArrowRight } from "react-icons/fa";
import { Product } from "../interfaces/product";
import { ProductService } from "../services/products";
import LoadingSpinner from "../components/loadingSpinner";

const Homepage = () => {
  const navigate = useNavigate(); // Hook para redirecionar o usuário
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar o menu do perfil
  // Requisiçoes
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  //Opcoes carousel 1
  const [activeOption, setActiveOption] = useState<string>("Headphones"); // Inicia com a categoria headphone

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await ProductService.getProducts();
        setProducts(response);
      } catch (err) {
        setError("Falha ao carregar os produitos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <LoadingSpinner texto="Carregando os produtos" />;

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
      <header className="flex flex-col gap-5 mx-auto">
        <nav className="flex justify-around gap-5 mt-5 items-center">
          {/* Botão para o menu principal */}
          <BiMenuAltLeft
            size={28}
            onClick={() => navigate("/")}
            className="cursor-pointer"
          />
          {/* Logo */}
          <img
            src="src/assets/Logo.svg"
            alt="Logo/Home"
            height={25}
            width={105}
            className="cursor-pointer"
            onClick={() => navigate("/")}
          />
          {/* Avatar com menu de perfil */}
          <div className="relative">
            <img
              src="src/assets/AvatarSmall.svg"
              alt="Perfil"
              className="cursor-pointer"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            />
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                <ul>
                  <li
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/")} // Redireciona para o home por enquanto
                  >
                    Perfil
                  </li>
                  <li
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout} // logout
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
        {/* Texto */}
        <div className="w-5/6 mx-auto">
          <p className="text-start text-gray-500 text-lg">Hi, Andrea</p>
          <p className="text-start font-bold text-2xl">
            What are you looking for today?
          </p>
        </div>
        <SearchInput disabled redirectPath="/search" />
      </header>
      {/* Cards Centrais ou Destaques */}
      <div className="bg-gray-100 min-h-screen rounded-t-3xl ">
        <div className="w-[95%] m-auto">
          {/* Opcoes */}
          <nav className="m-5">
            <dl className="flex gap-5 pt-8">
              <dt
                className={`px-4 py-1 rounded-2xl cursor-pointer ${
                  activeOption === "Headphones"
                    ? "bg-primary text-white"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveOption("Headphones")}
              >
                Headphones
              </dt>
              <dt
                className={`px-4 py-1 rounded-2xl cursor-pointer ${
                  activeOption === "Headsets"
                    ? "bg-primary text-white"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveOption("Headsets")}
              >
                Headsets
              </dt>
            </dl>
          </nav>
          {/* Destaques */}
          {/* Colocar carousel na versao desktop tbm, por enquanto somente grid */}
          <div className="flex overflow-x-scroll px-2 [&::-webkit-scrollbar]:hidden">
            {/* Div principal do carrossel */}
            {products
              .filter(
                (produtos) => produtos.category === activeOption.toLowerCase()
              )
              .map((produto, index) => (
                <div
                  className="flex-shrink-0 w-[94%] mr-5 flex justify-around p-5 bg-white rounded-xl md:w-1/2"
                  key={index}
                >
                  <div className="flex flex-col justify-around w-[40%] gap-5">
                    <h3 className="text-3xl text-pretty font-bold">
                      {produto.name}
                    </h3>
                    <span className="flex gap-2 text-primary font-bold mt-3">
                      Shop now <FaArrowRight size={24} />
                    </span>
                  </div>
                  <div>
                    <img
                      src="src/assets/headphone.svg"
                      alt="Headphone Image"
                      width={117}
                      height={135}
                    />
                  </div>
                </div>
              ))}
          </div>
          {/* Produtos - Ver todos*/}
          <div className="flex justify-between p-3 mt-3">
            <h3 className="text-lg">Featured Products</h3>
            <p className="text-gray-400">See All</p>
          </div>
          {/* Cards dos produtos abaixo */}
          {/* Colocar carousel na versao desktop tbm, por enquanto somente grid */}
          <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-5">
            {products.map((produto, index) => (
              <div className="flex justify-center gap-5 m-2 my-3" key={index}>
                <div className="flex flex-col bg-white w-44 p-7 rounded-2xl">
                  <img src="src/assets/headphone.svg" alt="Headphone Image" />
                  <h3>{produto.name}</h3>
                  <p className="text-xs font-bold">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(produto.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
