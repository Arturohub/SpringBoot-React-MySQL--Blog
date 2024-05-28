import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

export default function CreatePost(){
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const createPost = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!title || !subtitle || !content || !image) {
            toast.warn("Please fill out all the input fields!");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post("https://arturoblog-backend-sb.onrender.com/api/blog", { title, subtitle, content, image });
            toast.success(response.data);
            setIsLoading(false);
            navigate("/blog");
        } catch (error) {
            toast.error(error.response.data);
            setIsLoading(false);
        }
    }

    return (
        <div className="container m-auto justify-center pr-4 pl-4">
            <h1 className="text-4xl my-8 underline text-black font-bold text-center">Create a New Post</h1>
            <form onSubmit={createPost} className="bg-custom-green shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-extrabold underline text-lg tracking-wider mb-2">Title</label>
                    <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="subtitle" className="block text-gray-700 font-extrabold underline text-lg tracking-wider mb-2">Subtitle</label>
                    <input type="text" id="subtitle" name="subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700 font-extrabold underline text-lg tracking-wider mb-2">Post</label>
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        className="mt-1 border border-black rounded-md"
                        formats={['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image']}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 font-extrabold underline text-lg tracking-wider mb-2">Image URL</label>
                    <input type="text" id="image" name="image" className="mt-1 p-2 border border-gray-300 rounded-md w-full" value={image} onChange={(e) => setImage(e.target.value)} />
                </div>
                {!isLoading && (
                    <button type="submit" className="inline-block mt-4 shadow-md bg-green-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-green-900 hover:cursor-pointer">
                        {isLoading ? 'Creating...' : 'Create Post'}
                    </button>
                )}
            </form>
        </div>
    );
}
