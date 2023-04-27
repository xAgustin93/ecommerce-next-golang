import { useState, useEffect } from "react";
import { Table } from "semantic-ui-react";
import { size, map } from "lodash";
import { categoryCtrl } from "@/api";
import { Loading, NoResult } from "@/components/Shared";
import { Category } from "./Category";

export function ListCategories(props) {
  const { reload, onReload } = props;
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await categoryCtrl.getAll();
        setCategories(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reload]);

  if (!categories) return <Loading text="Cargando categorias" />;

  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Slug</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {size(categories) === 0 && (
          <Table.Cell colSpan="4">
            <NoResult text="No hay categorias" />
          </Table.Cell>
        )}

        {map(categories, (category) => (
          <Table.Row key={category.categID}>
            <Category category={category} onReload={onReload} />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
