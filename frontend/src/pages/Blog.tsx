import React from 'react'
import { useBlog } from '../hooks'
import { AiTwotoneDelete } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";
import { Link, useParams } from 'react-router-dom';
import { BlogContent } from '../components/BlogContent';
import { Appbar } from '../components/Appbar';
import { Spinner } from '../components/Spinner';
import { div } from 'framer-motion/client';

export const Blog=()=> {
  const {id} = useParams();
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
return( 

    <div className='flex flex-col'>
        <div className=' '>
            <BlogContent blog={blog}  />    
        </div>
        <div className='flex justify-center pr-80 space-x-4'>
            <div className="text-slate-500 text-xl font-thin flex gap-2 cursor-pointer p-4 ">
                <AiTwotoneDelete className='text-4xl' />
                <Link to={`/publish/${id}`} >
                    <RiEdit2Fill className='text-4xl ' />
                </Link>
                
                
            </div>
        </div>
        
    </div>
)
  
}
