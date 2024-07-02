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
  type: "cart/addProduct";
  payload?: ProductType;
};

const reducer = (state: initialStateType, action: ActionType) => {
  switch (action.type) {
    case "cart/addProduct":
      if (!action.payload) return state;
      return {
        cart: [...state.cart, action.payload],
      };
    default:
      return state;
  }
};

const CartContext = createContext<{
  state: initialStateType;
  addToCart: (item: ProductType) => void;
  getCurrentQuantityById: (id: string) => number;
} | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (item: ProductType) => {
    if (!item) return;
    dispatch({ type: "cart/addProduct", payload: item });
  };

  const getCurrentQuantityById = (id: string) => {
    return state.cart.find((item) => item.id === id)?.quantity ?? 0;
  };

  return (
    <CartContext.Provider value={{ state, addToCart, getCurrentQuantityById }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) throw Error("Cart Context cannot be used outside Provider");

  return context;
};
