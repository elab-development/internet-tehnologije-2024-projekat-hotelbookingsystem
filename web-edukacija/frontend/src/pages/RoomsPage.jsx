import { useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'

const placeholderRooms = [
  {
    id: 1,
    room_number: '101',
    hotel_id: 1,
    room_type: 'Standard',
    floor_number: 1,
    status: 'available',
  },
  {
    id: 2,
    room_number: '204',
    hotel_id: 1,
    room_type: 'Deluxe',
    floor_number: 2,
    status: 'occupied',
  },
  {
    id: 3,
    room_number: '305',
    hotel_id: 2,
    room_type: 'Suite',
    floor_number: 3,
    status: 'maintenance',
  },
]

function RoomsPage() {
  const [filter, setFilter] = useState('available')

  const filteredRooms = placeholderRooms.filter(
    room => filter === 'all' || room.status === filter
  )

  return (
    <div>
      <h1 className="page-title">Rooms</h1>
      <p className="page-description">
        Browse rooms and filter them by status. API integration will be added in the next step.
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

      <div className="grid">
        {filteredRooms.map(room => (
          <Card key={room.id} title={`Room ${room.room_number}`}>
            <p><strong>Hotel ID:</strong> {room.hotel_id}</p>
            <p><strong>Room Type:</strong> {room.room_type}</p>
            <p><strong>Floor:</strong> {room.floor_number}</p>
            <p><strong>Status:</strong> {room.status}</p>
            <Button>Reserve Room</Button>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default RoomsPage