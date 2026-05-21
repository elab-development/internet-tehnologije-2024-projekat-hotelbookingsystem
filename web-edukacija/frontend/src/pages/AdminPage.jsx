import { useEffect, useState } from 'react'
import Card from '../components/Card'
import { getHotels } from '../services/api'

function AdminPage() {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getHotels()
        setHotels(response.data || [])
      } catch (err) {
        setError('Could not load hotels.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchHotels()
  }, [])

  return (
    <div>
      <h1 className="page-title">Admin Panel</h1>
      <p className="page-description">
        Administrators can manage hotels, room types and rooms from this section.
      </p>

      <ul>
        <li>Manage hotels</li>
        <li>Manage room types</li>
        <li>Manage rooms</li>
      </ul>

      <h2>Hotels Overview</h2>

      {loading && (
        <div className="loading">Loading hotels...</div>
      )}

      {error && (
        <div className="error">{error}</div>
      )}

      {!loading && !error && (
        <div className="grid">
          {hotels.map(hotel => (
            <Card key={hotel.id} title={hotel.hotel_name}>
              <p><strong>City:</strong> {hotel.city}</p>
              <p><strong>Country:</strong> {hotel.country}</p>
              <p><strong>Email:</strong> {hotel.email}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminPage
