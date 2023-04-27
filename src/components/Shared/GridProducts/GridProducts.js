import { size, map } from "lodash";
import classNames from "classnames";
import { Separator } from "../Separator";
import { Loading } from "../Loading";
import { NoResult } from "../NoResult";
import { Product } from "./Product";
import styles from "./GridProducts.module.scss";

export function GridProducts(props) {
  const { products, columns = 4, classProduct } = props;

  if (!products) {
    return (
      <>
        <Separator height={50} />
        <Loading text="Cargando productos" />
        <Separator height={50} />
      </>
    );
  }

  if (size(products) === 0) {
    return <NoResult text="No se han encontrado resultados" />;
  }

  return (
    <div className={styles.container}>
      {map(products, (product) => (
        <div
          key={product.prodID}
          className={classNames({
            [styles.oneColumn]: columns === 1,
            [styles.twoColumns]: columns === 2,
            [styles.threeColumns]: columns === 3,
            [styles.fourColumns]: columns === 4,
            [styles.fiveColumns]: columns === 5,
            [styles.sixColumns]: columns === 6,
          })}
        >
          <Product product={product} classProduct={classProduct} />
        </div>
      ))}
    </div>
  );
}
