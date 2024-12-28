import { Link } from "react-router-dom";

import { Avatar } from "./BlogCard";
import { CiSearch } from "react-icons/ci";

export const Appbar = ({ value, onSearchChange }: any) => {
  let firstLetter = "";

  try {
   
  
    const user = localStorage.getItem("user");
    const User = user ? JSON.parse(user) : "Anonymous";
    firstLetter = User.email.charAt(0).toUpperCase();
  } catch (error) {
    console.error("Error decoding token:", error);
    
  }

  return (
    <div className="border-b flex justify-between px-10 py-4">
      <div className="flex justify-center items-center gap-20">
        <Link
          to={'/blogs'}
          className="flex flex-col justify-center cursor-pointer font-semibold text-2xl font-manrope"
        >
          Inscribe
        </Link>

        <div className="relative flex items-center">
          <CiSearch className="absolute left-3 text-slate-500" />
          <input
            type="text"
            placeholder="Search for a blog.."
            value={value}
            onChange={(e) => onSearchChange(e.target.value)} 
            className="p-2 w-60 rounded-full pl-10 focus:outline-none bg-slate-100 font-thin text-base text-slate-500"
          />
        </div>
      </div>

      <div>
        <Link to={`/publish`}>
          <button
            type="button"
            className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            New
          </button>
        </Link>
        <Avatar token={firstLetter} size="big" />
      </div>
    </div>
  );
};
