import { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { getRooms } from '../services/api'

function RoomsPage() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('available')

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getRooms()
        setRooms(data)
      } catch (err) {
        setError('Failed to load rooms. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [])

  const filteredRooms = rooms.filter(
    room => filter === 'all' || room.status === filter
  )

  return (
    <div>
      <h1 className="page-title">Rooms</h1>
      <p className="page-description">
        Browse rooms and filter them by status.
      </p>

      <div className="form-group">
        <label className="form-label">Filter by Status:</label>
        <select
          className="form-input"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Rooms</option>
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
          <option value="maintenance">Maintenance</option>
          <option value="cleaning">Cleaning</option>
        </select>
      </div>

      {loading && (
        <div className="loading">Loading rooms...</div>
      )}

      {error && (
        <div className="error">{error}</div>
      )}

      {!loading && !error && (
        <div className="grid">
          {filteredRooms.map(room => (
            <Card key={room.id} title={`Room ${room.room_number}`}>
              <p><strong>Hotel ID:</strong> {room.hotel_id}</p>
              <p><strong>Room Type:</strong> {room.room_type_id}</p>
              <p><strong>Floor:</strong> {room.floor_number}</p>
              <p><strong>Status:</strong> {room.status}</p>
              <Button>Reserve Room</Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default RoomsPage