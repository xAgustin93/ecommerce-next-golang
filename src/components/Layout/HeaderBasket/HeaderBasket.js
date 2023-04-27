import { Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import { map } from "lodash";
import classNames from "classnames";
import { Logo } from "../Logo";
import styles from "./HeaderBasket.module.scss";

export function HeaderBasket() {
  const {
    query: { step = 1 },
  } = useRouter();
  const currentStep = Number(step);

  const steps = [
    { number: 1, title: "Cesta" },
    { number: 2, title: "Dirección de envío" },
    { number: 3, title: "Método de pago" },
    { number: 4, title: "Confirmación" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Logo />
      </div>

      <div className={styles.center}>
        {map(steps, (item) => (
          <div
            key={item.number}
            className={classNames({
              [styles.active]: item.number === currentStep,
              [styles.success]: item.number < currentStep,
            })}
          >
            <span className={styles.number}>
              <Icon name="check" />
              {item.number}
            </span>
            <span>{item.title}</span>
            <span className={styles.space} />
          </div>
        ))}
      </div>

      <div className={styles.right} />
    </div>
  );
}
