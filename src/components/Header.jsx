import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const [userDetails, setUserDetails] = useState({
    username : "", email : "", password : "", profilePic : ""
  })

  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref to track dropdown
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);


  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If click is outside the dropdown, close it
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getUserDetails = () => {
    
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black backdrop-blur-md bg-opacity-75" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo / Home Button */}
        <div
          className="flex items-center text-white text-lg font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          <i className="fas fa-parking mr-2 text-2xl"></i>
          Smart Parking
        </div>

        

        {/* Navigation Buttons */}
        <div className="flex space-x-4 items-center relative">
          {/* Contact Button */}
          <button
            className="px-4 py-2 border border-white text-white rounded-md hover:bg-white hover:text-gray-900 transition"
            onClick={() => navigate("/contact")}
          >
            Contact
          </button>

          {sessionStorage.getItem("token") ? (
            // Profile Dropdown
            <div className="relative" ref={dropdownRef}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-HmAlYRaMiTx6PqSGcL9ifkAFxWHVPvhiHQ&s" // Replace with actual profile image
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg overflow-hidden z-50">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    onClick={() => navigate("/edit-profile")}
                  >
                    Edit Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    onClick={() => {
                      sessionStorage.removeItem("token");
                      navigate("/login");
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="px-4 py-2 border border-white text-white rounded-md hover:bg-white hover:text-gray-900 transition"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
          
        </div>
      </div>
    </header>
  );
};

export default Header;