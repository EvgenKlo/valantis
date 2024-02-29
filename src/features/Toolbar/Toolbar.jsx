import Filters from "../Filters/Filters";
import Pagination from "../Pagination/Pagination";
import styles from "./toolbar.module.scss";

const Toolbar = () => {
  return (
    <div className={styles.toolbar}>
      <Filters />
      <Pagination />
    </div>
  );
};

export default Toolbar;
