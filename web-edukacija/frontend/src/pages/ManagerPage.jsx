import { useEffect, useState } from 'react'
import Card from '../components/Card'

function ManagerPage() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('http://127.0.0.1:8000/api/reservations')
        const data = await response.json()
        setReservations(data.data || data || [])
      } catch (err) {
        setError('Could not load reservations.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchReservations()
  }, [])

  return (
    <div>
      <h1 className="page-title">Manager Panel</h1>
      <p className="page-description">
        Managers can monitor reservations and room statuses from this section.
      </p>

      <ul>
        <li>View reservations</li>
        <li>Monitor room availability</li>
        <li>Update reservation status</li>
        <li>Check room status</li>
      </ul>

      <h2>Reservations Overview</h2>

      {loading && (
        <div className="loading">Loading reservations...</div>
      )}

      {error && (
        <div className="error">{error}</div>
      )}

      {!loading && !error && (
        <div className="grid">
          {reservations.map(reservation => (
            <Card
              key={reservation.id}
              title={reservation.reservation_code || `Reservation #${reservation.id}`}
            >
              <p><strong>Status:</strong> {reservation.reservation_status}</p>
              <p><strong>Check in:</strong> {reservation.check_in_date}</p>
              <p><strong>Check out:</strong> {reservation.check_out_date}</p>
              <p><strong>Guest count:</strong> {reservation.guest_count}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default ManagerPage
