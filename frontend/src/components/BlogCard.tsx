import { Link } from "react-router-dom";


import { BlogSkeleton } from "./BlogSkeleton";
import { Appbar } from "./Appbar";
import axios from "axios";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  authorBio: string;
  createdAt: Date;
  
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
  createdAt,
  
}: BlogCardProps) => {
  const formattedDate = new Date(createdAt).toDateString();
  const plainContent = content.replace(/<[^>]+>/g, "");

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
            {formattedDate}
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="text-md font-thin">
          
        {plainContent.slice(0, 100) + "..."}
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
