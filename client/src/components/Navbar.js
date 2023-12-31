import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  //bg-gradient-to-r from-blue-600 via-pink-500 to-yellow-500
  return (
    <>
      <nav className="bg-black flex flex-row justify-content-space-between items-center h-14">
        <div className="container mx-auto justify-start flex-row flex">
          <ul className="flex space-x-4">
            <li>
              <button
                type="button"
                className="bg-transparent hover:bg-gradient-to-r hover:from-cyan-600 hover:bg-green-600 border-2 border-white w-full rounded-full py-2 px-4"
                disabled
              >
                <Link
                  to="/"
                  className="text-white font-mono font-semibold tracking-wide"
                >
                  SEARCH
                </Link>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="bg-transparent hover:bg-gradient-to-r hover:from-cyan-600 hover:bg-green-600 border-2 border-white w-full rounded-full py-2 px-4"
                disabled
              >
                <Link
                  to="/rankings"
                  className="text-white font-mono font-semibold tracking-wide"
                >
                  RANKS
                </Link>
              </button>
            </li>
            {/* <li>
              <button
                type="button"
                className="bg-transparent hover:bg-gradient-to-r hover:from-cyan-600 hover:bg-green-600 border-2 border-white w-full rounded-full py-2 px-4"
                disabled
              >
                <Link
                  to="/artist"
                  className="text-white font-mono font-semibold tracking-wide"
                >
                  ARTIST
                </Link>
              </button>
            </li> */}
          </ul>
        </div>
        <div className="container mx-auto justify-end mr-4 flex flex-row">
          <ul className="flex space-x-4">
            <li>
              <button
                type="button"
                className="bg-transparent hover:bg-gradient-to-r hover:from-cyan-600 hover:bg-green-600 border-2 border-white w-full rounded-full py-2 px-4"
                disabled
              >
                <Link
                  to="/login"
                  className="text-white font-mono font-semibold tracking-wide"
                >
                  LOGIN
                </Link>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="bg-transparent hover:bg-gradient-to-r hover:from-cyan-600 hover:bg-green-600 border-2 border-white w-full rounded-full py-2 px-4"
                disabled
              >
                <Link
                  to="/signup"
                  className="text-white font-mono font-semibold tracking-wide"
                >
                  SIGN UP
                </Link>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
