import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Editor } from "../components/Editor";
import { useBlog } from "../hooks";
import { Spinner } from "../components/Spinner";
import { use } from "framer-motion/client";

export const Publish = () => {
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [authorBio, setAuthorBio] = useState("");
    const navigate = useNavigate();

     const {id} = useParams();
      const {loading,blog:initialBlogData}=useBlog({
        id:id || ""
      });
   
    useEffect(()=>{
        if(!loading && initialBlogData){
            setTitle(initialBlogData.title);
            setDescription(initialBlogData.content);
            setAuthorBio(initialBlogData.authorBio);
        }
    },[loading,initialBlogData])


    const handlePublish = async () => {
        const apiEndpoint = id ? `${BACKEND_URL}/api/v1/blog/${id}` : `${BACKEND_URL}/api/v1/blog`;
        const apiMethod = id ? "put" : "post";


        const response = await axios({
            method: apiMethod,
            url: apiEndpoint,
            data: {
                title,
                content: description,
                authorBio, 
            },
            headers:{
                Authorization: localStorage.getItem("token"),
            },
          });        
        console.log(response);
        navigate(`/blog/${response.data.id}`);
    }

    return (
        <div>
            <Appbar />
            <div className="flex justify-center w-full pt-8">
                <div className="max-w-screen-lg w-full">
                   
                    <div className="flex justify-between mb-4">
                        <input
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            type="text"
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Title"
                        />
                    </div>

                    
                    <div className="flex justify-between mb-4">
                        <textarea
                            onChange={(e) => setAuthorBio(e.target.value)}
                            value={authorBio}
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Write a brief description about yourself (Author Bio)"
                            rows={4}
                        />
                    </div>

                
                    <Editor
                        description={description}
                        onChange={(e) => {
                            
                            setDescription(e);
                        }}
                    />

                    
                    <button
                        onClick={handlePublish}
                        type="submit"
                        className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                    >
                        {id ?  "Update Post": "Publish post"}
                    </button>
                </div>
            </div>
        </div>
    );
};
