import { useEffect } from "react";
import { Container, Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import { map } from "lodash";
import { useAuth } from "@/hooks";
import { Layout } from "@/components/Layout";
import { data } from "./JoinLayout.data";
import styles from "./JoinLayout.module.scss";

export function JoinLayout(props) {
  const { children } = props;
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, []);

  if (user) return null;

  return (
    <Container className={styles.container}>
      <Layout.Logo />

      <div>
        <div className={styles.left}>
          {map(data, (item, index) => (
            <div key={index}>
              <Icon name={item.icon} />
              <div>
                <h3>{item.title}</h3>
                <span>{item.description}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.right}>{children}</div>
      </div>
    </Container>
  );
}
