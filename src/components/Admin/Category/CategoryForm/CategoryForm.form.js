import * as Yup from "yup";

export function initialValues(data) {
  return {
    CategName: data?.categName || "",
    CategPath: data?.categPath || "",
  };
}

export function validationSchema() {
  return Yup.object({
    CategName: Yup.string().required(true),
    CategPath: Yup.string().required(true),
  });
}
