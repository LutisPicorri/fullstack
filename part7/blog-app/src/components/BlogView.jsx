import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../store/blogsSlice'
import { setNotification } from '../store/notificationSlice'
import blogService from '../services/blogs'

const BlogView = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const [comment, setComment] = useState('')

  const blog = blogs.find(b => b.id === id)

  if (!blog) {
    return <div>Blog not found</div>
  }

  const handleLike = async () => {
    try {
      await dispatch(likeBlog(blog)).unwrap()
      dispatch(setNotification({ 
        message: `Blog '${blog.title}' liked`, 
        type: 'success' 
      }))
    } catch (exception) {
      dispatch(setNotification({ 
        message: 'Error liking blog', 
        type: 'error' 
      }))
    }
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
      try {
        await dispatch(deleteBlog(blog.id)).unwrap()
        dispatch(setNotification({ 
          message: `Blog '${blog.title}' deleted`, 
          type: 'success' 
        }))
      } catch (exception) {
        dispatch(setNotification({ 
          message: 'Error deleting blog', 
          type: 'error' 
        }))
      }
    }
  }

  const handleComment = async (event) => {
    event.preventDefault()
    try {
      await blogService.addComment(blog.id, comment)
      dispatch(setNotification({ 
        message: 'Comment added', 
        type: 'success' 
      }))
      setComment('')
      // Refresh blogs to get updated comments
      window.location.reload()
    } catch (exception) {
      dispatch(setNotification({ 
        message: 'Error adding comment', 
        type: 'error' 
      }))
    }
  }

  return (
    <div className="blog-detail">
      <h2>{blog.title} by {blog.author}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <button onClick={handleLike}>like</button>
      </div>
      {user && blog.user && user.username === blog.user.username && (
        <button onClick={handleDelete} className="danger">remove</button>
      )}
      
      <div className="comments">
        <h3>comments</h3>
        <form onSubmit={handleComment}>
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            placeholder="Add a comment..."
          />
          <button type="submit">add comment</button>
        </form>
        {blog.comments && blog.comments.length > 0 ? (
          <ul>
            {blog.comments.map((comment, index) => (
              <li key={index} className="comment">{comment}</li>
            ))}
          </ul>
        ) : (
          <p>No comments yet</p>
        )}
      </div>
    </div>
  )
}

export default BlogView
