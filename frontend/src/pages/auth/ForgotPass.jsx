import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import axios from "axios"


export default function ForgotPass(){


    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post("https://arturoblog-backend-sb.onrender.com/api/auth/forgotpassword", { email }, { withCredentials: true });
            if (response.status === 200) {
                toast.success("Password reset link sent to your email");
                navigate("/blog"); 
            } else {
                toast.error("Failed to send password reset link");
            }
        } catch (error) {
            console.error("Error sending password reset link:", error);
            if (error.response) {

                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            } else if (error.request) {

                console.error("Request:", error.request);
            } else {

                console.error("Error:", error.message);
            }
            toast.error("Failed to send password reset link");
        } finally {
            setIsLoading(false);
        }
    }
    


    return(
        <div class="flex justify-center items-center mt-36 m-4">
            <form class="w-full max-w-lg px-6 py-8 bg-custom-green shadow-md rounded-md" onSubmit={handleSubmit}>
                <p class="text-center text-2xl font-bold mb-8 font-dela-gothic-one">Recover Password</p>
                <div class="mb-6">
                    <label for="username" class="block mb-2 text-md font-bold text-gray-800">Email:</label>
                    <input class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" type="email" value={email} onChange={(e)=> setEmail(e.target.value)}></input>
                </div>
                <button type="submit" class="w-full mt-6 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Recover Password</button>
                <div class="text-center mt-8">
                    <Link to="/login" class="text-sm cursor-pointer text-blue-500 underline hover:text-blue-700 focus:outline-none focus:text-blue-700">You suddenly remembered you password? Login here!</Link>
                </div>
            </form>

        </div>
    )
}
