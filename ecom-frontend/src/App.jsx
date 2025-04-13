import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/SignUp'
import AdminDashboard from './pages/admin/AdminDashboard'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useEffect, useState } from 'react'
import { useAuth } from './context/AuthContext'
import { ToastContainer } from 'react-toastify'

// ✅ get the user

  // return (
  //   <>
  //     <Navbar />
  //     {/* {user && user.role !== 'admin' && <Navbar />} */}
  //     <Routes>
  //       <Route path="/" element={<Home />} />
  //       <Route path="/shop" element={<Shop />} />
  //       <Route path="/cart" element={<Cart />} />
  //       <Route path="/about" element={<About />} />
  //       <Route path="/contact" element={<Contact />} />

  //       <Route path="/login" element={<Login />} />
  //       <Route path="/signup" element={<Signup />} />



  //       <Route path="/admin/dashboard" element={<AdminDashboard />} />

  //     </Routes>
  //   </>
  // )
  export default function App() {
    const { user } = useAuth(); // ✅ get the user
  
    return (
      <>
        {/* Add ToastContainer at the root level */}
        <ToastContainer />
        {/* Show Navbar only if user is not admin, or not logged in yet */}
        {!user || user.role !== 'admin' ? <Navbar /> : null}
  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
  
          {/* ✅ Optional: Protect this route so only admin sees it */}
          {/* {user && user.role === 'admin' && (
            <Route path="/admin/dashboard" element={<AdminDashboard/>} />
          )} */}

    <Route path="/admin/dashboard" element={<AdminDashboard />} />


        </Routes>
      </>
    )
  }

