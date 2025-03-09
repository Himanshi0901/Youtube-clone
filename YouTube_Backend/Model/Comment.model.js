import mongoose from "mongoose";

const { Schema } = mongoose;

// Schema for comments
const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: false
    },
    Video_id_Num: {
        type: String,
        required: true
    }
});

const commentModel = mongoose.model('comments', commentSchema);
export default commentModel;