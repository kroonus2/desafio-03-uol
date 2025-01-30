import { IoIosArrowBack } from "react-icons/io";
import SearchInput from "../components/search";
import { useNavigate } from "react-router-dom";
import { LuShoppingCart } from "react-icons/lu";
import SearchProduct from "../components/searchProduct";
import { useEffect, useState } from "react";
import { Product } from "../interfaces/product";
import { ProductService } from "../services/products";
import LoadingSpinner from "../components/loadingSpinner";

const Search = () => {
  // Requisiçoes
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // navegacao
  const navigate = useNavigate();
  // filtro de pesquisa
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

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
  // Pegar a pesquisa feita e filtar a lista vinda da requisicao
  const handleSearch = (query: string) => {
    if (query === "") {
      setFilteredProducts([]); // Mostra vazio se não houver busca
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  // Ordenar e selecionar os 3 itens mais populares
  const popularProducts = products
    .sort((a, b) => b.popularity - a.popularity) // Ordena por popularidade decrescente
    .slice(0, 3); // Seleciona os 3 primeiros

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <nav className="flex justify-between w-11/12 m-auto mt-5">
          {/* Botão para o menu principal */}
          <IoIosArrowBack
            size={28}
            onClick={() => navigate("/")}
            className="cursor-pointer"
          />
          {/* Search */}
          <h3 className="font-bold text-lg">Search</h3>
          <LuShoppingCart size={28} />
        </nav>
      </header>
      {/* Pesquisa */}
      <div className="mt-7">
        <SearchInput onSearch={handleSearch} />
      </div>
      {/* Produtos da pesquisa */}
      <div className="w-11/12 m-auto mt-7 flex-grow">
        {loading ? (
          <LoadingSpinner texto="Buscando Produtos" />
        ) : error ? (
          <p>{error}</p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <SearchProduct key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-500">Nenhum produto encontrado</p>
        )}
      </div>
      {/* Produtos populares */}
      <div className="w-11/12 m-auto flex flex-col justify-start">
        <h3 className="text-lg">Popular Products</h3>
        {popularProducts.map((product) => (
          <SearchProduct key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Search;
