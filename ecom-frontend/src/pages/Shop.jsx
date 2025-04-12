import ProductList from "../components/ProductList";
import Sidebar from "../components/SideBar";

export default function Shop() {
  return (
    <div className="bg-white py-8">
      <div className="flex max-w-screen-xl mx-auto px-4">
        {/* Sidebar - pushed to left naturally */}
        <aside className="w-90 bg-gray-100 p-[1px] shadow-md rounded-md">
          <Sidebar />
        </aside>

        {/* Main Content with spacing */}
        <main className="flex-1 ml-8">
          <h1 className="text-4xl font-bold text-center">Shop All Products</h1>
          <p className="mt-4 text-lg text-gray-600 text-center">
            Filter, search, and browse our full range.
          </p>

          {/* Product Cards */}
          <ProductList />
        </main>
      </div>
    </div>
  );
}
