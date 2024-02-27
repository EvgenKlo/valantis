import Table from "../UI/Table/Table";
import Loader from "../UI/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAllProductsID,
  getProductsInfo,
  toggleLoader,
} from "../store/slices/tableSlice";

const App = () => {
  const allId = useSelector((state) => state.table.allProductsID);

  const state = useSelector((state) => state.table);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleLoader());
    dispatch(getAllProductsID({ offset: state.offset, limit: state.limit }));
  }, []);

  useEffect(() => {
    if (allId.length) {
      dispatch(toggleLoader());
      dispatch(getProductsInfo(allId));
    }
  }, [allId]);

  return (
    <>
      <Table />
      <Loader />
    </>
  );
};

export default App;
