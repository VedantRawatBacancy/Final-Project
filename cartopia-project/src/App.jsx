import { HomePage } from "./component/Pages/HomePage";
import { Route, Routes } from "react-router-dom";
import { Login } from "./component/auth/Login";
import { Register } from "./component/auth/Register";
import { Cart } from "./component/cart/Cart";
import { Layout } from "./layout/Layout";
import { Products } from "./component/products/Products";
import { ProductDetail } from "./component/products/ProductDetail";
import { Checkout } from "./component/checkout/Checkout";
import { ErrorPage } from "./component/Pages/ErrorPage";
import { UseAuth } from "./context/AuthContext";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCart } from "./store/cartSlice";
import { Order } from "./component/order/Order";
import { getCartCount } from "./api/apiHandler";

function App() {
  const { token } = UseAuth();
  const dispatch = useDispatch();

  let cartCount = 0;

  useEffect(() => {
    getCartCount().then((res) => {
      cartCount = res.data.count;
      console.log(cartCount);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCart());
    };
    fetchData();
  }, [cartCount]);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/product" element={<Products />} />
          <Route path="/" element={<HomePage />} />
          {token ? (
            <>
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order" element={<Order />} />
            </>
          ) : (
            <>
              <Route path="/signIn" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
