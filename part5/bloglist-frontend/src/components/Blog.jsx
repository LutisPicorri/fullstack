import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, user, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    updateBlog(blog.id, updatedBlog)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div className="blog">
      <div style={hideWhenVisible} className="blog-summary">
        <div className="blog-title">
          {blog.title} by {blog.author}
        </div>
        <button onClick={toggleVisibility} className="view-button">view</button>
      </div>
      <div style={showWhenVisible} className="blog-expanded">
        <div className="blog-title">
          {blog.title} by {blog.author}
        </div>
        <button onClick={toggleVisibility} className="hide-button">hide</button>
        <div className="blog-details">
          <div className="blog-url">
            <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
          </div>
          <div className="blog-likes">
            likes {blog.likes}
            <button className="like-button" onClick={handleLike}>like</button>
          </div>
          <div className="blog-user">
            added by {blog.user?.name}
          </div>
          {blog.user?.username === user?.username && (
            <button className="remove-button" onClick={handleRemove}>remove</button>
          )}
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  }).isRequired,
  updateBlog: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  removeBlog: PropTypes.func.isRequired
}

export default Blog