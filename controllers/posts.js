const Post = require('../models/Post')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllPosts = async (req, res) => {
    console.log(req.user)
    const posts = await Post.find({createdBy:req.user.userId})
    res.status(StatusCodes.OK).json({posts, count:posts.length})

}
const getPost = async (req, res) => {
	res.send("get a posts");
};

const createPost = async (req, res) => {
    req.body.createdBy = req.user.userId
    const post = await Post.create(req.body)
    res.status(StatusCodes.CREATED).json({post})
};

const updatePost = async (req, res) => {
	res.send("get all posts");
};

const deletePost = async (req, res) => {
	res.send("get all posts");
};

module.exports = { getAllPosts, getPost, createPost, updatePost, deletePost }
