import { IoIosArrowBack } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css"; // Importação do CSS oficial
import useProducts from "../hook/useProducts";
import LoadingSpinner from "../components/loadingSpinner";
import AvatarImg from "../assets/AvatarSmall.svg";
import { FaStar } from "react-icons/fa";
import ProducItem from "../components/productItem";
import { useCart } from "../context/CartContext";
import CartIcon from "../components/CartIcon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductPage = () => {
  const { id } = useParams(); // Captura o ID da URL
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (loading) return <LoadingSpinner texto="Carregando o produto..." />;
  if (error) return <p className="text-red-500">{error}</p>;

  // Filtrando o produto pelo ID
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <p className="text-red-500 text-center mt-10">Produto não encontrado.</p>
    );
  }

  // Função para exibir o toastr
  const showToast = () => {
    toast.success("Produto adicionado ao carrinho!", {
      position: "top-right",
      autoClose: 3000, // Fecha automaticamente após 3 segundos
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header com os ícones */}
      <header className="w-11/12 mx-auto">
        <nav className="flex justify-between mt-5">
          <IoIosArrowBack
            size={28}
            onClick={() => navigate(-1)}
            className="cursor-pointer"
          />
          <CartIcon />
        </nav>
      </header>
      {/* Informações do Produto */}
      <div className="w-11/12 mx-auto mt-5 text-start">
        <h3 className="text-primary text-lg font-bold">USD {product.price}</h3>
        <h1 className="text-4xl font-bold truncate">{product.name}</h1>
      </div>
      {/* Conteúdo central com Tabs */}
      <div className="mt-7">
        <Tabs>
          <TabList className="flex gap-7 w-11/12 mx-auto">
            <Tab className="py-2 cursor-pointer border-b-2 border-transparent aria-selected:border-primary aria-selected:font-bold">
              Overview
            </Tab>
            <Tab className="py-2 cursor-pointer border-b-2 border-transparent aria-selected:border-primary aria-selected:font-bold">
              Features
            </Tab>
          </TabList>
          <TabPanel>
            <div className="flex p-1 gap-5 overflow-x-scroll [&::-webkit-scrollbar]:hidden mt-3 w-11/12 mx-auto">
              <img
                src={product.img}
                alt={product.name}
                className="w-72 md:w-80 h-auto mx-auto rounded-lg mt-5"
              />
              <img
                src={product.img}
                alt={product.name}
                className="w-72 md:w-80 h-auto mx-auto rounded-lg mt-5"
              />
              <img
                src={product.img}
                alt={product.name}
                className="w-72 md:w-80 h-auto mx-auto rounded-lg mt-5"
              />
            </div>
            <div className="px-2 py-4 w-11/12 mx-auto">
              <h2 className="text-lg">Reviews ({product.reviews.length})</h2>
              {product.reviews.length > 0 ? (
                <div>
                  {product.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="py-2 flex gap-3 items-start mt-1"
                    >
                      {/* Avatar */}
                      <img
                        src={AvatarImg}
                        alt="Avatar"
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex flex-col mt-auto">
                        <h3 className="text-lg">{review.userName}</h3>
                        {/* Renderiza o número correto de estrelas */}
                        <div className="flex gap-1">
                          {Array.from({ length: review.rating }, (_, i) => (
                            <FaStar
                              key={i}
                              className="text-yellow-500"
                              size={16}
                            />
                          ))}
                        </div>
                        <p className="mt-3">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Sem avaliações ainda.</p>
              )}
            </div>
            <div className=" bg-gray-100 w-screen mx-auto p-1">
              <div
                className="flex justify-between my-5 px-5"
                onClick={() => navigate("/all-products")}
              >
                <h3 className="text-black text-lg">Another Products</h3>
                <span className="text-gray-500">See All</span>
              </div>
              <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-5">
                {products.map((produto, index) => (
                  <ProducItem produto={produto} key={index} rating={false} />
                ))}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="w-11/12 mx-auto mt-10">
              <h2 className="text-lg font-bold">High Detailed Audio</h2>
              <p className="mt-2">{product.details}</p>
            </div>
          </TabPanel>
        </Tabs>

        {/* Botão Adicionar ao Carrinho */}
        <div className="flex justify-center my-10">
          <button
            className="w-11/12 mx-auto bg-primary border-transparent rounded-lg p-5 text-white font-bold text-lg"
            onClick={() => {
              addToCart(product); // Adiciona ao carrinho
              showToast(); // Mostra o toastr
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>

      {/* Container para o Toast */}
      <ToastContainer />
    </div>
  );
};

export default ProductPage;
