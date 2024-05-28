import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import axios from "axios"



export default function Register(){

    const[username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()


    const registerUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post("http://localhost:8080/api/auth/register", {
                username: username,
                email: email,
                password: password,
            });
            toast.success(response.data);
            setIsLoading(false);
            navigate("/login");
        } catch (error) {
            toast.error(error.response.data);
            setIsLoading(false);
        }
    };


   


    return(
        <div class="flex justify-center items-center mt-36 m-4">
            <form class="w-full max-w-lg px-6 py-8 bg-custom-green shadow-md rounded-md" onSubmit={registerUser}>
                <p class="text-center text-2xl font-bold mb-8 font-dela-gothic-one">Register</p>
                <div class="mb-6">
                    <label for="username" class="block mb-2 text-md font-bold text-gray-800">Username:</label>
                    <input class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" type="text" value={username} onChange={(e)=> setUsername(e.target.value)}></input>
                </div>
                <div class="mb-6">
                    <label for="username" class="block mb-2 text-md font-bold text-gray-800">Email:</label>
                    <input class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" type="email" value={email} onChange={(e)=> setEmail(e.target.value)}></input>
                </div>
                <div class="mb-6">
                <label for="email" class="block mb-2 text-md font-bold text-gray-800">Password:</label>
                    <input class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" type="password" value={password} onChange={(e)=> setPassword(e.target.value)}></input>
                </div>
                <button type="submit" class="w-full mt-6 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Register</button>
                <div class="text-center mt-8">
                    <Link to="/login" class="text-sm cursor-pointer text-blue-500 underline hover:text-blue-700 focus:outline-none focus:text-blue-700">You already have an account? Login here!</Link>
                </div>
            </form>

        </div>
    )
}
