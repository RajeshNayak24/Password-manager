import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-5">
        <div className="logo font-bold text-2xl mb-3 sm:mb-0">
          <span className="text-green-500">&lt;</span>
          <span>Sec</span>
          <span className="text-green-500">Pass</span>
          <span className="text-green-500">/&gt;</span>
        </div>

        <ul className="flex flex-col sm:flex-row gap-4 text-center">
          <li>
            <a className="hover:font-bold" href="/">
              Home
            </a>
          </li>
          <li>
            <a className="hover:font-bold" href="/">
              About
            </a>
          </li>
          <li>
            <a className="hover:font-bold" href="/">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
