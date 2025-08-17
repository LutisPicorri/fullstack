import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import userService from '../services/users'

const Users = () => {
  const [users, setUsers] = useState([])
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.getAll()
        setUsers(fetchedUsers)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    fetchUsers()
  }, [])

  const getUserBlogCount = (userId) => {
    return blogs.filter(blog => blog.user && blog.user.id === userId).length
  }

  return (
    <div>
      <h2>Users</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{getUserBlogCount(user.id)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
