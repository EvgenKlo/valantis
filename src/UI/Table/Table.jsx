import { useSelector } from "react-redux";

const tableHeaderItems = [
  { id: 1, name: "id" },
  { id: 2, name: "Name" },
  { id: 3, name: "Price" },
  { id: 4, name: "Brand" },
];

const Table = () => {
  const table = useSelector((state) => state.table.table);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {tableHeaderItems.map((item) => (
              <th key={item.id}>{item.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.length ? (
            table.map((item) => (
              <tr key={item.id}>
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
