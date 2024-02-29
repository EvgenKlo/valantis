import { useDispatch, useSelector } from "react-redux";
import {
  changeOffset,
  getFilterProductsPagination,
  getProductsInfo,
  toggleLoader,
} from "../../store/slices/tableSlice";
import styles from "./pagination.module.scss";

const Pagination = () => {
  const state = useSelector((state) => state.table);

  let offset = state.offset;

  const pageNumber = offset ? offset / state.limit + 1 : 1;

  const dispatch = useDispatch();

  const handlePressPaginationButton = () => {
    dispatch(toggleLoader(false));
    if (state.filterProductsCount === null) {
      dispatch(getProductsInfo({ offset, limit: state.limit }));
      dispatch(changeOffset(offset));
    } else {
      dispatch(getFilterProductsPagination({ offset, limit: state.limit }));
      dispatch(changeOffset(offset));
    }
  };

  return (
    <div className={styles.paginationContainer}>
      <button
        disabled={!state.offset}
        onClick={() => {
          offset = 0;
          handlePressPaginationButton();
        }}
      >
        В начало
      </button>
      <button
        disabled={!state.offset}
        onClick={() => {
          offset = offset - state.limit;
          handlePressPaginationButton();
        }}
      >
        {"<<"}
      </button>
      <p className={styles.pageNumber}>{pageNumber}</p>
      <button
        disabled={
          state.limit * pageNumber >
          (state.filterProductsCount === null
            ? state.productsCount
            : state.filterProductsCount.length)
        }
        onClick={() => {
          offset = offset + state.limit;
          handlePressPaginationButton();
        }}
      >
        {">>"}
      </button>
      <button
        disabled={
          state.limit * pageNumber >
          (state.filterProductsCount === null
            ? state.productsCount
            : state.filterProductsCount.length)
        }
        onClick={() => {
          offset =
            Math.floor(
              state.filterProductsCount === null
                ? state.productsCount / state.limit
                : state.filterProductsCount.length / state.limit
            ) * state.limit;
          handlePressPaginationButton();
        }}
      >
        В конец
      </button>
    </div>
  );
};

export default Pagination;
