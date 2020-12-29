import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { API_URL } from "../../utils";
import TemplateContext from "../utils/TemplateContext";

function Header(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const state = useContext(TemplateContext);

  const handleOpenMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${API_URL}/api/v1/logout`);
      state.addUser(null);
      props.history.push("/");
    } catch (err) {}
  };

  return (
    <>
      {menuOpen && (
        <motion.div
          initial={{ height: "0" }}
          animate={{ height: "100%" }}
          className="w-screen h-screen mt-16 absolute right-0 top-0 z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <ul className="bg-green-400 w-full absolute right-0 pl-4 pt-2 pb-8 text-gray-100 shadow-md">
            <Link to="/">
              <li className="mt-2 text-2xl">Home</li>
            </Link>
            <Link to="/">
              <li className="mt-2 text-2xl">How it works</li>
            </Link>
            <Link to="/create">
              <li className="mt-2 text-2xl">Create</li>
            </Link>
            {!state.values.user && (
              <>
                <Link to="/login">
                  <li className="mt-2 text-2xl">Login</li>
                </Link>
                <Link to="/signup">
                  <li className="mt-2 text-2xl">Sign Up</li>
                </Link>
              </>
            )}
            {state.values.user && (
              <Link to="/dashboard">
                <li className="mt-2 text-2xl">Account</li>
              </Link>
            )}
          </ul>
        </motion.div>
      )}
      <div className="h-16 w-full bg-green-400 flex items-center justify-between shadow-xl fixed z-40">
        <Link to="/">
          <h2 className="uppercase font-bold text-gray-100 text-2xl ml-12 md:ml-4 tracking-wider cursor-pointer">
            CREATE CV
          </h2>
        </Link>
        <div
          onClick={handleOpenMenu}
          className="hidden sm:inline text-2xl mr-4"
        >
          <div className="w-8 h-1 bg-white"></div>
          <div className="w-8 h-1 bg-white mt-1"></div>
          <div className="w-8 h-1 bg-white mt-1"></div>
        </div>
        {state.values.user ? (
          <div className="flex items-center text-gray-100 sm:hidden">
            <Link to="/">
              <span className="mx-4 md:mx-2 hover:text-gray-700 duration-300 cursor-pointer">
                Home
              </span>
            </Link>
            <Link to="/">
              <span className="mx-4 md:mx-2 hover:text-gray-700 duration-300 cursor-pointer">
                How it works
              </span>
            </Link>
            <Link to="/create">
              <span className="mx-4 md:ml-2 md:mr-0 hover:text-gray-700 duration-300 cursor-pointer">
                Create
              </span>
            </Link>
            <Link to="/dashboard">
              <h2 className="text-gray-100 mr-4 hover:text-gray-300 duration-300 cursor-pointer">
                Account
              </h2>
            </Link>
            <h2
              onClick={handleLogout}
              className="text-gray-100 mr-4 hover:text-gray-300 duration-300 cursor-pointer"
            >
              Logout
            </h2>
          </div>
        ) : (
          <div className="flex items-center sm:hidden">
            <div className="mr-8 text-gray-100">
              <Link to="/">
                <span className="mx-4 md:mx-2 hover:text-gray-700 duration-300 cursor-pointer">
                  Home
                </span>
              </Link>
              <Link to="/">
                <span className="mx-4 md:mx-2 hover:text-gray-700 duration-300 cursor-pointer">
                  How it works
                </span>
              </Link>
              <Link to="/create">
                <span className="mx-4 md:ml-2 md:mr-0 hover:text-gray-700 duration-300 cursor-pointer">
                  Create CV
                </span>
              </Link>
            </div>
            <div className="flex items-center mr-4">
              <Link to="/login">
                <button className="py-2 px-4 bg-green-400 hover:bg-green-500 duration-300 rounded text-gray-100">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="py-2 px-4 bg-white hover:bg-gray-100 duration-300 rounded text-green-400 hover:text-green-500">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
