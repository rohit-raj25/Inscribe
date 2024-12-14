import ReactQuill from "react-quill"
import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"
import 'react-quill/dist/quill.bubble.css'




export const BlogContent = ({blog}:{blog:Blog}) => {
    

    return <div>

        <Appbar /> 
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl">
            <div className="  col-span-8">
                <div className="text-5xl font-extrabold">
                    {blog.title}
                </div>
                <div className="text-slate-500 pt-3">
                    Post on 2nd December 2023
                </div>
                <div className="pt-4">
                <style>
                {`
                .quill .ql-editor > *{
                   font-family: "Montserrat", sans-serif;
                    letter-spacing: -0.003em;
                    line-height: 32px;
                     margin-top: 1.5em;
                     font-size: 20px;
                    line-height: 1.5;
                    color:grey
                    
                }
                `}
            </style>
                    <ReactQuill
                    value={blog.content}
                    readOnly={true}
                    theme={"bubble"}
                   
                   
                    
/>
                    
                </div>
                
            </div>
            <div className=" col-span-4 ">

                <div className="text-slate-600 font-semibold">
                    
                    Author
                </div>
               <div className="flex w-full">
                    <div className="pr-4 flex flex-col justify-center">
                        <Avatar size="big" name={blog.author.name || "Anonymous"}/>
                    </div>

                    <div>
                        <div className="text-2xl font-bold">
                        {blog.author.name || "Anonymous"} 
                    </div>
                    <div className="pt-2 text-slate-500">
                        Just  Random phrase about the author ability to grask the concept of the universe
                    </div>
                    </div>
               </div>
            </div>

            </div>
        </div>
        
    </div>
}