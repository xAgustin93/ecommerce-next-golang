import * as Yup from "yup";

export function initialValues(data) {
  return {
    addTitle: data?.addTitle || "",
    addName: data?.addName || "",
    addAddress: data?.addAddress || "",
    addCity: data?.addCity || "",
    addState: data?.addState || "",
    addPostalCode: data?.addPostalCode || "",
    addPhone: data?.addPhone || "",
  };
}

export function validationSchema() {
  return Yup.object({
    addTitle: Yup.string().required(true),
    addName: Yup.string().required(true),
    addAddress: Yup.string().required(true),
    addCity: Yup.string().required(true),
    addState: Yup.string().required(true),
    addPostalCode: Yup.string().required(true),
    addPhone: Yup.number().required(true),
  });
}
