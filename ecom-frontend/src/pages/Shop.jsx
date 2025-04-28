// // // import { useEffect, useState } from "react";
// // // import Footer from "../components/Footer";
// // // import ProductList from "../components/ProductList";
// // // import Sidebar from "../components/SideBar";

// // // export default function Shop() {
// // //   const [loading, setLoading] = useState(true);

// // //   const fetchedProucts=async ()=>{
// // //     const res=await fetch('http://localhost:8000/api/produts')
// // //     const result=res.json
// // //   }

// // //   useEffect(() => {
// // //     // Simulate loading delay for UX testing
// // //     const timer = setTimeout(() => {
// // //       setLoading(false);
// // //     }, 1000); // 1 second delay for demonstration
// // //     return () => clearTimeout(timer);
// // //   }, []);

// // //   return (
// // //     <>
// // //       <div className="bg-white py-8">
// // //         <div className="flex max-w-screen-xl mx-auto px-4">
// // //           {/* Sidebar */}
// // //           <aside className="w-90 bg-gray-100 p-[1px] shadow-md rounded-md">
// // //             <Sidebar />
// // //           </aside>

// // //           {/* Main Content */}
// // //           <main className="flex-1 ml-8">
// // //             {loading ? (
// // //               <h1 className="text-center text-xl font-semibold">Loading...</h1>
// // //             ) : (
// // //               <>
// // //                 <h1 className="text-4xl font-bold text-center">Shop All Products</h1>
// // //                 <p className="mt-4 text-lg text-gray-600 text-center">
// // //                   Filter, search, and browse our full range.
// // //                 </p>
// // //                 <ProductList />
// // //               </>
// // //             )}
// // //           </main>
// // //         </div>
// // //       </div>
// // //       <Footer />
// // //     </>
// // //   );
// // // }
// // import { useEffect, useState } from "react";
// // import Footer from "../components/Footer";
// // import ProductList from "../components/ProductList";
// // import Sidebar from "../components/SideBar";

// // export default function Shop() {
// //   const [loading, setLoading] = useState(true);
// //   const [allProducts, setAllProducts] = useState([]);
// //   const [filteredProducts, setFilteredProducts] = useState([]);

// //   const [filters, setFilters] = useState({
// //     category: "",
// //     country: "",
// //     minPrice: 0,
// //     maxPrice: 10000,
// //   });

// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       try {
// //         const response = await fetch("http://localhost:8000/api/products");
// //         const data = await response.json();
// //         setAllProducts(data);
// //         setFilteredProducts(data);
// //       } catch (error) {
// //         console.error("Error fetching products:", error);
// //       }
// //     };

// //     fetchProducts();

// //     const timer = setTimeout(() => setLoading(false), 1000);
// //     return () => clearTimeout(timer);
// //   }, []);

// //   useEffect(() => {
// //     let filtered = [...allProducts];

// //     if (filters.category) {
// //       filtered = filtered.filter(
// //         (p) => p.category_id === parseInt(filters.category)
// //       );
// //     }

// //     if (filters.country) {
// //       filtered = filtered.filter((p) =>
// //         p.country?.toLowerCase().includes(filters.country.toLowerCase())
// //       );
// //     }

// //     filtered = filtered.filter(
// //       (p) =>
// //         parseFloat(p.price) >= filters.minPrice &&
// //         parseFloat(p.price) <= filters.maxPrice
// //     );

// //     setFilteredProducts(filtered);
// //   }, [filters, allProducts]);

// //   const handleFilterChange = (e) => {
// //     const { name, value } = e.target;
// //     setFilters((prev) => ({ ...prev, [name]: value }));
// //   };

// //   return (
// //     <>
// //       <div className="bg-white py-8">
// //         <div className="flex max-w-screen-xl mx-auto px-4">
// //           {/* Sidebar with Filters */}
// //           <aside className="w-80 bg-gray-100 p-4 shadow-md rounded-md">
// //             <Sidebar />

// //             <div className="mt-4 space-y-4">
// //               <h2 className="text-xl font-semibold mb-2">Filter Products</h2>

// //               {/* Category */}
// //               <div>
// //                 <label className="block text-sm mb-1">Category ID:</label>
// //                 <input
// //                   type="number"
// //                   name="category"
// //                   value={filters.category}
// //                   onChange={handleFilterChange}
// //                   className="w-full border px-2 py-1 rounded"
// //                   placeholder="e.g. 2"
// //                 />
// //               </div>

// //               {/* Country */}
// //               <div>
// //                 <label className="block text-sm mb-1">Country:</label>
// //                 <input
// //                   type="text"
// //                   name="country"
// //                   value={filters.country}
// //                   onChange={handleFilterChange}
// //                   className="w-full border px-2 py-1 rounded"
// //                   placeholder="e.g. France"
// //                 />
// //               </div>

// //               {/* Price Range */}
// //               <div>
// //                 <label className="block text-sm mb-1">Price Range:</label>
// //                 <div className="flex space-x-2">
// //                   <input
// //                     type="number"
// //                     name="minPrice"
// //                     value={filters.minPrice}
// //                     onChange={handleFilterChange}
// //                     className="w-1/2 border px-2 py-1 rounded"
// //                     placeholder="Min"
// //                   />
// //                   <input
// //                     type="number"
// //                     name="maxPrice"
// //                     value={filters.maxPrice}
// //                     onChange={handleFilterChange}
// //                     className="w-1/2 border px-2 py-1 rounded"
// //                     placeholder="Max"
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </aside>

// //           {/* Main Content */}
// //           <main className="flex-1 ml-8">
// //             {loading ? (
// //               <h1 className="text-center text-xl font-semibold">Loading...</h1>
// //             ) : (
// //               <>
// //                 <h1 className="text-4xl font-bold text-center">Shop All Products</h1>
// //                 <p className="mt-4 text-lg text-gray-600 text-center">
// //                   Filter, search, and browse our full range.
// //                 </p>
// //                 <ProductList products={filteredProducts} />
// //               </>
// //             )}
// //           </main>
// //         </div>
// //       </div>
// //       <Footer />
// //     </>
// //   );
// // }
// import { useEffect, useState } from "react";
// import Footer from "../components/Footer";
// import ProductList from "../components/ProductList";
// import Sidebar from "../components/SideBar";
// import { useLocation, useNavigate } from "react-router-dom"; // Updated import here

// export default function Shop() {
//   const [loading, setLoading] = useState(true);
//   const [allProducts, setAllProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [filters, setFilters] = useState({
//     category: "",
//     country: "",
//     minPrice: 0,
//     maxPrice: 10000,
//     alcoholContent: "",
//   });

//   const location = useLocation();
//   const navigate = useNavigate(); // Updated to useNavigate

//   // Fetch Products and Categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       const response = await fetch("http://localhost:8000/api/categories");
//       const data = await response.json();
//       setCategories(data);
//     };

//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/api/products");
//         const data = await response.json();
//         setAllProducts(data);
//         setFilteredProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchCategories();
//     fetchProducts();

//     const timer = setTimeout(() => setLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   // Apply filters based on state
//   useEffect(() => {
//     let filtered = [...allProducts];

//     if (filters.category) {
//       filtered = filtered.filter((p) => p.category_id === parseInt(filters.category));
//     }

//     if (filters.country) {
//       filtered = filtered.filter((p) =>
//         p.country?.toLowerCase().includes(filters.country.toLowerCase())
//       );
//     }

//     if (filters.alcoholContent) {
//       filtered = filtered.filter((p) =>
//         p.alcohol_content && parseFloat(p.alcohol_content) >= parseFloat(filters.alcoholContent)
//       );
//     }

//     filtered = filtered.filter(
//       (p) =>
//         parseFloat(p.price) >= filters.minPrice &&
//         parseFloat(p.price) <= filters.maxPrice
//     );

//     setFilteredProducts(filtered);
//   }, [filters, allProducts]);

//   // Update filter state
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));

//     // Update URL parameters
//     const params = new URLSearchParams(location.search);
//     params.set(name, value);
//     navigate({ search: params.toString() }); // Updated to use navigate
//   };

//   return (
//     <>
//       <div className="bg-white py-8">
//         <div className="flex max-w-screen-xl mx-auto px-4">
//           {/* Sidebar with Filters */}
//           <aside className="w-80 bg-gray-100 p-4 shadow-md rounded-md">
//             <Sidebar />

//             <div className="mt-4 space-y-4">
//               <h2 className="text-xl font-semibold mb-2">Filter Products</h2>

//               {/* Category Dropdown */}
//               <div>
//                 <label className="block text-sm mb-1">Category:</label>
//                 <select
//                   name="category"
//                   value={filters.category}
//                   onChange={handleFilterChange}
//                   className="w-full border px-2 py-1 rounded"
//                 >
//                   <option value="">Select a category</option>
//                   {categories.map((category) => (
//                     <option key={category.id} value={category.id}>
//                       {category.category_name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Country */}
//               <div>
//                 <label className="block text-sm mb-1">Country:</label>
//                 <input
//                   type="text"
//                   name="country"
//                   value={filters.country}
//                   onChange={handleFilterChange}
//                   className="w-full border px-2 py-1 rounded"
//                   placeholder="e.g. France"
//                 />
//               </div>

//               {/* Alcohol Content */}
//               <div>
//                 <label className="block text-sm mb-1">Alcohol Content:</label>
//                 <input
//                   type="number"
//                   name="alcoholContent"
//                   value={filters.alcoholContent}
//                   onChange={handleFilterChange}
//                   className="w-full border px-2 py-1 rounded"
//                   placeholder="e.g. 5"
//                 />
//               </div>

//               {/* Price Range */}
//               <div>
//                 <label className="block text-sm mb-1">Price Range:</label>
//                 <div className="flex space-x-2">
//                   <input
//                     type="number"
//                     name="minPrice"
//                     value={filters.minPrice}
//                     onChange={handleFilterChange}
//                     className="w-1/2 border px-2 py-1 rounded"
//                     placeholder="Min"
//                   />
//                   <input
//                     type="number"
//                     name="maxPrice"
//                     value={filters.maxPrice}
//                     onChange={handleFilterChange}
//                     className="w-1/2 border px-2 py-1 rounded"
//                     placeholder="Max"
//                   />
//                 </div>
//               </div>
//             </div>
//           </aside>

//           {/* Main Content */}
//           <main className="flex-1 ml-8">
//             {loading ? (
//               <h1 className="text-center text-xl font-semibold">Loading...</h1>
//             ) : (
//               <>
//                 <h1 className="text-4xl font-bold text-center">Shop All Products</h1>
//                 <p className="mt-4 text-lg text-gray-600 text-center">
//                   Filter, search, and browse our full range.
//                 </p>
//                 <ProductList products={filteredProducts} />
//               </>
//             )}
//           </main>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";
import Sidebar from "../components/SideBar";
import { useLocation, useNavigate } from "react-router-dom"; // Updated import here

export default function Shop() {
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]); // New state for countries
  const [filters, setFilters] = useState({
    category: "",
    country: "",
    minPrice: 0,
    maxPrice: 10000,
    alcoholContent: "",
  });

  const location = useLocation();
  const navigate = useNavigate(); // Updated to useNavigate

  // Fetch Products, Categories, and Countries
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:8000/api/categories");
      const data = await response.json();
      setCategories(data);
    };

    const fetchCountries = async () => {
      const response = await fetch("http://localhost:8000/api/countries");
      const data = await response.json();
      setCountries(data); // Assuming the countries API returns a list of countries
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/products");
        const data = await response.json();
        setAllProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategories();
    fetchCountries(); // Fetch countries
    fetchProducts();

    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Apply filters based on state
  useEffect(() => {
    let filtered = [...allProducts];

    if (filters.category) {
      filtered = filtered.filter((p) => p.category_id === parseInt(filters.category));
    }

    if (filters.country) {
      filtered = filtered.filter((p) =>
        p.country?.toLowerCase().includes(filters.country.toLowerCase())
      );
    }

    if (filters.alcoholContent) {
      filtered = filtered.filter((p) =>
        p.alcohol_content && parseFloat(p.alcohol_content) >= parseFloat(filters.alcoholContent)
      );
    }

    filtered = filtered.filter(
      (p) =>
        parseFloat(p.price) >= filters.minPrice &&
        parseFloat(p.price) <= filters.maxPrice
    );

    setFilteredProducts(filtered);
  }, [filters, allProducts]);

  // Update filter state
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));

    // Update URL parameters
    const params = new URLSearchParams(location.search);
    params.set(name, value);
    navigate({ search: params.toString() }); // Updated to use navigate
  };

  return (
    <>
      <div className="bg-white py-8">
        <div className="flex max-w-screen-xl mx-auto px-4">
          {/* Sidebar with Filters */}
          <aside className="w-80 bg-gray-100 p-4 shadow-md rounded-md">
            <Sidebar />

            <div className="mt-4 space-y-4">
              <h2 className="text-xl font-semibold mb-2">Filter Products</h2>

              {/* Category Dropdown */}
              <div>
                <label className="block text-sm mb-1">Category:</label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full border px-2 py-1 rounded"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.category_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Country Dropdown */}
              <div>
                <label className="block text-sm mb-1">Country:</label>
                <select
                  name="country"
                  value={filters.country}
                  onChange={handleFilterChange}
                  className="w-full border px-2 py-1 rounded"
                >
                  <option value="">Select a country</option>
                  {/* Create a Set to filter out duplicate countries */}
                  {Array.from(new Set(allProducts.map((product) => product.country)))
                    .sort() // Optionally, sort the countries alphabetically
                    .map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                </select>
              </div>


              {/* Alcohol Content */}
              {/* <div>
                <label className="block text-sm mb-1">Alcohol Content:</label>
                <input
                  type="number"
                  name="alcoholContent"
                  value={filters.alcoholContent}
                  onChange={handleFilterChange}
                  className="w-full border px-2 py-1 rounded"
                  placeholder="e.g. 5"
                />
              </div> */}

              {/* Price Range */}
              <div>
                <label className="block text-sm mb-1">Price Range:</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    className="w-1/2 border px-2 py-1 rounded"
                    placeholder="Min"
                  />
                  <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    className="w-1/2 border px-2 py-1 rounded"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 ml-8">
            {loading ? (
              <h1 className="text-center text-xl font-semibold">Loading...</h1>
            ) : (
              <>
                <h1 className="text-4xl font-bold text-center">Shop All Products</h1>
                <p className="mt-4 text-lg text-gray-600 text-center">
                  Filter, search, and browse our full range.
                </p>
                <ProductList products={filteredProducts} />
              </>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
