import { useState, useEffect } from "react";
import { Table } from "semantic-ui-react";
import { map } from "lodash";
import { useRouter } from "next/router";
import { userCtrl } from "@/api";
import { Loading, Pagination } from "@/components/Shared";
import { User } from "./User";

const ITEM_PER_PAGE = 10;
export function UserList() {
  const [users, setUsers] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const { query } = useRouter();
  const page = Number(query.page || 1);

  useEffect(() => {
    (async () => {
      try {
        setUsers(null);
        const response = await userCtrl.getAll(page);
        setUsers(response.data);
        setTotalPages(Math.ceil(response.totalItems / ITEM_PER_PAGE));
      } catch (error) {
        console.error(error);
      }
    })();
  }, [query.page]);

  if (!users) return <Loading text="Cargando usuarios" />;

  return (
    <>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Avatar</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Admin</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {map(users, (user) => (
            <Table.Row key={user.userUUID}>
              <User user={user} />
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Pagination currentPage={page} totalPages={totalPages} />
    </>
  );
}
