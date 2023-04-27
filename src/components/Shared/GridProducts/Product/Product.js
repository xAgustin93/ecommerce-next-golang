import { useState, useEffect } from "react";
import { Image } from "semantic-ui-react";
import classNames from "classnames";
import Link from "next/link";
import { fn } from "@/utils";
import styles from "./Product.module.scss";

const NOT_FOUND_IMG = "/images/not-found.jpg";

export function Product(props) {
  const { product, classProduct } = props;
  const [image, setImage] = useState(NOT_FOUND_IMG);
  const lowStock = product.prodStock > 0 && product.prodStock < 10;

  useEffect(() => {
    const imageUrl = fn.getUrlImage(product.prodID);
    fn.checkIfImageExists(imageUrl, (exists) => {
      if (exists) setImage(imageUrl);
    });
  }, [product]);

  return (
    <div
      className={classNames(styles.container, {
        [classProduct]: classProduct,
      })}
    >
      <Link href={`/product/${product.prodPath}`}>
        <div className={styles.content}>
          <Image src={image} alt={product.prodTitle} />
          <h3>{product.prodTitle}</h3>

          <div className={styles.footer}>
            <span>{product.prodPrice}€</span>
          </div>

          {lowStock && (
            <p className={styles.lowStock}>
              {`Solo quedan ${product.prodStock} unidades`}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
