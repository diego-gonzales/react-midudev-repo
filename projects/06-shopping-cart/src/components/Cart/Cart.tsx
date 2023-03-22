import { CartIcon, ClearCartIcon } from "../Icons/Icons";
import { useId } from "react";
import "./Cart.css";
import { useCart } from "../../hooks/useCart";

const Cart = () => {
  const cartCheckboxID = useId();
  const { cart, clearCart, addToCart } = useCart();

  return (
    <>
      <label className="cart-button" htmlFor={cartCheckboxID}>
        <CartIcon />
      </label>
      <input type="checkbox" id={cartCheckboxID} hidden />

      <aside className="cart">
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <img src={item.thumbnail} alt={item.title} />
              <div>
                <strong>{item.title}</strong> - ${item.title}
              </div>
              <footer>
                <small>Quantity: {item.quantity}</small>
                <button onClick={() => addToCart(item)}>+</button>
              </footer>
            </li>
          ))}
        </ul>

        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  );
};
export default Cart;
