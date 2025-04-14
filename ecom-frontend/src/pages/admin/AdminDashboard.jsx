
// import React, { useEffect, useState } from 'react';
// import { Plus, Edit, Trash2 } from 'lucide-react';


// export default function AdminDashboard() {
//   const [categories,setCategories]=useState([]);
//    useEffect(() => {
//       const fetchCategories = async () => {
//         try {
//           const response = await fetch("http://localhost:8000/api/categories");
//           const data = await response.json();
//           console.log(data);
//           setCategories(data);
//         } catch (error) {
//           console.error("Error fetching categories:", error);
//         }
//       };
  
//       fetchCategories();
//     }, []);
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-red-700 text-white p-5">
//         <h1 className="text-2xl font-bold mb-10">🍷 Daru Pasal Admin</h1>
//         <nav className="space-y-4">
//           <button className="block w-full text-left hover:text-yellow-300">Dashboard</button>
//           <button className="block w-full text-left hover:text-yellow-300">Products</button>
//           <button className="block w-full text-left hover:text-yellow-300">Categories</button>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8">
//         <h2 className="text-3xl font-semibold mb-6">Dashboard Overview</h2>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
//           <div className="bg-white shadow-md rounded-lg p-6">
//             <h3 className="text-lg font-medium">Products</h3>
//             <p className="text-2xl font-bold mt-2">34</p>
//           </div>
//           <div className="bg-white shadow-md rounded-lg p-6">
//             <h3 className="text-lg font-medium">Categories</h3>
//             <p className="text-2xl font-bold mt-2">5</p>
//           </div>
//         </div>

//         {/* Categories Management */}
//         <div className="mb-12">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-2xl font-semibold">Manage Categories</h3>
//             <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
//               <Plus className="mr-2" size={18} />
//               Add Category
//             </button>
//           </div>
//           <div className="bg-white shadow-md rounded-lg overflow-x-auto">
//             <table className="w-full text-left">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="p-4">Name</th>
//                   <th className="p-4 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {categories.map((category) => (
//                   <tr key={category.id} className="border-t">
//                     <td className="p-4">{category.category_name}</td>
//                     <td className="p-4 text-right space-x-2">
//                       <button className="inline-flex items-center px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">
//                         <Edit size={16} className="mr-1" />
//                         Edit
//                       </button>
//                       <button className="inline-flex items-center px-3 py-1 text-sm border border-red-500 text-red-500 rounded hover:bg-red-100">
//                         <Trash2 size={16} className="mr-1" />
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

       
//       </main>
//     </div>
//   );
// }
