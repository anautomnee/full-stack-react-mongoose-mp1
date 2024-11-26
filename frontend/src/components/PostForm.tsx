import { useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store.ts";
import {useForm, SubmitHandler} from "react-hook-form";
import { createPostDataType} from "../store/slices/stateTypes.ts";
import {createPost} from "../store/slices/actionCreators.ts";
import {useEffect} from "react";
import {updatePost} from "../store/slices/actionCreators.ts";

type PostFormPropsType = {
    type: string,
    _id?: string,
    setEdit?:(state: boolean)=>void,
    title?: string,
    content?: string,
}

export const PostForm = ({type, _id, setEdit, title, content}: PostFormPropsType) => {
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

    useEffect(() => {
        if (status === "CREATED") {
            navigate("/");
        }
    }, [status, navigate]);

    const onSubmit: SubmitHandler<createPostDataType> = (data) => {
        if(type === "create") {
            if (userInfo && userToken) {
                dispatch(createPost({ ...data, author: userInfo, token: userToken }));
            }
        } else if(type === "edit") {
            if (userInfo && userToken && _id) {
                dispatch(updatePost({ ...data, _id, token: userToken }));
            }
        }
        if(setEdit) {
            setEdit(false);
        }
    }

    useEffect(() => {
        if (status === "CREATED") {
            navigate("/");
        }
    }, [status, navigate]);

    return (
            <form className="flex flex-col items-center justify-center mt-5 gap-5" onSubmit={handleSubmit(onSubmit)}>
                <input
                    placeholder="Title"
                    defaultValue={title ? title : ""}
                    {...register("title", {required: true})}
                    className="border py-2 px-4 rounded-lg bg-slate-100"
                    style={{width: '660px'}}/>
                {errors.title && <span>Title is required</span>}
                <textarea
                    defaultValue={content ? content : ""}
                    placeholder="Content"
                    {...register("content", {required: true, minLength: 20, maxLength: 200})}
                    className="border py-2 px-4 rounded-lg bg-slate-100 h-52"
                    style={{width: '660px'}}
                />
                {errors.content && <span>Content should be between 20 and 200 characters</span>}
                <input
                    type="submit"
                    className="cursor-pointer py-2 px-4 rounded-lg bg-slate-600 text-white w-60"
                />
            </form>
    )
};