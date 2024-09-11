// "use client";

// import {
//   createContext,
//   useContext,
//   useEffect,
//   useReducer,
//   useState,
// } from "react";
// import { createCart } from "../../../../../lib/actions/createCart";
// import { updateCart } from "../../../../../lib/actions/updateCart";
// // import { addToCartAction } from "../../../../../lib/actions/addToCart";
// import { useSession } from "next-auth/react";
// import { fetchCart } from "../../../../../lib/actions/fetchCart";
// import { usePathname, useRouter } from "next/navigation";
// import { removeFromCart } from "../../../../../lib/actions/removeFromCart";
// import { Loader } from "../../Loader";
// import { toast } from "../../ui/use-toast";

// export type ProductType = {
//   id: string;
//   hygraphId?: string;
//   slug: string;
//   name: string;
//   price: number;
//   totalPrice: number;
//   quantity: number;
//   image: string;
// };

// //TODO
// type initialStateType = {
//   cart: ProductType[];
// };

// const initialState = {
//   cart: [],
// } satisfies initialStateType;

// type ActionType = {
//   type:
//     | "cart/initialize"
//     | "cart/addProduct"
//     | "cart/deleteProduct"
//     | "cart/increaseQuantity"
//     | "cart/decreaseQuantity";

//   payload?: ProductType[] | ProductType | string;
// };

// const reducer = (state: initialStateType, action: ActionType) => {
//   switch (action.type) {
//     case "cart/initialize":
//       if (!Array.isArray(action.payload)) return state;
//       return {
//         ...state,
//         cart: action.payload,
//       };
//     case "cart/addProduct":
//       if (!action.payload || typeof action.payload === "string") return state;
//       return {
//         ...state,
//         cart: [...state.cart, action.payload as ProductType],
//       };
//     case "cart/deleteProduct":
//       if (!action.payload) return state;
//       const updatedCart = state.cart.filter(
//         (item) => item.id !== action.payload
//       );
//       return {
//         ...state,
//         cart: updatedCart,
//       };
//     case "cart/increaseQuantity":
//       if (!action.payload) return state;

//       return {
//         ...state,
//         cart: state.cart.map((item) =>
//           item.id === action.payload
//             ? {
//                 ...item,
//                 quantity: item.quantity + 1,
//                 totalPrice: (item.quantity + 1) * item.price,
//               }
//             : item
//         ),
//       };
//     case "cart/decreaseQuantity":
//       if (!action.payload) return state;

//       return {
//         ...state,
//         cart: state.cart.map((item) =>
//           item.id === action.payload
//             ? {
//                 ...item,
//                 quantity: item.quantity - 1,
//                 totalPrice: (item.quantity - 1) * item.price,
//               }
//             : item
//         ),
//       };

//     default:
//       return state;
//   }
// };

// const CartContext = createContext<{
//   state: initialStateType;
//   addToCart: (item: {
//     id: string;
//     slug: string;
//     name: string;
//     price: number;
//     totalPrice: number;
//     quantity: number;
//     image: string;
//   }) => void;
//   getCurrentQuantityById: (id: string) => number;
//   deleteFromCart: (id: string) => void;
//   increaseItemQuantity: (id: string, quantity: number) => void;
//   decreaseItemQuantity: (id: string, quantity: number) => void;
//   getTotalPrice: () => number;
//   getTotalItems: () => number;
// } | null>(null);

// export const CartProvider = ({ children }: { children: React.ReactNode }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const [isLoadingCart, setIsLoading] = useState(false);

//   const session = useSession();
//   const router = useRouter();
//   console.log(session);

//   useEffect(() => {
//     const initializeCart = async () => {
//       if (!session.data?.user?.email) return;
//       setIsLoading(true);
//       const initialState = await fetchCart(session.data?.user?.email);

//       // if (!initialState) return;
//       router.push("/");
//       dispatch({ type: "cart/initialize", payload: initialState });
//       setIsLoading(false);
//     };

//     initializeCart();
//   }, [session.data?.user?.email, router]);

//   const addToCart = async (item: {
//     id: string;
//     slug: string;
//     name: string;
//     price: number;
//     totalPrice: number;
//     quantity: number;
//     image: string;
//   }) => {
//     if (!item) return;

//     let hygraphId;
//     if (session.data?.user?.email) {
//       setIsLoading(true);
//       hygraphId = await createCart(
//         {
//           quantity: item.quantity,
//           slug: item.slug,
//         },
//         session.data?.user?.email
//       );
//       if (!hygraphId) return;
//       if (typeof hygraphId !== "string" && "error" in hygraphId) {
//         toast({
//           variant: "destructive",
//           title: hygraphId.error,
//         });
//         setIsLoading(false);
//         return;
//       }
//       dispatch({ type: "cart/addProduct", payload: { ...item, hygraphId } });
//       setIsLoading(false);
//       return;
//     }

//     dispatch({ type: "cart/addProduct", payload: { ...item } });
//   };

//   const deleteFromCart = async (id: string) => {
//     if (!id) return;

//     if (session.data?.user?.email) {
//       setIsLoading(true);
//       const hygraphId =
//         state.cart.find((item) => item.id === id)?.hygraphId ?? null;
//       if (!hygraphId) return;

//       const res = await removeFromCart({ prodId: hygraphId });
//       if ("error" in res) {
//         toast({
//           variant: "destructive",
//           title: res.error,
//         });
//         setIsLoading(false);
//         return;
//       }
//       console.log(res);
//       setIsLoading(false);
//     }

//     dispatch({ type: "cart/deleteProduct", payload: id });
//   };

//   const increaseItemQuantity = async (id: string, quantity: number) => {
//     if (!id) return;

//     if (session.data?.user?.email) {
//       setIsLoading(true);
//       const hygraphId =
//         state.cart.find((item) => item.id === id)?.hygraphId ?? null;
//       if (!hygraphId) return;
//       const res = await updateCart({ prodId: hygraphId, quantity });
//       if (typeof res !== "string" && "error" in res) {
//         toast({
//           variant: "destructive",
//           title: res.error,
//         });
//         setIsLoading(false);
//         return;
//       }
//       console.log(res);
//       setIsLoading(false);
//     }

//     dispatch({ type: "cart/increaseQuantity", payload: id });
//   };

//   const decreaseItemQuantity = async (id: string, quantity: number) => {
//     if (!id) return;
//     if (session.data?.user?.email) {
//       setIsLoading(true);
//       const hygraphId =
//         state.cart.find((item) => item.id === id)?.hygraphId ?? null;
//       if (!hygraphId) return;
//       const res = await updateCart({ prodId: hygraphId, quantity });
//       if (typeof res !== "string" && "error" in res) {
//         toast({
//           variant: "destructive",
//           title: res.error,
//         });
//         setIsLoading(false);
//         return;
//       }
//       console.log(res);
//       setIsLoading(false);
//     }

//     dispatch({ type: "cart/decreaseQuantity", payload: id });
//   };

//   const getCurrentQuantityById = (id: string) => {
//     return state.cart.find((item) => item.id === id)?.quantity ?? 0;
//   };

//   const getTotalPrice = () => {
//     return state.cart.reduce((acc, cur) => acc + cur.totalPrice, 0);
//   };

//   const getTotalItems = () => {
//     return state.cart.reduce((acc, cur) => acc + cur.quantity, 0);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         state,
//         addToCart,
//         getCurrentQuantityById,
//         deleteFromCart,
//         increaseItemQuantity,
//         decreaseItemQuantity,
//         getTotalPrice,
//         getTotalItems,
//       }}
//     >
//       {isLoadingCart && <Loader />}
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);

//   if (!context) throw Error("Cart Context cannot be used outside Provider");

//   return context;
// };
