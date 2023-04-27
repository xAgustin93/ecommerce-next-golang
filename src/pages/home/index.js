import { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { productCtrl } from "@/api";
import { BasicLayout } from "@/layouts";
import { Separator, GridCategories, GridProducts } from "@/components/Shared";
import styles from "./home.module.scss";

export default function HomePage() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await productCtrl.getAll(1, 100);
        setProducts(response.data || []);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <BasicLayout>
      <Separator height={50} />

      <Container>
        <GridCategories />

        <Separator height={50} />

        <h2>Últimos productos</h2>
        <Separator height={10} />
        <GridProducts
          products={products}
          columns={4}
          classProduct={styles.product}
        />
      </Container>
    </BasicLayout>
  );
}
