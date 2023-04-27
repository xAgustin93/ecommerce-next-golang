import { useState, useEffect, useCallback } from "react";
import { Button, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import { userCtrl } from "@/api";
import { useAuth } from "@/hooks";
import { fn } from "@/utils";
import { initialValues, validationSchema } from "./AvatarForm.form";
import styles from "./AvatarForm.module.scss";

export function AvatarForm() {
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        setLoading(true);
        const render = new FileReader();
        render.readAsArrayBuffer(formValue.file);
        render.onload = async () => {
          const image = render.result;
          await userCtrl.updateAvatar(user.userUUID, image);
          setLoading(false);
        };
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    if (formik.values.file) {
      setAvatar(formik.values.preview);
    } else {
      const imageUrl = fn.getUrlImage(user.userUUID);
      fn.checkIfImageExists(imageUrl, (exists) => {
        if (exists) setAvatar(imageUrl);
        else setAvatar(null);
      });
    }
  }, [formik.values.file]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    formik.setFieldValue("file", file);
    formik.setFieldValue("preview", URL.createObjectURL(file));
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg",
    onDrop,
  });

  return (
    <div>
      <div className={styles.imageContainer} {...getRootProps()}>
        <input {...getInputProps()} />
        {avatar ? (
          <Image size="small" src={avatar} />
        ) : (
          <div>
            <span>Arrastra la imagen</span>
          </div>
        )}
      </div>

      <Button primary loading={loading} onClick={formik.handleSubmit}>
        Enviar
      </Button>
    </div>
  );
}
