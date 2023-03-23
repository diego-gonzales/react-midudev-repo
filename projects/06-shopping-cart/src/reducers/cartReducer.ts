import { Product } from "../interfaces/products-response";
import { getLocalStorage, setLocalStorage } from "../utils/localStorageUtil";

export const CART_ACTION_TYPES = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  CLEAR_CART: "CLEAR_CART",
};

export const cartInitialState: Product[] = getLocalStorage("cart") ?? [];

export const cartReducer = (state: any, action: any) => {
  const { type: actionType, payload: actionPayload } = action;

  switch (actionType) {
    case CART_ACTION_TYPES.ADD_TO_CART: {
      const productInCartIndex = state.findIndex(
        (prod: any) => prod.id === actionPayload.id
      );

      if (productInCartIndex >= 0) {
        // 👀 With structuredClone()
        const newState = structuredClone(state);
        newState[productInCartIndex].quantity += 1;

        // 👶 with map
        /*
        const newState2 = state.map((product: Product) => {
          if (product.id === actionPayload.id) {
            return {
              ...product,
              quantity: product.quantity! + 1
            }
          }

          return product;
        }); */

        // ⚡ with slice and spread operator
        /* const newState3 = [
          ...state.slice(0, productInCartIndex),
          {
            ...state[productInCartIndex],
            quantity: state[productInCartIndex].quantity + 1,
          },
          ...state.slice(productInCartIndex + 1),
        ]; */

        setLocalStorage("cart", newState);
        return newState;
      }

      const newState = [...state, { ...actionPayload, quantity: 1 }];
      setLocalStorage("cart", newState);
      return newState;
    }

    case CART_ACTION_TYPES.REMOVE_FROM_CART: {
      const newState = state.filter(
        (prod: any) => prod.id !== actionPayload.id
      );
      setLocalStorage("cart", newState);
      return newState;
    }

    case CART_ACTION_TYPES.CLEAR_CART: {
      setLocalStorage("cart", []);
      return [];
    }

    default: {
      throw Error("Unknown action: " + actionType);
    }
  }
};
