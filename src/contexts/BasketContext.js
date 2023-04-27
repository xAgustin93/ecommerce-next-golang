import { useState, useEffect, createContext } from "react";
import { basketCtrl } from "@/api";

export const BasketContext = createContext();

export function BasketProvider(props) {
  const { children } = props;
  const [basket, setBasket] = useState(null);
  const [total, setTotal] = useState(basketCtrl.count());

  useEffect(() => {
    const response = basketCtrl.getAll();
    setBasket(response);
  }, []);

  const refreshBasket = () => {
    setTotal(basketCtrl.count());
    setBasket(basketCtrl.getAll());
  };

  const addBasket = (productId) => {
    basketCtrl.add(productId);
    refreshBasket();
  };

  const changeQuantityItem = (productId, quantity) => {
    basketCtrl.changeQuantity(productId, quantity);
    refreshBasket();
  };

  const deleteItem = (productId) => {
    basketCtrl.deleteItem(productId);
    refreshBasket();
  };

  const deleteAllItems = () => {
    basketCtrl.deleteAll();
    refreshBasket();
  };

  const data = {
    basket,
    total,
    addBasket,
    deleteItem,
    deleteAllItems,
    changeQuantityItem,
  };

  return (
    <BasketContext.Provider value={data}>{children}</BasketContext.Provider>
  );
}
