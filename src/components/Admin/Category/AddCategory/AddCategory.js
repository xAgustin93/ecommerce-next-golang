import { useState } from "react";
import { Button } from "semantic-ui-react";
import { Modal } from "@/components/Shared";
import { CategoryForm } from "../CategoryForm";

export function AddCategory(props) {
  const { onReload } = props;
  const [openModal, setOpenModal] = useState(false);

  const openCloseModal = () => setOpenModal((prevState) => !prevState);

  return (
    <>
      <Button primary onClick={openCloseModal}>
        Nueva categoría
      </Button>

      <Modal.Basic
        show={openModal}
        onClose={openCloseModal}
        title="Nueva categoría"
      >
        <CategoryForm onClose={openCloseModal} onReload={onReload} />
      </Modal.Basic>
    </>
  );
}
