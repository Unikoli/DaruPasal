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
import EditProduct from "./pages/admin/pages/product/EditProduct";
import ShippingForm from "./pages/ShippinForm";
import Orders from "./pages/admin/pages/Orders";
import PaymentSuccess from "./pages/Paymentsuccess";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Protectedroute from "./Protectedroute";
import PaymentFailure from "./pages/Paymentfailure";
import UserOrder from "./pages/UserOrders";

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
          path="/payment/success"
          element={
            <>
              <Navbar />
              <PaymentSuccess />
            </>
          }
        />
        <Route
          path="/payment/error"
          element={
            <>
              <Navbar />
              <PaymentFailure />
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
          path="/shipping-form"
          element={
            <>
              <Navbar />
              <ShippingForm />
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
         <Route
          path="/user/orders"
          element={
            <>
              <Navbar />
              <UserOrder />
            </>
          }
        />

        {/* Admin Dashboard with Sidebar */}
        <Route
          path="/admin/dashboard"
          element={
            <Protectedroute>
               <Navbar />
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
            </Protectedroute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <Protectedroute>
              <AdminLayout>
              <Categories />
            </AdminLayout>
            </Protectedroute>
            
          }
        />
        <Route
          path="/admin/orders"
          element={
            <Protectedroute>
               <AdminLayout>
              <Orders />
            </AdminLayout>
            </Protectedroute>
           
          }
        />
        <Route
          path="/admin/products"
          element={
            <Protectedroute>
              <AdminLayout>
              <Products />
            </AdminLayout>
            </Protectedroute>
            
          }
        />
         <Route
          path="/admin/add-category"
          element={
            <Protectedroute>
               <AdminLayout>
              <AddCategory/>
            </AdminLayout>
            </Protectedroute>
           
          }
        />
         <Route
          path="/admin/add-product"
          element={
            <Protectedroute>
              <AdminLayout>
              <AddProduct/>
            </AdminLayout>
            </Protectedroute>
            
          }
        />
         <Route
          path="/admin/edit-product/:id"
          element={
            <Protectedroute>
              <AdminLayout>
              <EditProduct/>
            </AdminLayout>
            </Protectedroute>
            
          }
        />
         <Route
         path="/admin/edit-category/:id"
          element={
            <Protectedroute>
                <AdminLayout>
              <EditCategory/>
            </AdminLayout>
            </Protectedroute>
          
          }
        />
      </Routes>
    </>
  );
}
