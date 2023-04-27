import { useState, useEffect } from "react";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { productCtrl } from "@/api";
import { fn } from "@/utils";
import { Loading } from "@/components/Shared";
import styles from "./ProductsDetails.module.scss";

export function ProductsDetails(props) {
  const { productsOrder } = props;
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const productsTemp = [];
        for await (const item of productsOrder) {
          const response = await productCtrl.getById(item.odProdId);
          productsTemp.push({ ...response, quantity: item.odQuantity });
        }
        setProducts(productsTemp);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    })();
  }, [productsOrder]);

  if (loading) return <Loading text="Cargando productos" />;

  return (
    <div>
      {map(products, (product) => (
        <div key={product.prodID} className={styles.product}>
          <div>
            <Image
              src={fn.getUrlImage(product.prodID)}
              alt={product.prodTitle}
            />
            <div>
              <h4>{product.prodTitle}</h4>
            </div>
          </div>

          <p className={styles.price}>
            {product.quantity} x {product.prodPrice}€
          </p>
        </div>
      ))}
    </div>
  );
}
