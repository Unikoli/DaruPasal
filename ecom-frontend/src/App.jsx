import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import ProductDetails from "./pages/ProductDetails";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";

import AdminLayout from "./pages/admin/layouts/AdminLayout";
import Categories from "./pages/admin/pages/Categories";
import Products from "./pages/admin/pages/Products";
import AddCategory from "./pages/admin/pages/category/AddCategory";
import EditCategory from "./pages/admin/pages/category/EditCategory";
import AddProduct from "./pages/admin/pages/product/AddProduct";

export default function App() {
  return (
    <>
      <ToastContainer />

      {/* Main App Routes */}
      <Routes>
        {/* Public Site with Navbar */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/shop"
          element={
            <>
              <Navbar />
              <Shop />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Navbar />
              <Cart />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Navbar />
              <Signup />
            </>
          }
        />
        <Route
          path="/product/:id"
          element={
            <>
              <Navbar />
              <ProductDetails />
            </>
          }
        />

        {/* Admin Dashboard with Sidebar */}
        <Route
          path="/admin/categories"
          element={
            <AdminLayout>
              <Categories />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminLayout>
              <Products />
            </AdminLayout>
          }
        />
         <Route
          path="/admin/add-category"
          element={
            <AdminLayout>
              <AddCategory/>
            </AdminLayout>
          }
        />
         <Route
          path="/admin/add-product"
          element={
            <AdminLayout>
              <AddProduct/>
            </AdminLayout>
          }
        />
         <Route
         path="/admin/edit-category/:id"
          element={
            <AdminLayout>
              <EditCategory/>
            </AdminLayout>
          }
        />
      </Routes>
    </>
  );
}
