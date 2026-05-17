import { Link } from 'react-router-dom'

function Header() {
  return (
    <nav className="nav">
      <Link to="/" className="nav-brand">
        Hotel Booking
      </Link>
      
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/hotels" className="nav-link">Hotels</Link>
        </li>
        <li>
          <Link to="/rooms" className="nav-link">Rooms</Link>
        </li>
        <li>
          <Link to="/auth" className="nav-link">Login/Register</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Header
