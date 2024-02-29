import styles from "./productList.module.scss";
import Table from "../../entities/Table/Table";
import Toolbar from "../../features/Toolbar/Toolbar";

const ProductList = () => {
  return (
    <div className={styles.container}>
      <Toolbar />
      <Table />
      <Toolbar />
    </div>
  );
};

export default ProductList;
