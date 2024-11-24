import {Post} from "../store/slices/stateTypes.ts";

export const PostCard = ({title, content, author, createdAt}: Post) => {
    return (
        <div className="flex flex-col gap-3 bg-slate-200 px-8 py-6 rounded-xl" style={{width: '720px'}}>
            <p className="text-2xl">{title}</p>
            <p className="text-lg">{content}</p>
            <div className="flex gap-5">
                <p className="text-sm">Author: {author.username}</p>
                <p className="text-sm">Created: {createdAt?.slice(0,10)}</p>
            </div>
        </div>
    );
};