import * as Yup from "yup";

export function initialValues(data) {
  return {
    ProdTitle: data?.prodTitle || "",
    ProdDescription: data?.prodDescription || "",
    ProdPrice: data?.prodPrice || "",
    ProdStock: data?.prodStock || "",
    ProdPath: data?.prodPath || "",
    ProdCategId: data?.prodCategId || null,
  };
}

export function validationSchema() {
  return Yup.object({
    ProdTitle: Yup.string().required(true),
    ProdDescription: Yup.string().required(true),
    ProdPrice: Yup.number().required(true),
    ProdStock: Yup.number().required(true),
    ProdPath: Yup.string().required(true),
    ProdCategId: Yup.number().required(true),
  });
}
