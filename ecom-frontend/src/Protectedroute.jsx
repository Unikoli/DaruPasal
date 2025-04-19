import { Navigate } from "react-router-dom";

export default function Protectedroute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // Assuming the role is stored in localStorage after login

  // If there is no token or the user is not an admin, redirect to login
  if (!token || role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
}

