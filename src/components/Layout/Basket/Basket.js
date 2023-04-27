import { Icon, Label } from "semantic-ui-react";
import Link from "next/link";
import { useBasket } from "@/hooks";
import styles from "./Basket.module.scss";

export function Basket() {
  const { total } = useBasket();

  return (
    <Link href="/basket" className={styles.basket}>
      <Icon name="cart" />
      {total > 0 && (
        <Label circular color="teal">
          {total}
        </Label>
      )}
      Mi cesta
    </Link>
  );
}
