import { Route, Routes } from "react-router-dom";
import AboutPage from "./pages/about/AboutPage";
import HomePage from "./pages/home/HomePage";
import ProductPage from "./pages/shop/ProductPage";
import Layout from "./components/layout/Layout";
import React from "react";
import ProductDetail from "./pages/home/ProductDetail";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/shop" element={<ProductPage />} />
        </Route>
        <Route path="/:slug" element={<ProductDetail />} />
      </Routes>
    </>
  );
};
export default App;
