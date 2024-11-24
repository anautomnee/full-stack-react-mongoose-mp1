import {NavLink, useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {useForm, SubmitHandler} from "react-hook-form";
import { createPostDataType} from "../../store/slices/stateTypes.ts";
import {createPost} from "../../store/slices/actionCreators.ts";
import {useEffect} from "react";

export const CreatePost = () => {
    const {userInfo, userToken} = useSelector((state:RootState) => state.auth);
    const {status} = useSelector((state:RootState) => state.posts);
    const navigate = useNavigate();
    console.log(userInfo);

    const dispatch = useDispatch<AppDispatch>();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<createPostDataType>();

    useEffect(() => {
        if(!userInfo) {
            navigate("/login");
        }
    }, [userInfo, navigate]);

    const onSubmit: SubmitHandler<createPostDataType> = (data) => {
        if (userInfo && userToken) {
            dispatch(createPost({ ...data, author: userInfo, token: userToken }));
        }
    }

    useEffect(() => {
        if (status === "CREATED") {
            navigate("/");
        }
    }, [status, navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <p className="text-3xl font-bold underline">Create Post</p>
            <form className="flex flex-col items-center justify-center mt-5 gap-5" onSubmit={handleSubmit(onSubmit)}>
                <input
                    placeholder="Title"
                    {...register("title", {required: true})}
                    className="border py-2 px-4 rounded-lg bg-slate-100"
                    style={{width: '720px'}}/>
                {errors.title && <span>This field is required</span>}
                <textarea
                    placeholder="Content"
                    {...register("content", {required: true, minLength: 20})}
                    className="border py-2 px-4 rounded-lg bg-slate-100 h-52"
                    style={{width: '720px'}}
                />
                {errors.content && <span>This field is required</span>}
                <input
                    type="submit"
                    className="cursor-pointer py-2 px-4 rounded-lg bg-slate-600 text-white w-60"
                />
            </form>
            <NavLink className="mt-5" to="/">Go back to all posts</NavLink>
        </div>
    )
};