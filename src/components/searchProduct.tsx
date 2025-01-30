import { BsThreeDotsVertical } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { Product } from "../interfaces/product";

// Define a interface para as props
interface SearchProductProps {
  product: Product; // Ajuste para receber um produto diretamente
}

// **** Rever a largura dos itens, e retirar a quebra do nome do produto
const SearchProduct = ({ product }: SearchProductProps) => {
  return (
    <div className="flex justify-between items-center w-full m-auto my-3">
      {/* Imagem do produto */}
      <img
        src={"src/assets/searchProductImg.svg"}
        alt="Imagem do produto"
        className="rounded-lg w-24 h-24 object-cover"
      />
      {/* Detalhes do produto */}
      <div className="flex flex-1 flex-col pl-5">
        {/* Nome */}
        <h3 className="text-pretty text-lg truncate">{product.name}</h3>
        {/* Preco */}
        <span className="font-bold text-sm mt-2">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(product.price)}
        </span>
        {/* Avaliaçoes */}
        <div className="flex gap-3 pt-3 items-center">
          {/* Estrelas */}
          <div className="flex gap-1 items-center">
            <FaStar color="#FFC120" size={20} />
            <span className="text-sm">
              {(() => {
                const totalReviews = product.reviews.length;
                const averageRating =
                  totalReviews > 0
                    ? product.reviews.reduce(
                        (sum, review) => sum + review.rating,
                        0
                      ) / totalReviews
                    : 0;
                return `${averageRating.toFixed(1)}`;
              })()}
            </span>
          </div>
          {/* Qntd de avaliaçoes */}
          <p className="text-sm">{`${product.reviews.length} Reviews`}</p>
        </div>
      </div>
      {/* Ícone de ponto/opcoes */}
      <div className="ml-5">
        <BsThreeDotsVertical />
      </div>
    </div>
  );
};

export default SearchProduct;
