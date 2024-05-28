import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setHasToken } from "../../redux/tokenSlice";
import { setUser } from "../../redux/userSlice";
import { jwtDecode } from "jwt-decode";

axios.defaults.withCredentials = true;

export default function Login() {
    const token = useSelector((state) => state.token.value);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        const decodetoken = getCookie("Arturo-token");
        if (decodetoken) {
            decodeJWT(decodetoken);
            dispatch(setHasToken(true));
            navigate("/blog");
        }
    }, []);

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    const decodeJWT = (token) => {
        if (typeof token === 'string') {
            try {
                const decodedToken = jwtDecode(token);
                const userEmail = decodedToken.email;
                dispatch(setUser({ email: userEmail }));
            } catch (error) {
                console.error("Error decoding JWT token:", error);
            }
        } else {
            console.error("Invalid token specified: must be a string");
        }
    };
    
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
            const decodetoken = getCookie("Arturo-token");
            decodeJWT(decodetoken);
            dispatch(setHasToken(true));
            toast.success("User logged in successfully. Enjoy the blog!");
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
                    <label for="username" className="block mb-2 text-md font-bold text-gray-800">Email:</label>
                    <input className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" type="email" value={email} onChange={(e)=> setEmail(e.target.value)}></input>
                </div>
                <div className="mb-6">
                <label for="email" className="block mb-2 text-md font-bold text-gray-800">Password:</label>
                    <input className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" type="password" value={password} onChange={(e)=> setPassword(e.target.value)}></input>
                </div>
                <button type="submit" className="w-full mt-6 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Log In</button>
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
