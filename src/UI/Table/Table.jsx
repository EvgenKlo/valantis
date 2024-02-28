import styles from "./table.module.scss";
import { useSelector } from "react-redux";

const tableHeaderItems = [
  { id: 1, name: "№" },
  { id: 2, name: "id" },
  { id: 3, name: "Name" },
  { id: 4, name: "Price" },
  { id: 5, name: "Brand" },
];

const Table = () => {
  const table = useSelector((state) => state.table);

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            {tableHeaderItems.map((item) => (
              <th key={item.id}>{item.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.table.length ? (
            table.table.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1 + table.offset}</td>
                <td>{item.id}</td>
                <td>{item.product}</td>
                <td>{item.price}</td>
                <td>{item.brand}</td>
              </tr>
            ))
          ) : (
            <tr>
              {tableHeaderItems.map((item) => (
                <td key={item.id}>Пусто</td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
