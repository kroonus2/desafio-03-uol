import { LuShoppingCart } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartIcon = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  // Contagem total de itens no carrinho
  const totalItemsInCart = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div
      className="relative cursor-pointer"
      onClick={() => navigate("/my-cart")}
    >
      <LuShoppingCart size={28} />
      {totalItemsInCart > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full px-2">
          {totalItemsInCart}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
