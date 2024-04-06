import "./App.css";
import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import OutletPage from "./outlets/OutletPage";
import ProductCreate from "./pages/product/ProductCreate";
import ProductDetail from "./pages/product/ProductDetail";
import { AuthContext } from "./config/AuthContext";
import ProductList from "./pages/product/ProductList";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<OutletPage />}>
            <Route index={true} element={<ProductList />} />
            <Route path={"add"} element={<ProductCreate />} />
            <Route path={"detail"} element={<ProductDetail />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthContext.Provider>
  );
}

export default App;
