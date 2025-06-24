import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="text-center max-w-2xl mx-auto relative z-10">
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-orange-500 mb-6 tracking-tight leading-none custom-font2">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mb-8 rounded-full"></div>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide custom-font2">
          Page Not Found
        </h2>

        <ShimmerButton
          className="text-black font-semibold ml-24 px-10 py-2 text-lg"
          onClick={() => navigate("/")}
        >
          Back to Home
        </ShimmerButton>
      </div>
    </div>
  );
};

export default NotFound;
