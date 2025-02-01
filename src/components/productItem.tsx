import { FaStar } from "react-icons/fa";
import { Product } from "../interfaces/product";
import { BsThreeDotsVertical } from "react-icons/bs";
import headphone from "../assets/headphone.svg";
import { useNavigate } from "react-router-dom";
// Define a interface para as props
interface ProductItemProps {
  produto: Product; // Ajuste para receber um produto diretamente
  rating: boolean;
}

const ProducItem = ({ produto, rating }: ProductItemProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex justify-center gap-5 m-2 my-3 min-h-[268px]"
      onClick={() => navigate(`/product/${produto.id}`)}
    >
      <div className="flex flex-col bg-white w-44 p-3 rounded-2xl">
        <img src={headphone} alt="Headphone Image" />
        <h3 className="truncate">{produto.name}</h3>
        <p className="text-xs font-bold">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(produto.price)}
        </p>
        {/* Avaliaçoes , so mostra se rating for true*/}
        {rating && (
          <div className="flex gap-3 pt-3 items-center">
            {/* Estrelas */}
            <div className="flex gap-1 items-center">
              <FaStar color="#FFC120" size={16} />
              <span className="text-xs">
                {(() => {
                  const totalReviews = produto.reviews.length;
                  const averageRating =
                    totalReviews > 0
                      ? produto.reviews.reduce(
                          (sum, review) => sum + review.rating,
                          0
                        ) / totalReviews
                      : 0;
                  return `${averageRating.toFixed(1)}`;
                })()}
              </span>
            </div>
            {/* Quantidade de avaliações */}
            <p className="text-xs">{`${produto.reviews.length} Reviews`}</p>
            {/* Ícone de opções */}
            <div className="ml-4">
              <BsThreeDotsVertical />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProducItem;
