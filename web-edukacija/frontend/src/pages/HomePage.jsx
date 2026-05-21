import { Link } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'

function HomePage() {
  return (
    <div>
      <h1 className="page-title">Welcome to Hotel Booking System</h1>
      <p>Find and book your perfect hotel room for your next stay.</p>
      
      <div className="grid">
        <Card title="Browse Hotels">
          <p>Explore our collection of hotels worldwide.</p>
          <Link to="/hotels">
            <Button>View Hotels</Button>
          </Link>
        </Card>
        
        <Card title="Available Rooms">
          <p>Check room availability and make reservations.</p>
          <Link to="/rooms">
            <Button>Browse Rooms</Button>
          </Link>
        </Card>
        
        <Card title="Get Started">
          <p>Create an account to manage your bookings.</p>
          <Link to="/auth">
            <Button>Sign Up / Login</Button>
          </Link>
        </Card>
      </div>
    </div>
  )
}

export default HomePage
