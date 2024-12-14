import { useEffect, useState } from "react";
// import "" from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
    "content": string;
    "title": string;
    "id": number
    "author": {
        "name": string
    }
}

export const useBlog=({id}:{id:string}) => {
    const[loading, setLoading] = useState(true);
    const[blog, setBlog] = useState<Blog>();
    console.log(localStorage.getItem("token"));

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers:{
                "Authorization": localStorage.getItem("token")
            }
        }
        )
        .then(response => {
            setBlog(response.data.blog);
            setLoading(false);
        })

    },[id])

    return {
        loading,
        blog
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            // method: "GET",
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.blogs);
                setLoading(false);
            })
            // .catch(error => {
            //     console.error("Error fetching blogs:", error);
            //     setLoading(false); // make sure to handle errors by setting loading state to false
            // });
            // console.log(localStorage.getItem("token"));
    }, [])

    return {
        loading,
        blogs
    }
}