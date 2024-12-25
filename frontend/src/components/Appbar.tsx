import { Link } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
  let firstLetter = "";

  try {
    // Get token from localStorage
    const userToken = localStorage.getItem("token") || "";
    const decodedToken = userToken ? jwtDecode<{ email?: string }>(userToken) : null;
    console.log(decodedToken);
    const user = localStorage.getItem("user");
    const User = user ? JSON.parse(user) : "Anonymous";
    console.log(User.email);
    firstLetter = User.email.charAt(0).toUpperCase();
    console.log(firstLetter);
  } catch (error) {
    console.error("Error decoding token:", error);
       // Fallback to "A" for anonymous users
  }

  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer font-semibold text-2xl font-manrope">
        Inscribe
      </Link>
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
