
import { Link, NavLink } from 'react-router-dom'

function Header() {
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
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
