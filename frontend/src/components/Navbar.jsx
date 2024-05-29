import Logo from '../assets/images/logo.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setUserEmail } from '../redux/authSlice.jsx';
import { useSelector, useDispatch } from 'react-redux'; 
import { selectUserEmail } from '../redux/authSlice';

export default function Navbar() {
    const dispatch = useDispatch();
    const userEmail = useSelector(selectUserEmail);
    
    const logout = async () => {
        try {
            await axios.post("https://arturoblog-backend-sb.onrender.com/api/auth/logout", null, { withCredentials: true });
            dispatch(setUserEmail(null));
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
                {userEmail === "arturochicavilla@hotmail.com" && (
                    <Link to="/blog/create" className="ml-4 font-bold text-md lg:text-2xl md:text-xl">Create Post</Link>
                )}
            </div>
            {userEmail && (
                <Link to="/" onClick={logout} className="ml-4 font-bold text-md lg:text-2xl md:text-xl">Logout</Link>
            )}
            {!userEmail && (
                <Link to="/login" className="ml-4 font-bold text-md lg:text-2xl md:text-xl">Login</Link>
            )}
        </div>
    );
}
