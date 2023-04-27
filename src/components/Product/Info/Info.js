import { useState } from "react";
import { Button } from "semantic-ui-react";
import { useBasket } from "@/hooks";
import styles from "./Info.module.scss";

export function Info(props) {
  const { product } = props;
  const [loading, setLoading] = useState(false);
  const { addBasket } = useBasket();

  const addBasketWrapper = () => {
    setLoading(true);
    addBasket(product.prodID);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{product.prodTitle}</h1>
      <span className={styles.stock}>
        {`Quedan ${product.prodStock} unidade/s`}
      </span>
      <span className={styles.price}>{product.prodPrice}€</span>

      <Button
        primary
        className={styles.btnBuy}
        onClick={addBasketWrapper}
        loading={loading}
      >
        Comprar
      </Button>
    </div>
  );
}
