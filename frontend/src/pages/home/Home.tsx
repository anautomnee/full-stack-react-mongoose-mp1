import { useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {useEffect} from "react";
import { getPosts} from "../../store/slices/actionCreators.ts";
import {PostCard} from "../../components/PostCard.tsx";

export const Home = () => {
    const { posts } = useSelector((state: RootState) => state.posts);
    const {userToken} = useSelector((state:RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        if(!userToken) {
            navigate("/login");
        }
    }, [userToken, navigate]);

    useEffect(() => {
        if(userToken) {
            dispatch(getPosts({token: userToken}));
        }
    }, [dispatch, userToken]);

    return (
        <div className="flex flex-col items-center justify-center mt-5">
            <p className="text-3xl font-bold underline">Posts</p>
            <button
                onClick={() => navigate('/createpost')}
                className="cursor-pointer py-2 px-4 rounded-lg bg-slate-600 text-white w-60 mt-5"
            >Create a new post</button>
            <div className="flex flex-col gap-5 my-5">
                {posts && [...posts].reverse().map((post, index) => (<PostCard
                    _id={post._id}
                    key={index}
                    title={post.title}
                    content={post.content}
                    author={post.author}
                    createdAt={post.createdAt}/> ))}
            </div>
        </div>
    )
};