const { Blog } = require('../models/blog')
const { User } = require('../models/user')
const { connect } = require('../utils/config')

const getAllBlogs = async (request, response, next) => {
  try {
    await connect()
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  } catch (err) {
    next(err)
  }
}

const createBlog = async (request, response, next) => {
  try {
    await connect()
    
    // Use the user from the request (set by userExtractor middleware)
    const user = request.user

    const blog = new Blog({
      ...request.body,
      user: user._id
    })
    
    const result = await blog.save()
    const populatedResult = await Blog.findById(result._id).populate('user', { username: 1, name: 1 })
    response.status(201).json(populatedResult)
  } catch (err) {
    next(err)
  }
}

const deleteBlog = async (request, response, next) => {
  try {
    await connect()
    const blog = await Blog.findById(request.params.id)
    
    if (!blog) {
      return response.status(404).end()
    }
    
    // Check if the user is the creator of the blog
    const user = request.user
    if (blog.user.toString() !== user._id.toString()) {
      return response.status(403).json({ error: 'only the creator can delete a blog' })
    }
    
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (err) {
    next(err)
  }
}

const updateBlog = async (request, response, next) => {
  try {
    await connect()
    const { title, author, url, likes } = request.body
    
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { title, author, url, likes },
      { new: true, runValidators: true, context: 'query' }
    )
    
    if (updatedBlog) {
      response.json(updatedBlog)
    } else {
      response.status(404).end()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getAllBlogs,
  createBlog,
  deleteBlog,
  updateBlog
}
