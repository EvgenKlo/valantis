import Table from "../UI/Table/Table";
import Loader from "../UI/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getProductsCount,
  getProductsInfo,
  toggleLoader,
} from "../store/slices/tableSlice";
import Pagination from "../UI/Pagination/Pagination";

const App = () => {
  const state = useSelector((state) => state.table);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsCount());
    dispatch(toggleLoader());
    dispatch(getProductsInfo({ offset: state.offset, limit: state.limit }));
  }, []);

  return (
    <>
      <Pagination />
      <Table />
      <Loader />
    </>
  );
};

export default App;
