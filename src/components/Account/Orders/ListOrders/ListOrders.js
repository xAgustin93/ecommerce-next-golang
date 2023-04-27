import { useState, useEffect } from "react";
import { map, size } from "lodash";
import { orderCtrl } from "@/api";
import { Loading, NoResult } from "@/components/Shared";
import { Order } from "./Order";

export function ListOrders() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await orderCtrl.getAll();
        setOrders(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!orders) {
    return <Loading text="Cargando pedidos" top={100} />;
  }

  return (
    <div>
      {size(orders) === 0 && <NoResult text="No tienes pedidos realizados" />}

      {map(orders, (order) => (
        <Order key={order.orderId} order={order} />
      ))}
    </div>
  );
}
