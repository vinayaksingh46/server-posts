import express from "express";
import bodyParser from "body-parser";
import PostMessage from "../model/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const posts = await PostMessage.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const { title, message, selectedFile, creator, tags } = req.body;

  const newPostMessage = new PostMessage({
    title,
    message,
    selectedFile,
    creator,
    tags,
  });
  console.log(title);
  console.log(message);
  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  console.log(req.params)
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "Item woth the id doesn't exist" });

    const updatedPost =post
   await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "Item woth the id doesn't exist" });
  console.log("inside server");
  await PostMessage.findByIdAndRemove(_id);

  res.json({ message: "Post delete succesfully" });
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "Item woth the id doesn't exist" });

  const Post = await PostMessage.findById(_id);
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { likesCount: Post.likesCount + 1 },
    { new: true }
  );

  res.json(updatedPost);
};
