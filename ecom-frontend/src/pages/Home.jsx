
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import SummerProductList from "../components/SummerProductList";
import WinterProductList from "../components/WinterProductList";


export default function Home() {
  const navigate=useNavigate();
    return (
        <>
        <div className="relative w-full h-screen">
        {/* Background Image */}
        <img
          src="/homepage_image.png"
          alt="Daru Pasal Hero"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
  
        {/* Overlay Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Welcome to <span className="text-orange-400">Daru Pasal</span>
          </h1>
          <p className="text-lg md:text-xl max-w-xl mb-8 drop-shadow-md">
            Your one-stop online destination for the finest liquors and spirits.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300"
          onClick={()=>navigate('/shop')}
          >
            Shop Now
          </button>
        </div>
  
        {/* Optional: Overlay Layer */}
        <div className="absolute inset-0 bg-black/50" />
      </div>
     <SummerProductList/>
      <WinterProductList/>
      <Footer/>
        </>
      
    )
  }
  