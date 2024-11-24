import {Route, Routes} from "react-router";
import {Login, Register} from "../pages";
import {Home} from "../pages/home/Home.tsx";
import {CreatePost} from "../pages/createPost/CreatePost.tsx";

export const MainRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/" element={<Home/>} />
            <Route path="/createpost" element={<CreatePost/>} />
        </Routes>
    )
};