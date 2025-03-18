import React, { useState } from "react";
import { motion } from "framer-motion";
import { loginAPI, registerAPI } from "../services/allAPI";
import { useNavigate } from "react-router-dom";

const Auth = ({ insideRegister }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate();

  // State for registration data (Controlled form)
  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Register logic
  const handleRegister = async (e) => {
    e.preventDefault();
    handleClick();
    if (inputData.username && inputData.email && inputData.password) {
      try {
        const result = await registerAPI(inputData);
        if (result.status === 200) {
          alert("User registered successfully!");
          navigate("/login");
          setInputData({ username: "", email: "", password: "" }); // Reset input
        } else if (result.response.status === 406) {
          alert(result.response.data);
          setInputData({ username: "", email: "", password: "" }); // Reset input
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  //handle Login logic
  const handleLogin = async (e) => {
    e.preventDefault()
    handleClick()
    if(inputData.email && inputData.password){
      try {
        const result = await loginAPI(inputData)
        if(result.status === 200){
          setLoggedIn(true)
          // authoraizaiton
          sessionStorage.setItem("user",JSON.stringify(result.data.user))
          sessionStorage.setItem("token",result.data.token)
          
          setTimeout(() => {
            alert("Login Successful!!!")
            navigate('/')
            console.log(result.data);

            setInputData({ username: "", email: "", password: "" }); // Reset input
          }, 2000);
        }else{
          if(result.response.status === 404){
            alert(result.response.data)
            setInputData({ username: "", email: "", password: "" }); // Reset input
            setLoggedIn(false)
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  // Handle input change
  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  // Button click animation
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
                    name="username"
                    value={inputData.username}
                    onChange={handleChange}
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
                  name="email"
                  value={inputData.email}
                  onChange={handleChange}
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
                  name="password"
                  value={inputData.password}
                  onChange={handleChange}
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="mt-1 block w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 placeholder-gray-400"
                />
              </div>

              {/* Conditional Rendering for Login/Register */}
              {insideRegister ? (
                <div className="mt-3 w-full">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition"
                    onClick={handleRegister}
                  >
                    {isClicked ? "Registering..." : "Register"}
                  </motion.button>
                  <p className="mt-2 text-sm text-gray-300">
                    Already a user?{" "}
                    <a href="/login" className="text-yellow-400 hover:underline">
                      Login here
                    </a>
                  </p>
                </div>
              ) : (
                <div className="mt-3 w-full">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition flex items-center justify-center"
                    onClick={handleLogin}
                  >
                    {isClicked ? "Logging in..." : "Login"}

                    {loggedIn && (
                      <svg
                        className="animate-spin h-5 w-5 ml-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 0116 0h-2a6 6 0 00-12 0H4z"
                        ></path>
                      </svg>
                    )}
                  </motion.button>
                  <p className="mt-2 text-sm text-gray-300">
                    New User?{" "}
                    <a href="/register" className="text-yellow-400 hover:underline">
                      Register here
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