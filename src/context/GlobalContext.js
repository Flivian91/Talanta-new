"use client";
import { createContext, useReducer, useContext } from "react";
import { GlobalReducer } from "./GlobalReducer";

const GlobalContext = createContext();

const initialState = {
  isModalOpen: false,
  user: null,
  talents: [],
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
