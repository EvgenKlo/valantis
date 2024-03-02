import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getProductsCount,
  getProductsInfo,
} from "../../store/slices/tableSlice";

const useStartApp = () => {
  const state = useSelector((state) => state.table);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsCount());

    dispatch(getProductsInfo({ offset: state.offset, limit: state.limit }));
  }, []);
};

export default useStartApp;
