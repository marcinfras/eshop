"use client";

import { createContext, useContext, useReducer } from "react";

type ProductType = {
  id: string;
  name: string;
  price: number;
  totalPrice: number;
  quantity: number;
  image: string;
};

type initialStateType = {
  cart: ProductType[];
  // totalPrice: number;
};

const initialState = {
  cart: [],
  // totalPrice: 0,
} satisfies initialStateType;

type ActionType = {
  type:
    | "cart/addProduct"
    | "cart/deleteProduct"
    | "cart/increaseQuantity"
    | "cart/decreaseQuantity";
  payload?: ProductType | string;
};

const reducer = (state: initialStateType, action: ActionType) => {
  switch (action.type) {
    case "cart/addProduct":
      if (!action.payload || typeof action.payload === "string") return state;
      return {
        cart: [...state.cart, action.payload],
      };
    case "cart/deleteProduct":
      if (!action.payload) return state;
      const updatedCart = state.cart.filter(
        (item) => item.id !== action.payload
      );
      return {
        cart: updatedCart,
      };
    case "cart/increaseQuantity":
      if (!action.payload) return state;

      return {
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: (item.quantity + 1) * item.price,
              }
            : item
        ),
      };
    case "cart/decreaseQuantity":
      if (!action.payload) return state;

      return {
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? {
                ...item,
                quantity: item.quantity - 1,
                totalPrice: (item.quantity - 1) * item.price,
              }
            : item
        ),
      };

    default:
      return state;
  }
};

const CartContext = createContext<{
  state: initialStateType;
  addToCart: (item: ProductType) => void;
  getCurrentQuantityById: (id: string) => number;
  deleteFromCart: (id: string) => void;
  increaseItemQuantity: (id: string) => void;
  decreaseItemQuantity: (id: string) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
} | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (item: ProductType) => {
    if (!item) return;

    dispatch({ type: "cart/addProduct", payload: item });
  };

  const deleteFromCart = (id: string) => {
    if (!id) return;
    dispatch({ type: "cart/deleteProduct", payload: id });
  };

  const increaseItemQuantity = (id: string) => {
    if (!id) return;
    dispatch({ type: "cart/increaseQuantity", payload: id });
  };

  const decreaseItemQuantity = (id: string) => {
    if (!id) return;
    dispatch({ type: "cart/decreaseQuantity", payload: id });
  };

  const getCurrentQuantityById = (id: string) => {
    return state.cart.find((item) => item.id === id)?.quantity ?? 0;
  };

  const getTotalPrice = () => {
    return state.cart.reduce((acc, cur) => acc + cur.totalPrice, 0);
  };

  const getTotalItems = () => {
    return state.cart.reduce((acc, cur) => acc + cur.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        getCurrentQuantityById,
        deleteFromCart,
        increaseItemQuantity,
        decreaseItemQuantity,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) throw Error("Cart Context cannot be used outside Provider");

  return context;
};
