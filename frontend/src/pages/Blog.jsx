import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios';
import moment from 'moment';

export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);

    const getBlogs = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("https://arturoblog-backend-sb.onrender.com/api/blog");
            const sortedBlogs = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setBlogs(sortedBlogs);
            setSearchResults(sortedBlogs);
            setIsLoading(false);
        } catch (error) {
            toast.error('Error fetching blog entries:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getBlogs();
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        const filteredBlogs = blogs.filter(blog =>
            blog.title.toLowerCase().includes(query.toLowerCase()) ||
            blog.subtitle.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredBlogs);
        setNoResults(filteredBlogs.length === 0 && query !== '');
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold my-8 px-4 text-center">Latest Blog Posts</h1>
            <div className="mb-4 px-4">
                <input type="text" placeholder="Search blog posts..." value={searchQuery} onChange={handleSearch} className="border border-green-800 rounded-md px-4 py-2 w-full" />
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {noResults ? ( 
                        <p>No results found for "{searchQuery}". Please, try again with other keywords</p>
                    ) : (
                        searchResults.map(blog => (
                            <div key={blog.id} className="bg-custom-green p-4 rounded-xl">
                                <div className="flex justify-between">
                                    <div className="w-3/4">
                                        <Link to={`/blog/${blog.id}`}><h2 className="text-xl font-semibold">{blog.title}</h2></Link>
                                        <p className="text-gray-600 text-lg">{blog.subtitle}</p>
                                        <p className="text-gray-600 text-md">Created {moment(blog.createdAt).fromNow()}</p>
                                        <Link to={`/blog/${blog.id}`} className="text-blue-500 hover:underline">Read more</Link>
                                    </div>
                                    <div className="w-1/4">
                                        <Link to={`/blog/${blog.id}`}><img src={blog.image} alt="Blog Image" className="w-full h-auto rounded-xl" /></Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
