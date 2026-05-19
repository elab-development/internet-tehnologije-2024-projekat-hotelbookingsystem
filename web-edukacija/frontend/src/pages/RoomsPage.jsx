import { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import FormInput from '../components/FormInput'
import { getRooms } from '../services/api'
import { exportToCsv } from '../utils/csvExport'

function RoomsPage() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('available')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOption, setSortOption] = useState('room_asc')
  const [exportMessage, setExportMessage] = useState('')
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

  const filteredRooms = [...rooms]
    .filter(room => filter === 'all' || room.status === filter)
    .filter(room =>
      String(room.room_number).toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'room_desc') {
        return String(b.room_number).localeCompare(String(a.room_number))
      }

      if (sortOption === 'status_az') {
        return String(a.status).localeCompare(String(b.status))
      }

      return String(a.room_number).localeCompare(String(b.room_number))
    })

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

  const handleExportRooms = () => {
    if (filteredRooms.length === 0) {
      setExportMessage('No rooms available for export.')
      return
    }

    const rows = filteredRooms.map(room => ({
      id: room.id,
      room_number: room.room_number,
      hotel_id: room.hotel_id,
      room_type_id: room.room_type_id,
      floor_number: room.floor_number,
      status: room.status,
    }))

    setExportMessage('')
    exportToCsv('rooms.csv', rows)
  }

  return (
    <div>
      <h1 className="page-title">Rooms</h1>
      <p className="page-description">
        Browse rooms and filter them by status.
      </p>

      <div className="room-controls">
        <input
          className="form-input"
          type="text"
          placeholder="Search by room number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="form-input"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="room_asc">Room Number Ascending</option>
          <option value="room_desc">Room Number Descending</option>
          <option value="status_az">Status A-Z</option>
        </select>
      </div>

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

      <div className="export-controls">
        <button className="btn btn-secondary" onClick={handleExportRooms}>
          Export Rooms CSV
        </button>
        {exportMessage && (
          <p className="empty-state">{exportMessage}</p>
        )}
      </div>

      {loading && (
        <div className="loading">Loading rooms...</div>
      )}

      {error && (
        <div className="error">{error}</div>
      )}

      {!loading && !error && (
        filteredRooms.length === 0 ? (
          <div className="empty-state">No rooms match your filters.</div>
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