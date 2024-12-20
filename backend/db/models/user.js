import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
});

const User = mongoose.model("User", UserSchema);

export default User;