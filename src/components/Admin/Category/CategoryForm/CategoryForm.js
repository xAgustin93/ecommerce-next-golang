import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { categoryCtrl } from "@/api";
import { initialValues, validationSchema } from "./CategoryForm.form";

export function CategoryForm(props) {
  const { onClose, onReload, category } = props;

  const formik = useFormik({
    initialValues: initialValues(category),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (category) {
          await categoryCtrl.update(formValue, category.categID);
        } else {
          await categoryCtrl.create(formValue);
        }
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
        name="CategName"
        placeholder="Nombre de la categoria"
        value={formik.values.CategName}
        onChange={formik.handleChange}
        error={formik.errors.CategName}
      />
      <Form.Input
        name="CategPath"
        placeholder="Slug de la categoria"
        value={formik.values.CategPath}
        onChange={formik.handleChange}
        error={formik.errors.CategPath}
      />

      <Form.Button type="submit" fluid loading={formik.isSubmitting}>
        Enviar
      </Form.Button>
    </Form>
  );
}
