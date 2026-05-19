import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

function Header() {
  const { isAuthenticated, getUser, userRole, isAdmin, isManager, isUser, logout } = useAuth()
  const navigate = useNavigate()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const user = getUser()

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
      navigate('/auth')
    } catch (error) {
      console.error('Logout error:', error)
      navigate('/auth')
    } finally {
      setIsLoggingOut(false)
    }
  }

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
        
        {!isAuthenticated() ? (
          <li>
            <Link to="/auth" className="nav-link">Login/Register</Link>
          </li>
        ) : (
          <>
            {isAdmin() && (
              <li>
                <a href="#" className="nav-link">Admin Panel</a>
              </li>
            )}
            {isManager() && (
              <li>
                <a href="#" className="nav-link">Manager Panel</a>
              </li>
            )}
            {isUser() && (
              <li>
                <a href="#" className="nav-link">My Reservations</a>
              </li>
            )}
            <li>
              <span className="nav-link" style={{ cursor: 'default' }}>
                {user?.email || user?.name || 'User'}
              </span>
            </li>
            <li>
              <span className="nav-link" style={{ cursor: 'default' }}>
                Role: {userRole()}
              </span>
            </li>
            <li>
              <button 
                className="nav-link" 
                onClick={handleLogout}
                disabled={isLoggingOut}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: isLoggingOut ? 'not-allowed' : 'pointer',
                  opacity: isLoggingOut ? 0.6 : 1
                }}
              >
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Header
