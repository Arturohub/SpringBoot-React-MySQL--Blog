import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import SinglePost from "./pages/SinglePost";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import 'react-toastify/dist/ReactToastify.css';
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPass from "./pages/auth/ForgotPass";
import ResetPass from "./pages/auth/ResetPass";
import axios from "axios";

axios.defaults.baseURL = 'https://arturoblog-backend-sb.onrender.com';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<SinglePost />} />
        <Route path="/blog/create" element={<CreatePost />} />
        <Route path="/blog/editpost/:id" element={<EditPost />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recoverpass" element={<ForgotPass />} />
        <Route path="/resetpass" element={<ResetPass />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
