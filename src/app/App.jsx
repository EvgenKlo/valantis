import Loader from "../shared/UI/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getProductsCount,
  getProductsInfo,
  toggleLoader,
} from "../store/slices/tableSlice";
import ProductList from "../widgets/ProductsList/ProductList";

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
      <ProductList />
      <Loader />
    </>
  );
};

export default App;
