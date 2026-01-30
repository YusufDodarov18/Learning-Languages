import { GraduationCap, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../theme/theme";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <header className="flex justify-between px-10 ">
        <h1 className="tracking-in-expand font-bold cursor-pointer flex text-2xl  text-blue-500 transition-all duration-300 gap-2 hover:underline hover:text-blue-600">
          <GraduationCap className="text-blue-500" size={40} />
          <Link to={"/"}>Learning languages</Link>
        </h1>
        <div>
          <button
            className={`cursor-pointer tracking-in-expand ${theme ? "text-white" : ""} p-2 rounded-full transition-all duration-300 hover:bg-blue-100 hover:scale-110`}
            onClick={toggleTheme}
          >
            {theme ? <Sun className="" /> : <Moon />}
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
