import * as Yup from "yup";

export function initialValues(userFirstName, userLastName) {
  return {
    userFirstName: userFirstName || "",
    userLastName: userLastName || "",
  };
}

export function validationSchema() {
  return Yup.object({
    userFirstName: Yup.string().required(true),
    userLastName: Yup.string().required(true),
  });
}
