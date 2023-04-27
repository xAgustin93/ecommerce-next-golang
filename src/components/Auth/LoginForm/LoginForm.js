import { Form, Button } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { authCtrl } from "@/api";
import { useAuth } from "@/hooks";
import { initialValues, validationSchema } from "./LoginForm.form";
import styles from "./LoginForm.module.scss";

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await authCtrl.login(formValue.email, formValue.password);
        await login();
        router.push("/");
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          name="email"
          placeholder="Correo electronico"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
        <Form.Input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
        <Form.Button type="submit" fluid loading={formik.isSubmitting}>
          Iniciar sesión
        </Form.Button>
      </Form>

      <p className={styles.register}>¿Eres nuevo cliente?</p>
      <Button as={Link} href="/join/register" fluid basic>
        Crear cuenta
      </Button>
    </>
  );
}
