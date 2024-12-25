import { Link } from "react-router-dom";


import { BlogSkeleton } from "./BlogSkeleton";
import { Appbar } from "./Appbar";
import axios from "axios";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  authorBio: string;
  publishedDate: string;
  id: number;
}

interface AvatarProps {
  token: string;
  size?: "small" | "big";
}



export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  authorBio,
  publishedDate,
}: BlogCardProps) => {

 
  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete the blog: "${blog.title}"?`)) {
        handleDelete(id, userToken);
    }
};

const handleDelete = async (id, userToken) => {
  try {
      const response = await axios.delete(`/api/blogs/${blogId}`, {
          headers: {
              Authorization: `Bearer ${userToken}`,
          },
      });

      alert('Blog deleted successfully');
      // Optionally, refresh the blogs list or redirect
  } catch (error) {
      if ((error as any).response) {
          if (error.response.status === 403) {
              alert("You are not authorized to delete this blog.");
          } else if (error.response.status === 404) {
              alert("Blog not found.");
          } else {
              alert("An error occurred while deleting the blog.");
          }
      } else {
          alert("Unable to connect to the server.");
      }
  }
};


  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
          <Avatar token={authorName.charAt(0).toUpperCase()} />
          <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
            {authorName}
          </div>
          <Circle />
          <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
            {publishedDate}
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="text-md font-thin">
          
          {content.slice(0, 100) + "..."}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4 flex justify-between">
          <div>
          {`${Math.ceil(content.length / 100)} minute(s) read`}
          </div>
          
          

        </div>
      </div>
    </Link>
  );
};

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}

export function Avatar({ token, size = "small" }: AvatarProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      }`}
    >
      <span
        className={`${
          size === "small" ? "text-xs" : "text-md"
        } font-extralight text-white`}
      >
        {token}
      </span>
    </div>
  );
}
