import { Container } from "semantic-ui-react";
import { size } from "lodash";
import { productCtrl } from "@/api";
import { BasicLayout } from "@/layouts";
import { Separator, GridProducts, Pagination } from "@/components/Shared";
import styles from "./category.module.scss";

export default function CategoryPage(props) {
  const { products, pagination } = props;
  const { page, totalPages } = pagination;

  return (
    <BasicLayout>
      <Container>
        <Separator height={20} />

        <GridProducts products={products} classProduct={styles.product} />
        {size(products) > 0 && (
          <Pagination currentPage={page} totalPages={totalPages} />
        )}
      </Container>
    </BasicLayout>
  );
}

export async function getServerSideProps(context) {
  const {
    params: { slug },
    query: { page = 1, search },
  } = context;

  const ITEMS_PER_PAGE = 10;

  if (search) {
    return { props: { products: "", pagination: "" } };
  }

  try {
    const response = await productCtrl.getByCategorySlug(
      slug,
      page,
      ITEMS_PER_PAGE
    );

    const products = response.data || [];
    const totalPages = Math.ceil(response.totalItems / ITEMS_PER_PAGE);
    const pagination = { page, totalPages };

    return { props: { products, pagination } };
  } catch (error) {
    return { props: { notFound: true } };
  }
}
