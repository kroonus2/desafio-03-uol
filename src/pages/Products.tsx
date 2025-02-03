import { IoIosArrowBack, IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import MyBottomSheet from "../components/filterBottomSheet";
import { useEffect, useState } from "react";
import { HiAdjustmentsVertical } from "react-icons/hi2";
import { Product } from "../interfaces/product";
import LoadingSpinner from "../components/loadingSpinner";
import ProducItem from "../components/productItem";
import useProducts from "../hook/useProducts";
import CartIcon from "../components/CartIcon";

// Refatorar toda essa pagina
const AllProducts = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Estado dos produtos
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Filtros
  const [activeCategory, setActiveCategory] = useState<string>("Headphones");
  const [sortBy, setSortBy] = useState<string>("Popularity");

  // Refatorando a requisição
  const { products, loading } = useProducts();

  useEffect(() => {
    console.log("Filtros:", { activeCategory, sortBy });

    let updatedProducts = products.filter(
      (product) =>
        product.category.toLowerCase() === activeCategory.toLowerCase()
    );

    console.log("Produtos filtrados antes da ordenação:", updatedProducts);

    let sortedProducts = [...updatedProducts]; // Criar cópia para evitar mutação

    switch (sortBy) {
      case "Newest":
        sortedProducts.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        );
        break;
      case "Oldest":
        sortedProducts.sort(
          (a, b) =>
            new Date(a.createdAt || 0).getTime() -
            new Date(b.createdAt || 0).getTime()
        );
        break;
      case "High Price":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "Low Price":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "Popularity":
        sortedProducts.sort((a, b) => b.popularity - a.popularity);
        break;
      default:
        break;
    }

    console.log("Produtos após ordenação:", sortedProducts);
    setFilteredProducts(sortedProducts.length > 0 ? sortedProducts : products);
  }, [products, activeCategory, sortBy]);

  if (loading) return <LoadingSpinner texto="Carregando os produtos" />;

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="w-11/12 mx-auto">
          <nav className="flex justify-between mt-5">
            <IoIosArrowBack
              size={28}
              onClick={() => navigate(-1)}
              className="cursor-pointer"
            />
            <CartIcon />
          </nav>
          <h3 className="text-lg font-bold mt-7">All Products</h3>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex justify-center gap-3 border-2 rounded-lg w-full text-lg p-2 mt-5"
          >
            <HiAdjustmentsVertical size={26} />
            Filter
          </button>
        </header>

        {/* Conteúdo dos produtos */}
        <div className="bg-gray-100 rounded-t-3xl h-full mt-14 min-h-screen">
          <div className="grid grid-cols-2 md:grid-cols-5 mt-3 p-5">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((produto, index) => (
                <ProducItem produto={produto} key={index} rating={true} />
              ))
            ) : (
              <p className="text-center w-full text-gray-500">
                Nenhum produto encontrado.
              </p>
            )}
          </div>
        </div>
        {/* Bottom Sheet de Filtros */}
        <MyBottomSheet
          open={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        >
          <div className="flex justify-between">
            <h2 className="text-lg font-bold">Filters</h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              <IoMdClose size={24} />
            </button>
          </div>
          {/* Filtro por Categoria */}
          <div className="flex flex-col mt-5">
            <h3 className="text-lg">Category</h3>
            <nav>
              <dl className="flex gap-3 mt-3">
                {["Headphones", "Headsets"].map((category) => (
                  <dt
                    key={category}
                    className={`px-4 py-1 rounded-2xl cursor-pointer ${
                      activeCategory.toLowerCase() === category.toLowerCase()
                        ? "bg-primary text-white"
                        : "text-gray-500"
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </dt>
                ))}
              </dl>
            </nav>
          </div>
          {/* Ordenação */}
          <div className="mt-5">
            <h3 className="text-lg">Sort by</h3>
            <div className="flex flex-wrap gap-5 mt-3">
              {[
                "Popularity",
                "Newest",
                "Oldest",
                "High Price",
                "Low Price",
              ].map((option) => (
                <button
                  key={option}
                  className={`px-3 py-2 rounded-lg ${
                    sortBy === option ? "bg-primary text-white" : "border-2"
                  }`}
                  onClick={() => setSortBy(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <button
            className="mt-7 p-3 rounded-lg bg-primary text-white text-lg font-bold"
            onClick={() => setIsFilterOpen(false)}
          >
            Apply Filter
          </button>
        </MyBottomSheet>
      </div>
    </>
  );
};

export default AllProducts;
