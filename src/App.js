import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  createSearchParams,
} from "react-router-dom";

import { NavBar } from "./components/navbar";
import { Products } from "./pages/products";
import { Product } from "./pages/product";
import { Cart } from "./pages/cart";
import { NotFound } from "./pages/not-found";
import { useCart } from "./context/cart";
import { Payment } from "./pages/payment";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";

function App() {
  const navigate = useNavigate();
  const { cartItemCount } = useCart();

  const onSearch = (searchQuery) => {
    navigate(`/?${createSearchParams({ q: searchQuery })}`);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
        <Route
          element={
            <>
              <NavBar onSearch={onSearch} cartItemCount={cartItemCount()} />
            </>
          }
        >
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
