import { useState, useEffect } from "react";
import { productCtrl } from "@/api";
import { BasicLayout } from "@/layouts";
import { fn } from "@/utils";
import { Product } from "@/components/Product";
import { Separator } from "@/components/Shared";
import { Container, Image } from "semantic-ui-react";
import styles from "./product.module.scss";

const NOT_FOUND_IMG = "/images/not-found.jpg";

export default function ProductPage(props) {
  const { product } = props;
  const [image, setImage] = useState(NOT_FOUND_IMG);

  useEffect(() => {
    const imageUrl = fn.getUrlImage(product.prodID);
    fn.checkIfImageExists(imageUrl, (exists) => {
      if (exists) setImage(imageUrl);
    });
  }, [product]);

  return (
    <BasicLayout>
      <Container>
        <div className={styles.product}>
          <div>
            <Image src={image} alt={product.prodTitle} />
          </div>
          <div>
            <Product.Info product={product} />
          </div>
        </div>

        <Separator height={20} />
        <Product.Description product={product} />
      </Container>

      <Separator height={50} />
    </BasicLayout>
  );
}

export async function getServerSideProps(context) {
  const {
    params: { slug },
    query: { search },
  } = context;

  if (search) return { props: { product: "" } };

  try {
    const response = await productCtrl.getBySlug(slug);
    return { props: { product: response } };
  } catch (error) {
    return { props: { notFound: true } };
  }
}
