import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, type: null })

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      try {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      } catch (error) {
        localStorage.removeItem('loggedBlogappUser')
      }
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs => {
        setBlogs(blogs.sort((a, b) => b.likes - a.likes))
      }).catch(() => {
        // Handle error silently or show notification
      })
    }
  }, [user])

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000)
  }

  const login = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      
      // Set localStorage first
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      
      // Set token
      blogService.setToken(user.token)
      
      // Update state last
      setUser(user)
      
      showNotification('Login successful', 'success')
      
      // Force a re-render by updating blogs
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
      
    } catch (exception) {
      showNotification('wrong username or password', 'error')
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
    setBlogs([])
    showNotification('Logged out successfully', 'success')
  }

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog).sort((a, b) => b.likes - a.likes))
      showNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 'success')
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      showNotification('Error creating blog', 'error')
    }
  }

  const updateBlog = async (id, updatedBlog) => {
    try {
      const returnedBlog = await blogService.update(id, updatedBlog)
      setBlogs(blogs.map(blog => blog.id === id ? returnedBlog : blog).sort((a, b) => b.likes - a.likes))
      showNotification(`Blog "${updatedBlog.title}" updated`, 'success')
    } catch (exception) {
      showNotification('Error updating blog', 'error')
    }
  }

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      showNotification('Blog removed successfully', 'success')
    } catch (exception) {
      showNotification('Error removing blog', 'error')
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={notification.message} type={notification.type} />
        <LoginForm login={login} />
      </div>
    )
  }

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={logout}>logout</button></p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog 
          key={blog.id} 
          blog={blog} 
          updateBlog={updateBlog}
          user={user}
          removeBlog={removeBlog}
        />
      )}
    </div>
  )
}

export default App