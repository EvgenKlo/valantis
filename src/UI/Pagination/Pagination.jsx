import { useDispatch, useSelector } from "react-redux";
import {
  changeOffset,
  getProductsInfo,
  toggleLoader,
} from "../../store/slices/tableSlice";
import styles from "./pagination.module.scss";

const Pagination = () => {
  const state = useSelector((state) => state.table);

  let offset = state.offset;

  const pageNumber = offset ? offset / state.limit + 1 : 1;

  const dispatch = useDispatch();

  return (
    <div className={styles.paginationContainer}>
      <button
        disabled={!state.offset}
        onClick={() => {
          offset = 0;
          dispatch(toggleLoader(false));
          dispatch(getProductsInfo({ offset, limit: state.limit }));
          dispatch(changeOffset(offset));
        }}
      >
        В начало
      </button>
      <button
        disabled={!state.offset}
        onClick={() => {
          offset = offset - state.limit;
          dispatch(toggleLoader(false));
          dispatch(getProductsInfo({ offset, limit: state.limit }));
          dispatch(changeOffset(offset));
        }}
      >
        {"<<"}
      </button>
      <p className={styles.pageNumber}>{pageNumber}</p>
      <button
        disabled={state.limit * pageNumber > state.productsCount}
        onClick={() => {
          offset = offset + state.limit;
          dispatch(toggleLoader(false));
          dispatch(getProductsInfo({ offset, limit: state.limit }));
          dispatch(changeOffset(offset));
        }}
      >
        {">>"}
      </button>
      <button
        disabled={state.limit * pageNumber > state.productsCount}
        onClick={() => {
          offset = Math.floor(state.productsCount / state.limit) * state.limit;
          dispatch(toggleLoader(false));
          dispatch(getProductsInfo({ offset, limit: state.limit }));
          dispatch(changeOffset(offset));
        }}
      >
        В конец
      </button>
    </div>
  );
};

export default Pagination;
