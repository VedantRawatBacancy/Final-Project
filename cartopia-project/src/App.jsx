import "./App.css";
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
import { getCart } from "./api/apiHandler";
import { useDispatch } from "react-redux";
import { fetchCart } from "./store/cartSlice";
import { Order } from "./component/order/Order";

function App() {
  const { token } = UseAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCart());
      const orderItem = await dispatch(fetchOrder());
      console.log("Second action completed:", orderItem);
    };

    fetchData();
  }, []);

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
