import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { userCtrl } from "@/api";
import { useAuth } from "@/hooks";
import { initialValues, validationSchema } from "./ChangeNameForm.form";

export function ChangeNameForm() {
  const { user } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(user.userFirstName, user.userLastName),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await userCtrl.updateMe(formValue);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <label>Cambiar nombre y apellidos</label>

      <Form.Input
        name="userFirstName"
        placeholder="Nombre"
        value={formik.values.userFirstName}
        onChange={formik.handleChange}
        error={formik.errors.userFirstName}
      />
      <Form.Input
        name="userLastName"
        placeholder="Apellidos"
        value={formik.values.userLastName}
        onChange={formik.handleChange}
        error={formik.errors.userLastName}
      />

      <Form.Button type="submit" loading={formik.isSubmitting}>
        Enviar
      </Form.Button>
    </Form>
  );
}
