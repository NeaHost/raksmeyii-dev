import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import CartSide from "../cart/CartSide";
const Layout = () => {
  return (
    <main className="w-[1200px]  max-w-full mx-auto">
      <Navbar></Navbar>
      <div className="px-3">
        <Outlet></Outlet>
      </div>
    </main>
  );
};

export default Layout;
