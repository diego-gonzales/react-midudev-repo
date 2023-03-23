import { CartIcon, ClearCartIcon } from "../Icons/Icons";
import { useId } from "react";
import "./Cart.css";
import { useCart } from "../../hooks/useCart";

const Cart = () => {
  const cartCheckboxID = useId();
  const { cart, clearCart, addToCart, removeOneFromCart, removeFromCart } =
    useCart();

  return (
    <>
      <label className="cart-button" htmlFor={cartCheckboxID}>
        <CartIcon />
      </label>
      <input type="checkbox" id={cartCheckboxID} hidden />

      <aside className="cart">
        {cart.length > 0 ? (
          <>
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  <img src={item.thumbnail} alt={item.title} />
                  <div>
                    <strong>{item.title}</strong> - ${item.price}
                  </div>
                  <footer>
                    <button onClick={() => removeFromCart(item)}>🗑</button>
                    <small>Quantity: {item.quantity}</small>
                    <button
                      disabled={item.quantity === 1}
                      onClick={() => removeOneFromCart(item)}
                    >
                      -
                    </button>
                    <button onClick={() => addToCart(item)}>+</button>
                  </footer>
                </li>
              ))}
            </ul>

            <button onClick={clearCart}>
              <ClearCartIcon />
            </button>
          </>
        ) : (
          <p>Your cart is empty</p>
        )}
      </aside>
    </>
  );
};
export default Cart;
