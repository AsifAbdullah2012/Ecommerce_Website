import React from "react";
import { FiSearch, FiShoppingCart, FiMenu } from "react-icons/fi";
import { FaFlag } from "react-icons/fa";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

const Navbar = () => {
  const user = useCurrentUser();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const hideTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 300); // <-- Adjust delay here (ms)
  };
  return (
    <header className="bg-[#131921] text-white text-sm font-medium">
      {/* Top Row */}
      <div className="flex items-center justify-between px-4 py-2">
        {/* Left: Logo and Location */}
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-orange-500 cursor-pointer hover:text-orange-300 transition">
            amazon<span className="text-white">.de</span>
          </h1>
          <div className="flex items-center gap-1 cursor-pointer hover:text-yellow-400 transition">
            <svg
              className="w-4 h-4 text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z" />
            </svg>
            <span>Lieferung an Berlin 12627</span>
          </div>
        </div>

        {/* Middle: Search Bar */}
        <div className="flex flex-1 mx-4">
          <select className="bg-gray-100 text-black text-xs p-2 rounded-l-md cursor-pointer hover:bg-gray-200">
            <option>Alle</option>
            <option>Bücher</option>
            <option>Elektronik</option>
          </select>
          <input
            type="text"
            placeholder="Amazon.de durchsuchen"
            className="flex-1 p-2 text-black text-sm focus:outline-none"
          />
          <button className="bg-yellow-400 p-2 rounded-r-md hover:bg-yellow-500 transition">
            <FiSearch className="text-black" />
          </button>
        </div>

        {/* Right: Language, Account, Cart */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 cursor-pointer hover:text-yellow-400 transition">
            <FaFlag className="text-lg" />
            <span>DE</span>
          </div>
          {user ? (
            <div
              className="relative text-left"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex flex-col cursor-pointer hover:text-yellow-400 transition">
                <span className="text-xs">
                  Hallo, {user.name || user.email}
                </span>
                <span className="font-bold">Mein Konto</span>
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white text-black shadow-md rounded-md w-full z-50">
                  <button
                    onClick={() => navigate("/")}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Mein Konto
                  </button>
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      sessionStorage.removeItem("token");
                      sessionStorage.removeItem("user");
                      navigate("/login");
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                  >
                    Abmelden
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div
              className="flex flex-col cursor-pointer hover:text-yellow-400 transition"
              onClick={() => navigate("/login")}
            >
              <span className="text-xs">Hallo, anmelden</span>
              <span className="font-bold">Konto und Listen</span>
            </div>
          )}
          <div className="flex flex-col cursor-pointer hover:text-yellow-400 transition">
            <span className="text-xs">Warenrücksendungen</span>
            <span className="font-bold">und Bestellungen</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-yellow-400 transition">
            <FiShoppingCart className="text-2xl" />
            <span>Einkaufswagen</span>
          </div>
        </div>
      </div>

      {/* Bottom Nav Row */}
      <nav className="flex items-center gap-4 px-4 py-2 bg-[#232F3E] text-sm">
        <div className="flex items-center gap-1 cursor-pointer hover:text-yellow-400 hover:bg-[#131921] p-2 rounded transition">
          <FiMenu />
          <span>Alle</span>
        </div>
        {[
          "Knuspr",
          "Bestseller",
          "Amazon Basics",
          "Neuerscheinungen",
          "Angebote",
          "Bücher",
          "Prime",
          "Shopping-Tipps",
          "Mode",
          "Gutscheine",
        ].map((item) => (
          <span
            key={item}
            className="cursor-pointer hover:text-yellow-400 hover:bg-[#131921] p-2 rounded transition"
          >
            {item}
          </span>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;
