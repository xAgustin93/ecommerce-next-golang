import { useState } from "react";
import { Button } from "semantic-ui-react";
import { Modal } from "@/components/Shared";
import { AddressForm } from "../AddressForm";

export function AddAddress(props) {
  const { onReload } = props;
  const [showModal, setShowModal] = useState(false);

  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  return (
    <>
      <Button primary onClick={onCloseOpenModal}>
        Nueva dirección
      </Button>

      <Modal.Basic
        show={showModal}
        onClose={onCloseOpenModal}
        title="Nueva dirección"
      >
        <AddressForm onClose={onCloseOpenModal} onReload={onReload} />
      </Modal.Basic>
    </>
  );
}
