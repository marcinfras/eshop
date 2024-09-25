"use client";

import type {
  TransitionStartFunction} from "react";
import {
  createContext,
  useContext,
  useTransition,
} from "react";
import { Loader } from "../../Loader";

const LoaderContext = createContext<{
  startTransition: TransitionStartFunction;
} | null>(null);

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <LoaderContext.Provider value={{ startTransition }}>
      {isPending && <Loader />}
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContext);

  if (!context) throw Error("Loader Context cannot be used outside Provider");

  return context;
};
