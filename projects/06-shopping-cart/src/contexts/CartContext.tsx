import { createContext, ReactNode, useState } from "react";
import { Product } from "../interfaces/products-response";

interface CartProviderProps {
  children: ReactNode;
}

interface ProviderProps {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  clearCart: () => void;
}

export const CartContext = createContext<ProviderProps | undefined>(undefined);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    const productInCartIndex = cart.findIndex((prod) => prod.id === product.id);

    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cart);
      newCart[productInCartIndex].quantity! += 1;
      return setCart(newCart);
    }

    setCart((prevState) => [...prevState, { ...product, quantity: 1 }]);
  };

  const removeFromCart = (product: Product) => {
    setCart((prevState) => prevState.filter((prod) => prod.id !== product.id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
