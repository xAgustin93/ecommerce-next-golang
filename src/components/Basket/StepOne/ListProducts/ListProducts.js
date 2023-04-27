import { Icon, Image, Dropdown } from "semantic-ui-react";
import { map } from "lodash";
import { useBasket } from "@/hooks";
import { fn } from "@/utils";
import styles from "./ListProducts.module.scss";

export function ListProducts(props) {
  const { products } = props;
  const { changeQuantityItem, deleteItem } = useBasket();

  const options = Array.from({ length: 50 }, (_, index) => {
    const number = index + 1;
    return { key: number, text: String(number), value: number };
  });

  return (
    <div className={styles.basket}>
      <h2>Cesta</h2>

      {map(products, (product) => (
        <div key={product.prodID} className={styles.product}>
          <Image src={fn.getUrlImage(product.prodID)} alt={product.prodTitle} />

          <div>
            <div className={styles.info}>
              <p>{product.prodTitle}</p>
            </div>

            <div className={styles.actions}>
              <Dropdown
                className="number"
                options={options}
                selection
                compact
                value={product.quantity}
                onChange={(_, data) =>
                  changeQuantityItem(product.prodID, data.value)
                }
              />
              <span>{product.prodPrice}€</span>
              <Icon
                name="trash alternate online"
                link
                onClick={() => deleteItem(product.prodID)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
