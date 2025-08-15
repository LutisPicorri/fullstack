const express = require('express')
const { getAllBlogs, createBlog, deleteBlog, updateBlog } = require('../controllers/blogs')
const { userExtractor } = require('../middleware/auth')

const router = express.Router()

router.get('/', getAllBlogs)
router.post('/', userExtractor, createBlog)
router.delete('/:id', userExtractor, deleteBlog)
router.put('/:id', updateBlog)

module.exports = router
