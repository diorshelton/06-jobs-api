const express = require('express')
const {register}  = require('../controllers/auth')
const router = express.Router()

const {getAllPosts, getPost, createPost, updatePost, deletePost} = require ('../controllers/posts')

router.route('/').get( getAllPosts)
router.post('/', createPost)
router.get('/:id', getPost)
router.delete('/:id', deletePost)
router.patch('/:id', updatePost)

module.exports = router