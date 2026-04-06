import React from "react";
import { Link, NavLink } from "react-router";

function NavItem({ icon, label, path }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex flex-col items-center sm:my-auto ${isActive ? "text-gray-900" : "text-gray-600"}`
      }
    >
      {icon}
      <span className=" md:block hidden text-xs text-center">{label}</span>
    </NavLink>
  );
}

export default NavItem;
