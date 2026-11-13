import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { completeAuth } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Login failed.')
      completeAuth(data)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Could not connect to the server. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-main">
      <section className="auth-card">
        <h1>Welcome back</h1>
        <p className="auth-intro">Log in to continue your digital well-being journey.</p>
        <form onSubmit={submit}>
          <div className="auth-field">
            <label htmlFor="login-email">Email</label>
            <input id="login-email" type="email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="email" required />
          </div>
          <div className="auth-field">
            <label htmlFor="login-password">Password</label>
            <input id="login-password" type="password" value={password} onChange={event => setPassword(event.target.value)} autoComplete="current-password" required />
          </div>
          {error && <div className="auth-message failure" role="alert">{error}</div>}
          <button className="auth-submit" type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Log in'}</button>
        </form>
        <p className="auth-switch">Don't have an account? <Link to="/register">Create one</Link></p>
      </section>
    </main>
  )
}

export default Login
