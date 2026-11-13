import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Header() {
  const { user, logout, checking } = useAuth()

  return (
    <header>
      <div className="wrap nav">
        <Link className="brand" to="/">
          <span className="dot"></span>
          Digital Well-being
        </Link>

        <nav>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/#topics">Topics</NavLink></li>
            <li><NavLink to="/screen-time">Screen Time</NavLink></li>
            <li><NavLink to="/sleep">Sleep</NavLink></li>
            <li><NavLink to="/social-media">Social Media</NavLink></li>
            <li><NavLink to="/focus">Focus</NavLink></li>
            <li><NavLink to="/habits">Habits</NavLink></li>
            <li><NavLink to="/coach">AI Coach</NavLink></li>
            {!checking && !user && <>
              <li><NavLink to="/login">Login</NavLink></li>
              <li><NavLink to="/register">Register</NavLink></li>
            </>}
            {!checking && user && <>
              <li><span className="nav-user">Hi, {user.fullName}</span></li>
              <li><button className="nav-logout" type="button" onClick={logout}>Log out</button></li>
            </>}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
