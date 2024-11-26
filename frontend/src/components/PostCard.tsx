import { Post} from "../store/slices/stateTypes.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store.ts";
import {deletePost} from "../store/slices/actionCreators.ts";
import {useState} from "react";
import {PostForm} from "./PostForm.tsx";


export const PostCard = ({ _id, title, content, author, createdAt}: Post) => {
    const [edit,setEdit] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const {userToken, userInfo} = useSelector((state:RootState) => state.auth);
    const handleDeletePost = () => {
        if (userToken && _id) {
            dispatch(deletePost({_id: _id, token: userToken}));
        }
    };


    return (
        <div className="flex justify-between items-center bg-slate-200 px-8 py-6 rounded-xl" style={{width: '720px'}}>
            {!edit && <>
                <div className="flex flex-col gap-3" style={{maxWidth: '600px'}}>
                    <p className="text-2xl">{title}</p>
                    <p className="text-lg">{content}</p>
                    <div className="flex gap-5">
                        <p className="text-sm">Author: {author.username}</p>
                        <p className="text-sm">Created: {createdAt?.slice(0, 10)}</p>
                    </div>
                </div>
                {author.username === userInfo &&
                    <svg onClick={handleDeletePost} xmlns="http://www.w3.org/2000/svg" height="24px"
                         viewBox="0 -960 960 960" width="24px" fill="#707070">
                        <path
                            d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>}
                    <svg onClick={() => setEdit(true)} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                         fill="#707070">
                        <path
                            d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                    </svg>
            </>}
            {edit && _id && <PostForm type="edit" _id={_id} title={title} content={content} setEdit={setEdit} />}
        </div>
    );
};