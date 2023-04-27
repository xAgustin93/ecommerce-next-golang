import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { productCtrl } from "@/api";
import { Separator, GridProducts } from "@/components/Shared";
import styles from "./SearchContext.module.scss";

export function SearchProvider(props) {
  const { children } = props;
  const [products, setProducts] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const { query } = useRouter();

  useEffect(() => {
    if (query.search) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [query.search]);

  useEffect(() => {
    (async () => {
      try {
        setProducts(null);
        const response = await productCtrl.getAll(1, 100000, query.search);

        setProducts(response.data || []);
        setTotalItems(response.totalItems || 0);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [query.search]);

  return (
    <>
      {children}

      {query.search && (
        <div className={styles.container}>
          <div className={styles.infoSearch}>
            <p>Buscando: {query.search}</p>
            <p>{totalItems} resultados</p>
          </div>

          <Separator height={20} />

          <GridProducts
            products={products}
            columns={6}
            classProduct={styles.product}
          />
        </div>
      )}
    </>
  );
}
