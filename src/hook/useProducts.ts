import { useState, useEffect } from "react";
import { Product } from "../interfaces/product";
import { ProductService } from "../services/products";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await ProductService.getProducts();
        // console.log("Produtos recebidos:", response);
        setProducts(response);
      } catch (err) {
        console.error("Erro ao carregar os produtos:", err);
        setError("Falha ao carregar os produtos");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useProducts;
