import { useBlog } from '../hooks'
import { AiTwotoneDelete } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";
import { Link,  useNavigate, useParams } from 'react-router-dom';
import { BlogContent } from '../components/BlogContent';
import { Appbar } from '../components/Appbar';
import { Spinner } from '../components/Spinner';
import axios from 'axios';
import { BACKEND_URL } from '../config';

export const Blog=()=> {
  const {id} = useParams();
  const navigate=useNavigate();
  const {loading,blog}=useBlog({
    id:id || ""
  });
  if (loading || !blog) {
    return <div>
        <Appbar />
    
        <div className="h-screen flex flex-col justify-center">
            
            <div className="flex justify-center">
                <Spinner />
            </div>
        </div>
    </div>
}

const handleDelete = async () => {
    try {
        const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            },
        });
        console.log("Blog deleted successfully:", response.data);
        navigate("/blogs");
    } catch (error: any) { // Cast error to `any` to access `error.response`
        if (axios.isAxiosError(error)) {
            console.error("Error deleting blog:", error.response?.data || error.message);
        } else {
            console.error("Unexpected error:", error);
        }
    }
};


return( 

    <div className='flex flex-col'>
        <div className=' '>
            <BlogContent blog={blog}  />    
        </div>
        <div className='flex justify-center pr-80 space-x-4'>
            <div className="text-slate-500 text-xl font-thin flex gap-2 cursor-pointer p-4 ">

                <AiTwotoneDelete className='text-4xl' onClick={handleDelete}/>
                <Link to={`/publish/${id}`} >
                    <RiEdit2Fill className='text-4xl ' />
                </Link>
                
                
            </div>
        </div>
        
    </div>
)
  
}
