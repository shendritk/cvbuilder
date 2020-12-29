import React from "react";
import { Link } from "react-router-dom";
import GitHubIcon from "@material-ui/icons/GitHub";

function Footer() {
  return (
    <div className="h-12 py-8 px-8 sm:px-2 bg-gray-800 flex justify-between items-center">
      <span className="text-gray-100 ml-4 text-2xl font-bold sm:text-sm sm:mr-2 sm:text-green-400">
        CREATE CV
      </span>
      <ul className="flex text-gray-200 sm:justify-between items-center">
        <Link to="/">
          <li className="mr-4 hover:text-green-400 duration-200 cursor-pointer sm:hidden">
            Home
          </li>
        </Link>
        <Link to="/">
          <li className="mr-4 hover:text-green-400 duration-200 cursor-pointer sm:hidden">
            How it works
          </li>
        </Link>
        <Link to="/create">
          <li className="mr-4 hover:text-green-400 duration-200 cursor-pointer">
            Create
          </li>
        </Link>
        <Link to="/login">
          <li className="mr-4 hover:text-green-400 duration-200 cursor-pointer">
            Login
          </li>
        </Link>
        <Link to="/signup">
          <li className="mr-4 hover:text-green-400 duration-200 cursor-pointer">
            Signup
          </li>
        </Link>
      </ul>

      <a
        href="https://github.com/shendritk"
        target="_blank"
        rel="noopener noreferrer"
        className="mr-4 sm:mr-1 cursor-pointer"
      >
        <div className="text-gray-200 flex items-center">
          <GitHubIcon />
          <span className="lg:hidden text-gray-800 ml-2 bg-gray-200 hover:bg-green-400 duration-200 px-1">
            GitHub
          </span>
        </div>
      </a>
    </div>
  );
}

export default Footer;
