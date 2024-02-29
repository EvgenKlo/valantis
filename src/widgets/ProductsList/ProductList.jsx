import styles from "./productList.module.scss";
import Table from "../../entities/Table/Table";
import Toolbar from "../../features/Toolbar/Toolbar";
import Pagination from "../../features/Pagination/Pagination";

const ProductList = () => {
  return (
    <div className={styles.container}>
      <Toolbar />
      <Table />
      <div className={styles.paginationOnly}>
        <Pagination />
      </div>
    </div>
  );
};

export default ProductList;
