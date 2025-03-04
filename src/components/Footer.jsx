import React from 'react';

const Footer = () => {
    return (
      <footer className="bg-gray-950 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-lg font-semibold">Smart Parking System</p>
          <p className="text-sm text-gray-400">Efficiently managing parking spaces with technology.</p>
          <div className="flex justify-center space-x-4 mt-3">
            <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
          </div>
          <p className="text-xs text-gray-500 mt-4">&copy; {new Date().getFullYear()} Smart Parking System. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;