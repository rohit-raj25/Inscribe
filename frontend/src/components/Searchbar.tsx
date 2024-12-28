
import { CiSearch } from "react-icons/ci";
export const Searchbar=()=>{
    return(
        <div className="flex ">
            

            
            <div className="relative flex items-center text-2xl">
                <CiSearch className="absolute left-3 text-slate-500"/>
           
                <input type="text" placeholder="Search for a blog.." className="p-2 w-60 rounded-full pl-10 0 focus:outline-none  bg-slate-200 font-thin text-base text-slate-500" />
            </div>
            
            
        </div>
    )
}