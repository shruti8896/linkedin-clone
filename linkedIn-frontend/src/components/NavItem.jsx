import React from "react";
import { NavLink } from "react-router";

function NavItem({ icon, label, path }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex flex-col justify-between items-center h-full py-1.5 px-2 hover:text-gray-900 transition-colors duration-150 cursor-pointer border-b-2 select-none ${
          isActive 
            ? "text-gray-900 border-gray-900 font-medium" 
            : "text-gray-500 border-transparent hover:text-gray-800"
        }`
      }
    >
      <div className="flex-1 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-[10px] text-center tracking-wide hidden md:block mt-0.5">
        {label}
      </span>
    </NavLink>
  );
}

export default NavItem;
