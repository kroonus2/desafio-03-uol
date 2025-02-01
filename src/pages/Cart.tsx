import { IoIosArrowBack } from "react-icons/io";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaChevronRight, FaRegTrashAlt } from "react-icons/fa";
import { LuMinus, LuPlus } from "react-icons/lu";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  // Calcular total do carrinho
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-11/12 mx-auto">
        <nav className="flex justify-between mt-5">
          <IoIosArrowBack
            size={28}
            onClick={() => navigate(-1)}
            className="cursor-pointer"
          />
          <h3 className="font-bold text-lg">Shopping Cart</h3>
          <FaRegTrashAlt
            size={28}
            onClick={clearCart}
            className="cursor-pointer"
          />
        </nav>
      </header>

      {/* Carrinho Vazio */}
      {cart.length === 0 ? (
        <p className="text-center mt-10">O carrinho está vazio.</p>
      ) : (
        <>
          <div className="w-11/12 mx-auto mt-3 flex-1">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-1 gap-3 items-center mt-[35px]"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-[87px] h-[87px] object-cover"
                />

                <div className="flex flex-1 flex-col pl-2">
                  <h3 className="text-pretty text-lg truncate">{item.name}</h3>
                  <span className="font-bold text-sm">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(item.price)}
                  </span>

                  {/* Quantidade */}
                  <div className="flex justify-between items-center w-full mt-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="border border-black rounded-lg p-2 disabled:opacity-50"
                      >
                        <LuMinus />
                      </button>
                      <span className="text-lg w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="border border-black rounded-lg p-2"
                      >
                        <LuPlus />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)}>
                      <FaRegTrashAlt size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* fixo com total e btn */}
          <div className="w-full fixed bottom-0 bg-white shadow-md py-5">
            <div className="w-11/12 mx-auto flex justify-between items-center">
              <h3 className="">Total 2 itens</h3>
              <span className="text-lg font-bold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(totalPrice)}
              </span>
            </div>
            <div className="mt-3 w-11/12 mx-auto">
              <button
                className="flex justify-around w-full bg-primary text-white font-bold p-4 rounded-lg "
                onClick={() => alert("Compra Finalizada!")}
              >
                Proceed to Checkout
                <FaChevronRight size={22} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
