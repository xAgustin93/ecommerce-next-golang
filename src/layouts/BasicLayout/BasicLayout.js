import { Container } from "semantic-ui-react";
import { useAuth } from "@/hooks";
import { Layout } from "@/components/Layout";
import { Search } from "@/components/Shared";
import styles from "./BasicLayout.module.scss";

export function BasicLayout(props) {
  const { children } = props;
  const { isAdmin } = useAuth();

  return (
    <>
      <div className={styles.border}>
        <Container className={styles.header}>
          <div className={styles.left}>
            <Layout.Logo />
            <Search
              className={styles.search}
              placeholder="Busca lo que necesitas..."
            />
          </div>

          <div>
            {isAdmin && <Layout.AdminButton />}
            <Layout.Account />
            <Layout.Basket />
          </div>
        </Container>
      </div>

      <div className={styles.border}>
        <Container>
          <Layout.CategoriesMenu />
        </Container>
      </div>

      {children}
    </>
  );
}
