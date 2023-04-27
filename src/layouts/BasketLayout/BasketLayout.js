import { Layout } from "@/components/Layout";
import { Separator } from "@/components/Shared";
import styles from "./BasketLayout.module.scss";

export function BasketLayout(props) {
  const { children } = props;

  return (
    <div className={styles.container}>
      <Layout.HeaderBasket />
      <Separator height={100} />
      {children}
    </div>
  );
}
