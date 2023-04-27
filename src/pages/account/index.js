import { useState } from "react";
import { Container, Tab } from "semantic-ui-react";
import { useAuth } from "@/hooks";
import { BasicLayout } from "@/layouts";
import { Separator } from "@/components/Shared";
import { Settings, Address, Orders } from "@/components/Account";
import styles from "./account.module.scss";

export default function AccountPage() {
  const [reload, setReload] = useState(false);
  const { logout } = useAuth();

  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      menuItem: "Mis datos",
      render: () => (
        <Tab.Pane>
          <Settings.AvatarForm />
          <Separator height={50} />
          <Settings.ChangeNameForm />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Mis direcciones",
      render: () => (
        <Tab.Pane>
          <Address.AddAddress onReload={onReload} />
          <Address.ListAddresses reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Mis pedidos",
      render: () => (
        <Tab.Pane>
          <Orders.List />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 20,
        icon: "log out",
        content: "Cerrar sesion",
        onClick: logout,
      },
    },
  ];

  return (
    <BasicLayout>
      <Container>
        <Tab
          menu={{ fluid: true, vertical: true, tabular: true }}
          panes={panes}
          className={styles.tabs}
        />
      </Container>
    </BasicLayout>
  );
}
