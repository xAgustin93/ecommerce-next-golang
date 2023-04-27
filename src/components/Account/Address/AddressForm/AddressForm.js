import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { addressCtrl } from "@/api";
import { initialValues, validationSchema } from "./AddressForm.form";

export function AddressForm(props) {
  const { onClose, onReload, address } = props;

  const formik = useFormik({
    initialValues: initialValues(address),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (address) {
          await addressCtrl.update(formValue, address.addId);
        } else {
          await addressCtrl.create(formValue);
        }

        formik.handleReset();
        onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="addTitle"
        placeholder="Titulo dela dirección"
        value={formik.values.addTitle}
        onChange={formik.handleChange}
        error={formik.errors.addTitle}
      />

      <Form.Group widths="equal">
        <Form.Input
          name="addName"
          placeholder="Nombre y apellidos"
          value={formik.values.addName}
          onChange={formik.handleChange}
          error={formik.errors.addName}
        />
        <Form.Input
          name="addAddress"
          placeholder="Dirección"
          value={formik.values.addAddress}
          onChange={formik.handleChange}
          error={formik.errors.addAddress}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="addState"
          placeholder="Provincia"
          value={formik.values.addState}
          onChange={formik.handleChange}
          error={formik.errors.addState}
        />
        <Form.Input
          name="addCity"
          placeholder="Ciudad"
          value={formik.values.addCity}
          onChange={formik.handleChange}
          error={formik.errors.addCity}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="addPostalCode"
          placeholder="Codigo postal"
          value={formik.values.addPostalCode}
          onChange={formik.handleChange}
          error={formik.errors.addPostalCode}
        />
        <Form.Input
          name="addPhone"
          placeholder="Telefono"
          value={formik.values.addPhone}
          onChange={formik.handleChange}
          error={formik.errors.addPhone}
        />
      </Form.Group>

      <Form.Button type="submit" fluid loading={formik.isSubmitting}>
        Enviar
      </Form.Button>
    </Form>
  );
}
