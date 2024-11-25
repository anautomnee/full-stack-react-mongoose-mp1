import {Post} from "../store/slices/stateTypes.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store.ts";
import {deletePost} from "../store/slices/actionCreators.ts";


export const PostCard = ({ _id, title, content, author, createdAt}: Post) => {
    const dispatch = useDispatch<AppDispatch>();
    const {userToken, userInfo} = useSelector((state:RootState) => state.auth);
    const handleDeletePost = () => {
        if (userToken && _id) {
            dispatch(deletePost({_id: _id, token: userToken}));
        }
    }
    return (
        <div className="flex justify-between items-center bg-slate-200 px-8 py-6 rounded-xl" style={{width: '720px'}}>
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
        </div>
    );
};