import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../store/blogsSlice'
import { setNotification } from '../store/notificationSlice'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await dispatch(createBlog({ title, author, url })).unwrap()
      dispatch(setNotification({ 
        message: `a new blog '${title}' by ${author} added`, 
        type: 'success' 
      }))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      dispatch(setNotification({ 
        message: 'Error creating blog', 
        type: 'error' 
      }))
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
