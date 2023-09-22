import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import BillPage from "./pages/BillPage";
import CheckoutLayout from "./components/CheckoutLayout";
// Admin
import AdminPage from "./pages/AdminPage";
import Dashboard from "./pages/admin/Dashboard";
import ProductList from "./pages/admin/ProductList";
import ProductDetail from "./pages/admin/ProductDetail";
import OrderList from "./pages/admin/OrderList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutLayout />}>
          <Route path="step-1" element={<CheckoutPage />} />
          <Route path="step-2" element={<BillPage />} />
        </Route>
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products">
            <Route index element={<ProductList />} />
            <Route path="edit/:id" element={<ProductDetail />} />
          </Route>
          <Route path="orders" element={<OrderList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
