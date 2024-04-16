import "./App.css";
import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import OutletPage from "./outlets/OutletPage";
import ProductCreate from "./pages/product/ProductCreate";
import ProductDetail from "./pages/product/ProductDetail";
import ProductList from "./pages/product/ProductList";
import "bootstrap/dist/css/bootstrap.min.css";
import { ContextApplication } from "./libs/config/contexts";
import useLoading from "./libs/hooks/useLoading";
import CustomerList from "./pages/customer/CustomerList";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const loading = useLoading();

  return (
    <ContextApplication.Provider
      value={{ isAuthenticated, setIsAuthenticated, loading }}
    >
      <HashRouter>
        <Routes>
          <Route path="/" element={<OutletPage />}>
            <Route index={true} element={<ProductList />} />
            <Route path="/customer" element={<CustomerList />} />
            <Route path="/product/add" element={<ProductCreate />} />
            <Route path="/product/detail" element={<ProductDetail />} />
          </Route>
        </Routes>
      </HashRouter>
    </ContextApplication.Provider>
  );
}

export default App;
