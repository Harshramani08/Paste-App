import { NavbarData } from "../data/Navbar";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-900 shadow-md">
      <div className="max-w-[1200px] mx-auto flex justify-center items-center gap-x-8 px-6 h-[55px]">
        {NavbarData.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.path}
            className={({ isActive }) =>
              `transition-colors duration-200 text-lg ${isActive
                ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-[2px]"
                : "text-gray-200 hover:text-blue-300"
              }`
            }
          >
            {link.title}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
