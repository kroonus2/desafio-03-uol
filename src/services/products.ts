import axios from "axios";
import { Product } from "../interfaces/product";

const API_URL = "https://run.mocky.io/v3/e257213a-c80c-4336-90c9-5e370dccbb73";

// Interface para a resposta da API
interface ApiResponse {
  data: Product[];
}

export const ProductService = {
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await axios.get<ApiResponse>(API_URL); // Atualize a tipagem aqui
      return response.data.data; // Retorne o array de produtos
    } catch (error) {
      console.error("Erro ao puxar os produtos da rota mocky:", error);
      throw new Error("Erro ao puxar os produtos...");
    }
  },
};
