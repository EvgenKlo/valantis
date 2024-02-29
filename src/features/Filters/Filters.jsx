import { useState } from "react";
import Api from "../../shared/api/Api";
import styles from "./filters.module.scss";

const Filters = () => {
  const [filter, setFilter] = useState("product");

  const [inputValue, setInputValue] = useState("");

  return (
    <div className={styles.filtersContainer}>
      <h2>Фильтровать список по:</h2>
      <div className={styles.buttonsContainer}>
        <select
          name="filter"
          onChange={(e) => {
            setFilter(e.target.value);
            setInputValue("");
          }}
          value={filter}
        >
          <option value="product">названию</option>
          <option value="price">цене</option>
          <option value="brand">бренду</option>
        </select>
        <input
          type={filter === "product" || filter === "brand" ? "text" : "number"}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button
          onClick={async () => {
            // const result = await Api.getFilterProducts(filter);
            // console.log(result);
            console.log(inputValue);
          }}
        >
          Применить
        </button>
      </div>
    </div>
  );
};

export default Filters;
