import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";
import Sidebar from "../components/SideBar";

export default function Shop() {
  const [loading, setLoading] = useState(true);

  const fetchedProucts=async ()=>{
    const res=await fetch('http://localhost:8000/api/produts')
    const result=res.json
  }

  useEffect(() => {
    // Simulate loading delay for UX testing
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second delay for demonstration
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="bg-white py-8">
        <div className="flex max-w-screen-xl mx-auto px-4">
          {/* Sidebar */}
          <aside className="w-90 bg-gray-100 p-[1px] shadow-md rounded-md">
            <Sidebar />
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
                <ProductList />
              </>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
