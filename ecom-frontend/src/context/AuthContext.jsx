// import { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Fetch CSRF and then user
//   const fetchUser = async () => {
//     try {
//       await fetch("http://localhost:8000/sanctum/csrf-cookie", {
//         credentials: "include",
//       });

//       const res = await fetch("http://localhost:8000/api/user", {
//         credentials: "include",
//       });

//       if (res.ok) {
//         const userData = await res.json();
//         setUser(userData);
//       } else {
//         setUser(null);
//       }
//     } catch (error) {
//       console.error("Fetch user error:", error);
//     }
//   };

//   // Login
//   const login = async (email, password) => {
//     await fetch("http://localhost:8000/sanctum/csrf-cookie", {
//       credentials: "include",
//     });

//     const res = await fetch("http://localhost:8000/api/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify({ email, password }),
//     });

//     if (res.ok) {
//       await fetchUser(); // ✅ update user info after login
//       return true;
//     } else {
//       return false;
//     }
//   };

//   // Logout
//   const logout = async () => {
//     await fetch("http://localhost:8000/api/logout", {
//       method: "POST",
//       credentials: "include",
//     });
//     setUser(null);
//   };

//   // Auto-fetch user on load
//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
