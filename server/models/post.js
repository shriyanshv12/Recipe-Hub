import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  description: String,
  name: String,
  ingredients: String,
  time: String,
  creator: String,
  imageFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostModal = mongoose.model("Post", postSchema);

export default PostModal;