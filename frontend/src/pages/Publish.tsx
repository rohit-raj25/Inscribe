import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Editor } from "../components/Editor";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [authorBio, setAuthorBio] = useState("");
    const navigate = useNavigate();

    return (
        <div>
            <Appbar />
            <div className="flex justify-center w-full pt-8">
                <div className="max-w-screen-lg w-full">
                    {/* Title Input */}
                    <div className="flex justify-between mb-4">
                        <input
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Title"
                        />
                    </div>

                    {/* Author Bio Input */}
                    <div className="flex justify-between mb-4">
                        <textarea
                            onChange={(e) => setAuthorBio(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Write a brief description about yourself (Author Bio)"
                            rows={4}
                        />
                    </div>

                    {/* Rich Text Editor */}
                    <Editor
                        description={description}
                        onChange={(e) => {
                            console.log(e);
                            setDescription(e);
                        }}
                    />

                    {/* Publish Button */}
                    <button
                        onClick={async () => {
                            const response = await axios.post(
                                `${BACKEND_URL}/api/v1/blog`,
                                {
                                    title,
                                    content: description,
                                    authorBio, // Include author bio in the payload
                                },
                                {
                                    method: "POST",
                                    headers: {
                                        Authorization: localStorage.getItem("token"),
                                    },
                                }
                            );
                            navigate(`/blog/${response.data.id}`);
                        }}
                        type="submit"
                        className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                    >
                        Publish post
                    </button>
                </div>
            </div>
        </div>
    );
};
