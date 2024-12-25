import { Bubble } from "../components/Bubble";
import { Appbar } from "../components/Appbar";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate(); 

    const handleSignUp = () => {
        navigate("/signup");
      };


    const handleSignIn = () => {
        navigate("/signin"); 
      };
    return (
        <div className="min-h-screen bg-blue-50">
        
        <Appbar />
  
        
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between px-8 lg:px-32 h-screen">
          
          <div className="leading-8 lg:w-1/2 text-center lg:text-left mb-36">
            <p className="text-2xl font-medium  font-playwrite-vn-guides text-black ">
              the blog
            </p>
            <h1 className=" text-6xl font-bold font-manrope  text-black  mb-20 ">
              Writings from our team
            </h1>
            <div className="flex flex-col lg:flex-row gap-4 justify-center lg:justify-start mt-4">
            <button className="px-6 py-3 bg-black text-white text-lg font-medium rounded-full hover:bg-gray-800 transition duration-300 " onClick={handleSignIn}>
              Get Started
            </button>
            <button className="px-6 py-3 bg-white text-black border border-black text-lg font-medium rounded-full hover:bg-gray-100 transition duration-300 " onClick={handleSignUp}>
              Sign Up
            </button>
          </div>
        </div>
          
  
          
          <div className="relative lg:w-1/2 flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-200 w-80 h-80 lg:w-96 lg:h-96 rounded-full -z-10"></div>
            <div className="z-10">
              <Bubble />
            </div>
          </div>
        </div>

      </div>
       
    );
}

export default Home;
