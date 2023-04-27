import { useState, useEffect } from "react";
import { addressCtrl } from "@/api";
import { Loading } from "@/components/Shared";
import styles from "./AddressDetails.module.scss";

export function AddressDetails(props) {
  const { addressId } = props;
  const [address, setAddress] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await addressCtrl.getById(addressId);
        setAddress(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [addressId]);

  if (!address) return <Loading text="Cargando dirección" />;

  return (
    <div className={styles.container}>
      <h4>Dirección de envio:</h4>

      <div className={styles.address}>
        <p className={styles.title}>{address.addTitle}</p>
        <p className={styles.addressInfo}>
          {address.addName}, {address.addAddress}, {address.addState},{" "}
          {address.addCity}, {address.addPostalCode}
        </p>
      </div>
    </div>
  );
}
