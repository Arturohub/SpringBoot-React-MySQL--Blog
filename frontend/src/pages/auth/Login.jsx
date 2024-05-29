import { useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setUserEmail } from '../../redux/authSlice.jsx';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();



    const loginUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const response = await axios.post("https://arturoblog-backend-sb.onrender.com/api/auth/login", {
                email: email,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            toast.success("User logged in successfully. Enjoy the blog!");
            dispatch(setUserEmail(email));
            navigate("/blog");
        } catch (error) {
            toast.error(error.response.data);
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <div className="flex justify-center items-center mt-36 m-4">
            <form className="w-full max-w-lg px-6 py-8 bg-custom-green shadow-md rounded-md" onSubmit={loginUser}>
                <p className="text-center text-2xl font-bold mb-8 font-dela-gothic-one">Log In</p>
                <div className="mb-6">
                    <label htmlFor="username" className="block mb-2 text-md font-bold text-gray-800">Email:</label>
                    <input className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" type="email" value={email} onChange={(e)=> setEmail(e.target.value)}></input>
                </div>
                <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-md font-bold text-gray-800">Password:</label>
                    <input className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" type="password" value={password} onChange={(e)=> setPassword(e.target.value)}></input>
                </div>
                <button type="submit" className="w-full mt-6 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"  disabled={isLoading}>{isLoading ? "Loading..." : "Log In"}</button>
                <div className="text-center mt-8">
                    <Link to="/register" className="text-sm cursor-pointer text-blue-500 underline hover:text-blue-700 focus:outline-none focus:text-blue-700">You don't have an account? Register here!</Link>
                </div>
                <div className="text-center mt-8">
                    <Link to="/recoverpass" className="text-sm cursor-pointer text-blue-500 underline hover:text-blue-700 focus:outline-none focus:text-blue-700">You forgot your password? Click here!</Link>
                </div>
            </form>

        </div>
    )
}
