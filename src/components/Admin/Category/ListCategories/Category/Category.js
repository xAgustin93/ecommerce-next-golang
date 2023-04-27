import { useState } from "react";
import { Table, Icon } from "semantic-ui-react";
import { categoryCtrl } from "@/api";
import { Modal } from "@/components/Shared";
import { CategoryForm } from "../../CategoryForm";
import styles from "./Category.module.scss";

export function Category(props) {
  const { category, onReload } = props;
  const [openModal, setOpenModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onOpenCloseModal = () => setOpenModal((prevState) => !prevState);
  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const onDelete = async () => {
    try {
      await categoryCtrl.delete(category.categID);
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Table.Cell>{category.categID}</Table.Cell>
      <Table.Cell>{category.categName}</Table.Cell>
      <Table.Cell>{category.categPath}</Table.Cell>
      <Table.Cell className={styles.actions} textAlign="right">
        <Icon name="pencil" link onClick={onOpenCloseModal} />
        <Icon name="trash" link onClick={onOpenCloseConfirm} />
      </Table.Cell>

      <Modal.Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={onDelete}
        content={`¿Estas seguro de eliminar la categoría (${category.categName})?`}
      />

      <Modal.Basic
        show={openModal}
        onClose={onOpenCloseModal}
        title={`Editar (${category.categName})`}
      >
        <CategoryForm
          onClose={onOpenCloseModal}
          onReload={onReload}
          category={category}
        />
      </Modal.Basic>
    </>
  );
}
