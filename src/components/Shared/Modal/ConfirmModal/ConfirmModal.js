import { useState } from "react";
import { Confirm, Button } from "semantic-ui-react";

export function ConfirmModal(props) {
  const { onConfirm, ...rest } = props;
  const [loading, setLoading] = useState(false);

  const onConfirmWrapper = () => {
    setLoading(true);
    onConfirm();
  };

  return (
    <Confirm
      className="confirm"
      size="mini"
      onConfirm={onConfirmWrapper}
      confirmButton={
        <Button primary loading={loading}>
          Ok
        </Button>
      }
      {...rest}
    />
  );
}
