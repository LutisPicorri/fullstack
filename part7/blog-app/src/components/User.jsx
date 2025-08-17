import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import userService from '../services/users'

const User = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await userService.getById(id)
        setUser(fetchedUser)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }
    fetchUser()
  }, [id])

  if (!user) {
    return null
  }

  const userBlogs = blogs.filter(blog => blog.user && blog.user.id === user.id)

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {userBlogs.length > 0 ? (
        <ul>
          {userBlogs.map(blog => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No blogs added yet</p>
      )}
    </div>
  )
}

export default User
