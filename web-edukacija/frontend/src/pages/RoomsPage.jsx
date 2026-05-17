import { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import FormInput from '../components/FormInput'
import { getRooms } from '../services/api'

function RoomsPage() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('available')
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [showReservationForm, setShowReservationForm] = useState(false)
  const [reservationMessage, setReservationMessage] = useState(null)
  const [reservationFormData, setReservationFormData] = useState({
    check_in_date: '',
    check_out_date: '',
    guest_count: '',
    notes: ''
  })

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

  const handleReserveRoom = (room) => {
    setSelectedRoom(room)
    setShowReservationForm(true)
    setReservationMessage(null)
    setReservationFormData({
      check_in_date: '',
      check_out_date: '',
      guest_count: '',
      notes: ''
    })
  }

  const handleSubmitReservation = (e) => {
    e.preventDefault()
    setReservationMessage('Reservation form prepared. Backend connection will be added in the next step.')
  }

  const handleCancelReservation = () => {
    setShowReservationForm(false)
    setSelectedRoom(null)
    setReservationFormData({
      check_in_date: '',
      check_out_date: '',
      guest_count: '',
      notes: ''
    })
    setReservationMessage(null)
  }

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
        filteredRooms.length === 0 ? (
          <div className="empty-state">No rooms found for the selected filter.</div>
        ) : (
          <div className="grid">
            {filteredRooms.map(room => (
              <Card key={room.id} title={`Room ${room.room_number}`}>
                <p><strong>Hotel ID:</strong> {room.hotel_id}</p>
                <p><strong>Room Type:</strong> {room.room_type_id}</p>
                <p><strong>Floor:</strong> {room.floor_number}</p>
                <p><strong>Status:</strong> {room.status}</p>
                <Button onClick={() => handleReserveRoom(room)}>Reserve Room</Button>
              </Card>
            ))}
          </div>
        )
      )}

      {showReservationForm && selectedRoom && (
        <div style={{ marginTop: '2rem' }}>
          <Card title="Make Reservation">
            <form onSubmit={handleSubmitReservation}>
              <FormInput
                label="Room Number"
                type="text"
                value={selectedRoom.room_number}
                readOnly
              />
              <FormInput
                label="Check-in Date"
                type="date"
                value={reservationFormData.check_in_date}
                onChange={(e) => setReservationFormData({...reservationFormData, check_in_date: e.target.value})}
                required
              />
              <FormInput
                label="Check-out Date"
                type="date"
                value={reservationFormData.check_out_date}
                onChange={(e) => setReservationFormData({...reservationFormData, check_out_date: e.target.value})}
                required
              />
              <FormInput
                label="Guest Count"
                type="number"
                value={reservationFormData.guest_count}
                onChange={(e) => setReservationFormData({...reservationFormData, guest_count: e.target.value})}
                placeholder="Number of guests"
                min="1"
                required
              />
              <FormInput
                label="Notes"
                type="text"
                value={reservationFormData.notes}
                onChange={(e) => setReservationFormData({...reservationFormData, notes: e.target.value})}
                placeholder="Any special requests"
              />
              
              {reservationMessage && (
                <div className="error" style={{ backgroundColor: '#d4edda', borderColor: '#c3e6cb', color: '#155724' }}>
                  {reservationMessage}
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem' }}>
                <Button type="submit">Submit Reservation</Button>
                <Button 
                  type="button" 
                  className="btn-secondary"
                  onClick={handleCancelReservation}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}

export default RoomsPage