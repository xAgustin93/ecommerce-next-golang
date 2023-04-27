import { useState, useEffect } from "react";
import { Table } from "semantic-ui-react";
import { size, map } from "lodash";
import { useRouter } from "next/router";
import { productCtrl } from "@/api";
import { Loading, Pagination, NoResult } from "@/components/Shared";
import { Product } from "./Product";

const ITEMS_PER_PAGE = 10;

export function ListProducts(props) {
  const { reload, onReload } = props;
  const [products, setProducts] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const { query } = useRouter();
  const page = Number(query.page || 1);

  useEffect(() => {
    (async () => {
      try {
        setProducts(null);
        const searchText = query.searchAdmin || "";
        const response = await productCtrl.getAll(
          page,
          ITEMS_PER_PAGE,
          searchText
        );

        setProducts(response.data || []);
        setTotalPages(Math.ceil(response.totalItems / ITEMS_PER_PAGE));
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reload, query.page, query.searchAdmin]);

  if (!products) return <Loading text="Cargando productos" />;

  return (
    <div>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Image</Table.HeaderCell>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Precio</Table.HeaderCell>
            <Table.HeaderCell>Stock</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {size(products) === 0 && (
            <Table.Cell colSpan="5">
              <NoResult text="No hay productos" />
            </Table.Cell>
          )}

          {map(products, (product) => (
            <Table.Row key={product.prodID}>
              <Product product={product} onReload={onReload} />
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
