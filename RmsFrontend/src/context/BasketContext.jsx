// src/context/BasketContext.jsx
import React, { createContext, useContext, useState } from 'react';

const BasketContext = createContext();

export function BasketProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  return (
    <BasketContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  return useContext(BasketContext);
}