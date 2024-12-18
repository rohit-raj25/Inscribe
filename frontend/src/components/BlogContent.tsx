import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom"; 
import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";
import 'react-quill/dist/quill.bubble.css';
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useState } from "react";

export const BlogContent = ({ blog }: { blog: Blog }) => {
  const navigate = useNavigate();

  const handleSummarize = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No authentication token found. Please log in.");
        return;
      }
  
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog/summarize`,
        { content: blog.content },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`, 
          },
        }
      );
  
      const { summary } = response.data;
      console.log(summary);
      setSummary(summary);
      // navigate("/summarize", { state: { summary } });
    } catch (error) {
      
      alert("Failed to summarize content. Please try again.");
    }
  };

  const[summary, setSummary] = useState(null);
  

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div
          className="flex bg-green-500 h-10 w-18 p-4 rounded-full text-white mt-4 justify-center items-center fixed bottom-4 right-28 shadow-lg shadow-inherit-200 cursor-pointer"
          onClick={handleSummarize}
        >
          <p className="font-bold">Summarize</p>
        </div>
        <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">{blog.title}</div>
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
            {summary===null ? <ReactQuill
                value={blog.content}
                readOnly={true}
                theme="bubble"
              /> : <ReactQuill
              value={summary}
              readOnly={true}
              theme="bubble"
            />}
                    
                </div>
            
          </div>
          <div className="col-span-4">
            <div className="text-slate-600 font-semibold">Author</div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar token={blog.author.name?.charAt(0).toUpperCase() || "A"} size="big" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                  Just a random phrase about the author's ability to grasp the concept of the universe.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
