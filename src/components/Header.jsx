import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfileAPI } from "../services/allAPI";
import SERVER_URL from "../services/SERVERURL";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgPreview, setImgPreview] = useState("");
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    profilePic: "",
  });

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  // Load user details from session storage
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const storedUser = JSON.parse(sessionStorage.getItem("user")) || {};
      setUserDetails({
        username: storedUser.username || "",
        email: storedUser.email || "",
        profilePic: storedUser.profilePic
          ? storedUser.profilePic.startsWith("http")
            ? storedUser.profilePic
            : `${SERVER_URL}/uploads/${storedUser.profilePic}`
          : "",
      });
    }
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const openModal = () => {
    setIsModalOpen(true);
    setIsDropdownOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    const storedUser = JSON.parse(sessionStorage.getItem("user")) || {};
    setUserDetails({
      username: storedUser.username || "",
      email: storedUser.email || "",
      profilePic: storedUser.profilePic
        ? storedUser.profilePic.startsWith("http")
          ? storedUser.profilePic
          : `${SERVER_URL}/uploads/${storedUser.profilePic}`
        : "",
    });

    if (imgPreview.startsWith("blob:")) {
      URL.revokeObjectURL(imgPreview);
    }
    setImgPreview("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserDetails({ ...userDetails, profilePic: file });

      if (imgPreview.startsWith("blob:")) {
        URL.revokeObjectURL(imgPreview);
      }

      const objectUrl = URL.createObjectURL(file);
      setImgPreview(objectUrl);
    }
  };

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleUpdateProfile = async () => {
    const { username, profilePic } = userDetails;
    if (!username) {
      alert("Username is required!");
      return;
    }

    const reqBody = new FormData();
    reqBody.append("username", username);
    if (profilePic instanceof File) {
      reqBody.append("profilePic", profilePic);
    }

    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Unauthorized! Please log in again.");
      return;
    }

    try {
      const result = await updateProfileAPI(reqBody, {
        Authorization: `Bearer ${token}`,
      });

      if (result.status === 200) {
        const updatedUser = result.data;
        sessionStorage.setItem("user", JSON.stringify(updatedUser));

        // ✅ Fix: Set full URL for profile image
        setUserDetails((prev) => ({
          ...prev,
          profilePic: updatedUser.profilePic
            ? updatedUser.profilePic.startsWith("http")
              ? updatedUser.profilePic
              : `${SERVER_URL}/uploads/${updatedUser.profilePic}`
            : "",
        }));

        closeModal();
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black backdrop-blur-md bg-opacity-75" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        <div
          className="flex items-center text-white text-lg font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          <i className="fas fa-parking mr-2 text-2xl"></i>
          Smart Parking
        </div>

        <div className="flex space-x-4 items-center relative">
          <button
            className="px-4 py-2 border border-white text-white rounded-md hover:bg-white hover:text-gray-900 transition"
            onClick={() => navigate("/contact")}
          >
            Contact
          </button>

          {sessionStorage.getItem("token") ? (
            <div className="relative" ref={dropdownRef}>
              <img
                src={userDetails.profilePic || "https://via.placeholder.com/40"}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg overflow-hidden z-50">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    onClick={openModal}
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

            <div className="flex justify-center mb-4">
              <img
                src={
                  imgPreview ||
                  userDetails.profilePic ||
                  "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"
                }
                alt="Profile Preview"
                className="w-24 h-24 rounded-full border border-gray-300 object-cover cursor-pointer"
                onClick={handleImageClick}
              />
            </div>

            <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} />

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={userDetails.username}
              onChange={(e) =>
                setUserDetails({ ...userDetails, username: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
            />

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={userDetails.email}
              disabled
              className="w-full p-2 mb-2 border rounded"
            />

            <div className="flex justify-end space-x-2">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={closeModal}>
                Cancel
              </button>
              <button onClick={handleUpdateProfile} className="px-4 py-2 bg-blue-500 text-white rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;