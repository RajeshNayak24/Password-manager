import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-800 text-center text-white fixed bottom-0 w-full">
      <div className="logo font-bold text-2xl">
        <span className="text-green-500">&lt;</span>
        <span>Sec</span>
        <span className="text-green-500">Pass</span>
        <span className="text-green-500">/&gt;</span>
      </div>
      <div> 
        © 2025 SecPass | All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
