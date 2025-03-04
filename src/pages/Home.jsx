import { useRef } from "react";
import SpotlightPreview from "../components/SpotlightPreview";
import Footer from "../components/Footer";

const Home = () => {
  const footerRef = useRef(null);

  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Spotlight Section */}
      <div className="relative">
        <SpotlightPreview />
      </div>

      {/* Features Section */}
      <div className="py-10 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose Our Parking System?</h2>

          {/* Arrow Button (Scroll to Footer) */}
          <div className="mb-8 flex justify-center">
            <button
              onClick={scrollToFooter}
              className="p-3 rounded-full bg-gradient-to-b from-black to-gray-400 text-white transition-transform duration-300 hover:scale-110"
            >
              <i className="fas fa-arrow-down text-lg"></i>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {/* Feature 1 */}
            <div className="bg-gray-800 shadow-lg p-8 rounded-lg h-full transform transition-transform duration-300 hover:scale-105">
              <i className="fas fa-parking text-5xl mb-4 text-blue-400"></i>
              <h3 className="text-xl font-semibold">Real-Time Slot Availability</h3>
              <p className="mt-2 text-gray-300">Check parking slot availability in real time before booking.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-800 shadow-lg p-8 rounded-lg h-full transform transition-transform duration-300 hover:scale-105">
              <i className="fas fa-shield-alt text-5xl mb-4 text-green-400"></i>
              <h3 className="text-xl font-semibold">Secure Booking</h3>
              <p className="mt-2 text-gray-300">Reserve your spot with a simple and secure booking process.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-800 shadow-lg p-8 rounded-lg h-full transform transition-transform duration-300 hover:scale-105">
              <i className="fas fa-qrcode text-5xl mb-4 text-red-400"></i>
              <h3 className="text-xl font-semibold">QR Code Check-in</h3>
              <p className="mt-2 text-gray-300">Scan your QR code for a seamless check-in and check-out process.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;