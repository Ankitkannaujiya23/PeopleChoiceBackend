import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    postID: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

const CommentModel= mongoose.model('CommentModel', commentSchema);
export default CommentModel;