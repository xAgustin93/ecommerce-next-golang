import { useContext } from "react";
import { BasketContext } from "@/contexts";

export const useBasket = () => useContext(BasketContext);
