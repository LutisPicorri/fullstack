import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN, ME } from '../queries'
import { useNavigate } from 'react-router-dom'

function Login({ onLogin }) {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const [login] = useMutation(LOGIN, {
    refetchQueries: [{ query: ME }],
    onCompleted: ({ login }) => {
      localStorage.setItem('library-user-token', login.value)
      setMessage('Logged in successfully')
      onLogin?.()
      setTimeout(() => setMessage(''), 1500)
      navigate('/')
    },
    onError: (error) => {
      setMessage(error.message)
      setTimeout(() => setMessage(''), 4000)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ variables: { username, password } })
  }

  return (
    <div>
      <div className="card">
        <h2>🔐 Login</h2>
        <p>Use your credentials to log in.</p>
      </div>

      {message && <div className={message.includes('success') ? 'success' : 'error'}>{message}</div>}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input className="form-input" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="btn" type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
