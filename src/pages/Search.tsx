import { IoIosArrowBack } from "react-icons/io";
import SearchInput from "../components/search";
import { useNavigate } from "react-router-dom";
import SearchProduct from "../components/searchProduct";
import { useState } from "react";
import { Product } from "../interfaces/product";
import LoadingSpinner from "../components/loadingSpinner";
import useProducts from "../hook/useProducts";
import CartIcon from "../components/CartIcon";

const Search = () => {
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { products, loading, error } = useProducts();

  const handleSearch = (query: string) => {
    if (query === "") {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const popularProducts = products
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <nav className="flex justify-between w-11/12 m-auto mt-5">
          <IoIosArrowBack
            size={28}
            onClick={() => navigate(-1)}
            className="cursor-pointer"
          />
          <h3 className="font-bold text-lg">Search</h3>
          <CartIcon />
        </nav>
      </header>

      <div className="mt-7">
        <SearchInput onSearch={handleSearch} />
      </div>
      {/* Altura fixa com overflow-scroll */}
      <div className="w-11/12 m-auto mt-7 h-[40vh] overflow-y-auto">
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
