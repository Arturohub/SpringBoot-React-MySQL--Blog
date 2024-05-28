import React from 'react';
import Logo from '../assets/images/logo.jpg';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setHasToken } from "../redux/tokenSlice";
import { setUser } from '../redux/userSlice';

export default function Navbar() {
    const userEmail = useSelector(state => state.user.email);
    const hasToken = useSelector(state => state.token.hasToken);
    const dispatch = useDispatch();

    const logout = async () => {
        try {
            await axios.post("https://arturoblog-backend-sb.onrender.com/api/auth/logout", null, { withCredentials: true });
            dispatch(setHasToken(false));
            dispatch(setUser(''));
            document.cookie = "Arturo-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }

    return (
        <div className="flex items-center justify-between bg-green-800 text-white p-4 lg:p-6">
            <div className="flex items-center">
                <img src={Logo} alt="LogoNavbar" className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 cursor-pointer rounded-xl" />
                <Link to="/" className="ml-4 font-bold text-md lg:text-2xl md:text-xl">Home</Link>
                <Link to="/blog" className="ml-4 font-bold text-md lg:text-2xl md:text-xl">Blog</Link>
                {hasToken && userEmail === "arturochicavilla@hotmail.com" && (
                    <Link to="/blog/create" className="ml-4 font-bold text-md lg:text-2xl md:text-xl">Create Post</Link>
                )}
            </div>

            {hasToken ? (
                <Link to="/" onClick={logout} className="ml-4 font-bold text-md lg:text-2xl md:text-xl">Logout</Link>
            ) : (
                <Link to="/login" className="ml-4 font-bold text-md lg:text-2xl md:text-xl">Login</Link>
            )}
        </div>
    );
}