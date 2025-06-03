import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import SearchBar from "./SearchBar";
import Register from "../RegistrationForm/Register";
import Login from "../LoginForm/Login";

const Navbar = () => {
  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // Implement search logic here
  };

  return (
    <nav className="bg-[#232F3E] px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-white text-lg font-semibold">Amazon Clone</h1>

        <div className="flex-1 mx-4">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="flex items-center gap-4">
          <FiShoppingCart size={24} color="white" />
          <Register />
          <Login />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
