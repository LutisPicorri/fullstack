import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { BOOK_COUNT, AUTHOR_COUNT, ME } from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import AddBook from './components/AddBook'
import EditAuthor from './components/EditAuthor'
import Login from './components/Login'
import Recommendations from './components/Recommendations'

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const { data: bookCountData } = useQuery(BOOK_COUNT)
  const { data: authorCountData } = useQuery(AUTHOR_COUNT)
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('library-user-token')))
  
  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(Boolean(localStorage.getItem('library-user-token')))
    }
    
    // Check on mount
    checkLoginStatus()
    
    // Listen for storage changes
    window.addEventListener('storage', checkLoginStatus)
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('library-user-token')
    setIsLoggedIn(false)
    navigate('/login')
  }

  return (
    <div className="container">
      <nav className="navbar">
        <ul className="nav-list">
          <li>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          </li>
          <li>
            <Link to="/authors" className={`nav-link ${location.pathname === '/authors' ? 'active' : ''}`}>Authors</Link>
          </li>
          <li>
            <Link to="/books" className={`nav-link ${location.pathname === '/books' ? 'active' : ''}`}>Books</Link>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <Link to="/add-book" className={`nav-link ${location.pathname === '/add-book' ? 'active' : ''}`}>Add Book</Link>
              </li>
              <li>
                <Link to="/edit-author" className={`nav-link ${location.pathname === '/edit-author' ? 'active' : ''}`}>Edit Author</Link>
              </li>
              <li>
                <Link to="/recommendations" className={`nav-link ${location.pathname === '/recommendations' ? 'active' : ''}`}>Recommendations</Link>
              </li>
            </>
          )}
          {!isLoggedIn ? (
            <li>
              <Link to="/login" className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}>Login</Link>
            </li>
          ) : (
            <li>
              <button className="btn btn-secondary" onClick={logout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home bookCount={bookCountData?.bookCount} authorCount={authorCountData?.authorCount} />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-author" element={<EditAuthor />} />
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/recommendations" element={<Recommendations />} />
      </Routes>
    </div>
  )
}

function Home({ bookCount, authorCount }) {
  return (
    <div>
      <div className="card">
        <h1>📚 Library Management System</h1>
        <p>Welcome to the GraphQL-powered library management system!</p>
      </div>

      <div className="stats">
        <div className="stat-card">
          <div className="stat-number">{bookCount || 0}</div>
          <div className="stat-label">Total Books</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{authorCount || 0}</div>
          <div className="stat-label">Total Authors</div>
        </div>
      </div>

      <div className="card">
        <h2>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/books" className="btn">View All Books</Link>
          <Link to="/authors" className="btn">View All Authors</Link>
          <Link to="/add-book" className="btn btn-success">Add New Book</Link>
          <Link to="/edit-author" className="btn btn-secondary">Edit Author</Link>
        </div>
      </div>
    </div>
  )
}

export default App
