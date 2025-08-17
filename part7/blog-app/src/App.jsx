import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { initializeBlogs } from './store/blogsSlice'
import { setNotification } from './store/notificationSlice'
import Navigation from './components/Navigation'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import BlogView from './components/BlogView'
import Users from './components/Users'
import User from './components/User'
import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(setNotification(null))
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification, dispatch])

  if (user === null) {
    return (
      <div className="container">
        <h1>Blogs</h1>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div className="container">
      <Navigation />
      <h1>Blogs</h1>
      <Notification />
      
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogView />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
      
      <BlogForm />
    </div>
  )
}

export default App
