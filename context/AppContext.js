import React, { createContext, useState, useEffect } from "react";

import { GetAllCategories } from "../services/dal/CategoryDAL";
import { GetAllProducts } from "../services/dal/ProductDAL";

const Ctx = createContext();

const AppProvider = ({ children }) => {
  const [categories, setCategories] = useState({});
  const [products, setProducts] = useState({});
  const [cart, setCart] = useState([])

  const getCategories = async () => {
    await GetAllCategories(setCategories);
  };

  const getProducts = async () => {
    await GetAllProducts(setProducts)
  };

  useEffect(() => {
    getCategories();
    getProducts()
  }, []);

  return (
    <Ctx.Provider value={{categories, setCategories, products, setProducts, cart, setCart }}>
      {children}
    </Ctx.Provider>
  );
};

export { Ctx, AppProvider };
