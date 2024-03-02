import { useState } from "react";
import styles from "./filters.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  changeOffset,
  getFilterProducts,
  getProductsInfo,
  removeFilterProductsCount,
  toggleLoader,
} from "../../store/slices/tableSlice";

const Filters = () => {
  const [filter, setFilter] = useState("product");

  const [inputValue, setInputValue] = useState("");

  const state = useSelector((state) => state.table);

  const dispatch = useDispatch();

  return (
    <div className={styles.filtersContainer}>
      <h2 className={styles.title}>
        Фильтровать
        <br />
        список по:
      </h2>
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
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(toggleLoader());
            dispatch(changeOffset(0));
            dispatch(removeFilterProductsCount());
            dispatch(getFilterProducts({ param: filter, value: inputValue }));
          }}
        >
          <input
            required
            type={
              filter === "product" || filter === "brand" ? "text" : "number"
            }
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <input type="submit" value="Применить" />
        </form>
      </div>
      <button
        disabled={state.filterProductsCount === null}
        onClick={() => {
          setInputValue("");
          dispatch(toggleLoader());
          dispatch(getProductsInfo({ offset: 0, limit: state.limit }));
          dispatch(removeFilterProductsCount());
        }}
      >
        Сбросить фильтр
      </button>
    </div>
  );
};

export default Filters;
