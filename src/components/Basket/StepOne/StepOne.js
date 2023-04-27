import { Container } from "semantic-ui-react";
import { ListProducts } from "./ListProducts";
import { Resume } from "../Resume";
import styles from "./StepOne.module.scss";

export function StepOne(props) {
  const { products } = props;

  return (
    <Container className={styles.container}>
      <div className={styles.left}>
        <ListProducts products={products} />
      </div>
      <div className={styles.right}>
        <Resume
          products={products}
          nextStep={2}
          btnText="Proceder con la dirección"
        />
      </div>
    </Container>
  );
}
