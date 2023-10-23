import { createContext, useState, useEffect } from "react";
import _ from "lodash";

const cartContext = createContext({
  items: [],
  setItems: (item) => {},
});

const CartContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const updatePersistentItems = () => {
    localStorage.setItem("cart", JSON.stringify(items));
  };

  useEffect(() => {
    const alreadyOnCart = JSON.parse(localStorage.getItem("cart"));

    setItems(alreadyOnCart);
  }, []);

  useEffect(() => {
    updatePersistentItems();
  }, [items]);

  return (
    <cartContext.Provider value={{ items, setItems }}>
      {children}
    </cartContext.Provider>
  );
};

export { cartContext, CartContextProvider };
