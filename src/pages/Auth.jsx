import React, { useState } from "react";
import { motion } from "framer-motion";

const Auth = ({ insideRegister }) => {
  const [isClicked, setIsClicked] = useState(false);

    // state for registration data
    const [inputData, setInputData] = useState({
      username : '', email : '', password : '',
    })

    console.log(inputData);


  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };


  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url('https://cdn.pixabay.com/photo/2015/04/12/13/09/car-718781_1280.jpg')` }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-3/4 max-w-lg">
        <div className="backdrop-blur-md bg-white/10 shadow-xl rounded-lg p-6 text-white">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold flex items-center gap-2">
            <i className="fas fa-parking mr-2 text-2xl"></i>Smart Parking
            </h1>
            <h5 className="mt-3 text-lg">
              Sign {insideRegister ? "Up" : "In"} to your account
            </h5>

            <form className="mt-4 w-full">
              {insideRegister && (
                <div className="mb-3 w-full">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                    Username
                  </label>
                  <input 
                    onChange={e=>setInputData({...inputData, username : e.target.value})}
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    className="mt-1 block w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 placeholder-gray-400"
                  />
                </div>
              )}
              <div className="mb-3 w-full">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <input
                  onChange={e=>setInputData({...inputData, email : e.target.value})}
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="mt-1 block w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 placeholder-gray-400"
                />
              </div>
              <div className="mb-3 w-full">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  onChange={e=>setInputData({...inputData, password : e.target.value})}
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="mt-1 block w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 placeholder-gray-400"
                />
              </div>
              {insideRegister ? (
                <div className="mt-3 w-full">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition"
                    onClick={handleClick}
                  >
                    {isClicked ? "Registering..." : "Register"}
                  </motion.button>
                  <p className="mt-2 text-sm text-gray-300">
                    Already a user? Please click here to{" "}
                    <a href="/login" className="text-yellow-400 hover:underline">
                      Login
                    </a>
                  </p>
                </div>
              ) : (
                <div className="mt-3 w-full">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition"
                    onClick={handleClick}
                  >
                    {isClicked ? "Logging in..." : "Login"}
                  </motion.button>
                  <p className="mt-2 text-sm text-gray-300">
                    New User? Please click here to{" "}
                    <a href="/register" className="text-yellow-400 hover:underline">
                      Register
                    </a>
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;