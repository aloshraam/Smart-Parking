import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-black backdrop-blur-md bg-opacity-75" : "bg-transparent"}`}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        <div
          className="flex items-center text-white text-lg font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          <i className="fas fa-parking mr-2 text-2xl"></i>
          Smart Parking
        </div>
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 border border-white text-white rounded-md hover:bg-white hover:text-gray-900 transition"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="px-4 py-2 border border-white text-white rounded-md hover:bg-white hover:text-gray-900 transition"
            onClick={() => navigate("/contact")}
          >
            Contact
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;