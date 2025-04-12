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

export default function App() {
  // const [user, setUser] = useState(null); // Replace with real user authentication logic

  // useEffect(() => {
  //   // Check if the user is logged in and retrieve their role
  //   const loggedInUser = JSON.parse(localStorage.getItem('user')); // Example: user data stored in localStorage
  //   if (loggedInUser) {
  //     setUser(loggedInUser);
  //   }
  // }, []);
  return (
    <>
      <Navbar />
      {/* {user && user.role !== 'admin' && <Navbar />} */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />



        <Route path="/admin/dashboard" element={<AdminDashboard />} />

      </Routes>
    </>
  )
}
