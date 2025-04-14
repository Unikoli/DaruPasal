import React from "react";
import AdminSidebar from "../Components/AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-6 mt-16 md:mt-0">{children}</main>
    </div>
  );
};

export default AdminLayout;
