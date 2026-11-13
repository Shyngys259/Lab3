import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Register() {
  const navigate = useNavigate()
  const { completeAuth } = useAuth()
  const [form, setForm] = useState({
    fullName: '', email: '', birthday: '', password: '', confirmPassword: '', dailyGoal: '', consent: false
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function update(event) {
    const { name, value, type, checked } = event.target
    setForm(current => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  async function submit(event) {
    event.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) return setError('Passwords do not match.')
    if (form.password.length < 8 || !/[a-z]/.test(form.password) || !/[A-Z]/.test(form.password) || !/\d/.test(form.password)) {
      return setError('Use at least 8 characters, including uppercase, lowercase and a number.')
    }
    if (!form.consent) return setError('Please accept the terms and privacy notice.')
    setLoading(true)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          birthday: form.birthday,
          password: form.password,
          dailyGoal: form.dailyGoal
        })
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Registration failed.')
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
        <h1>Create your account</h1>
        <p className="auth-intro">Join us and build healthier digital habits.</p>
        <form onSubmit={submit}>
          <div className="auth-field">
            <label htmlFor="register-name">Full name</label>
            <input id="register-name" name="fullName" value={form.fullName} onChange={update} autoComplete="name" required />
          </div>
          <div className="auth-field">
            <label htmlFor="register-email">Email</label>
            <input id="register-email" name="email" type="email" value={form.email} onChange={update} autoComplete="email" required />
          </div>
          <div className="auth-field">
            <label htmlFor="register-birthday">Birthday</label>
            <input id="register-birthday" name="birthday" type="date" value={form.birthday} onChange={update} />
          </div>
          <div className="auth-field">
            <label htmlFor="register-password">Password</label>
            <input id="register-password" name="password" type="password" value={form.password} onChange={update} autoComplete="new-password" minLength="8" required />
            <small className="auth-hint">At least 8 characters, uppercase, lowercase and a number.</small>
          </div>
          <div className="auth-field">
            <label htmlFor="register-confirm">Confirm password</label>
            <input id="register-confirm" name="confirmPassword" type="password" value={form.confirmPassword} onChange={update} autoComplete="new-password" required />
          </div>
          <div className="auth-field">
            <label htmlFor="register-goal">Daily screen-time goal</label>
            <select id="register-goal" name="dailyGoal" value={form.dailyGoal} onChange={update}>
              <option value="">Choose a goal (optional)</option>
              <option>Under 2 hours</option>
              <option>2–4 hours</option>
              <option>4–6 hours</option>
              <option>More than 6 hours</option>
            </select>
          </div>
          <label className="consent-row">
            <input name="consent" type="checkbox" checked={form.consent} onChange={update} />
            <span>I agree to the terms and privacy notice.</span>
          </label>
          {error && <div className="auth-message failure" role="alert">{error}</div>}
          <button className="auth-submit" type="submit" disabled={loading}>{loading ? 'Creating account...' : 'Create account'}</button>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
      </section>
    </main>
  )
}

export default Register
