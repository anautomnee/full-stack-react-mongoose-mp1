import {NavLink, useNavigate} from "react-router";
import { useSelector} from "react-redux";
import { RootState} from "../../store/store.ts";
import {useEffect} from "react";
import {PostForm} from "../../components/PostForm.tsx";

export const CreatePost = () => {
    const {userInfo} = useSelector((state:RootState) => state.auth);
    const navigate = useNavigate();


    useEffect(() => {
        if(!userInfo) {
            navigate("/login");
        }
    }, [userInfo, navigate]);


    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <p className="text-3xl font-bold underline">Create Post</p>
            <PostForm type="create"/>
            <NavLink className="mt-5" to="/">Go back to all posts</NavLink>
        </div>
    )
};