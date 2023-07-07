import PostModal from "../models/post.js";
import mongoose from "mongoose";

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostModal({
      ...post,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });
try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await PostModal.find();
         res.status(200).json(posts);
    }
    catch (error) {
        res.status(404).json({ message: "Something went wrong" });
      }
    };

export const getPost = async (req, res) => {
        const { id } = req.params;
        try {
          const post = await PostModal.findById(id);
          res.status(200).json(post);
        } catch (error) {
          res.status(404).json({ message: "Something went wrong" });
        }
      };

      export const getPostsByUser = async (req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(404).json({ message: "User doesn't exist" });
        }
        const userPosts = await PostModal.find({ creator: id });
        res.status(200).json(userPosts);
      };

      export const deletePost = async (req, res) => {
        const { id } = req.params;
        try {
          if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No recipe exist with id: ${id}` });
          }
          await PostModal.findByIdAndRemove(id);
          res.json({ message: "Recipe deleted successfully" });
        } catch (error) {
          res.status(404).json({ message: "Something went wrong" });
        }
      };

      export const updatePost = async (req, res) => {
        const { id } = req.params;
        const { title, description, ingredients, time, creator, imageFile, tags } = req.body;
        try {
          if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No recipe exist with id: ${id}` });
          }
      
          const updatedPost = {
            creator,
            title,
            description,
            ingredients,
            time,
            tags,
            imageFile,
            _id: id,
          };
          await PostModal.findByIdAndUpdate(id, updatedPost, { new: true });
          res.json(updatedPost);
        } catch (error) {
          res.status(404).json({ message: "Something went wrong" });
        }
      };
