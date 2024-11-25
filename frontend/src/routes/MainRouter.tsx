import {Route, Routes, useNavigate} from "react-router";
import {Login, Register} from "../pages";
import {Home} from "../pages/home/Home.tsx";
import {CreatePost} from "../pages/createPost/CreatePost.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store.ts";
import {logout} from "../store/slices/authSlice.ts";

export const MainRouter = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {userToken} = useSelector((state:RootState) => state.auth);
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    }
    return (
        <div className="flex flex-col">
            {userToken && <p className="self-end mr-8 mt-3 hover:underline cursor-pointer" onClick={handleLogout}>Logout</p>}
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/" element={<Home/>} />
                <Route path="/createpost" element={<CreatePost/>} />
            </Routes>
        </div>
    )
};