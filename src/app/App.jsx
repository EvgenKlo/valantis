import Loader from "../shared/UI/Loader/Loader";
import ProductList from "../widgets/ProductsList/ProductList";
import useStartApp from "../shared/hooks/startApp";

const App = () => {
  useStartApp();

  return (
    <>
      <ProductList />
      <Loader />
    </>
  );
};

export default App;
