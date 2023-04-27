import { map } from "lodash";
import classNames from "classnames";
import { paymentsData } from "./Payments.data";
import styles from "./Payments.module.scss";

export function Payments(props) {
  const { paymentSelected, setPaymentSelected } = props;

  return (
    <div className={styles.payments}>
      <h2>Metodos de pago</h2>

      {map(paymentsData, (item) => (
        <div
          key={item.id}
          className={classNames(styles.payment, {
            [styles.selected]: item.id === paymentSelected?.id,
          })}
          onClick={() => setPaymentSelected(item)}
        >
          <div>
            <p className={styles.name}>{item.name}:</p>
            <p className={styles.description}>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
