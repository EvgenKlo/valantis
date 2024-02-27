import { useSelector } from "react-redux";
import styles from "./loader.module.scss";

const Loader = () => {
  const table = useSelector((state) => state.table.loader);

  return (
    <div
      className={styles.loaderLayout}
      style={{ display: table ? "flex" : "none" }}
    >
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
