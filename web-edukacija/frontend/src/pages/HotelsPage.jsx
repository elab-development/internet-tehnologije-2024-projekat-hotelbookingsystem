import { useState, useEffect } from 'react'
import Card from '../components/Card'
import { getHotels } from '../services/api'

function HotelsPage() {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const perPage = 2

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getHotels(currentPage, perPage)
        setHotels(response.data || [])
        setLastPage(response.last_page || 1)
      } catch (err) {
        setError('Failed to load hotels. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchHotels()
  }, [currentPage])

  return (
    <div>
      <h1 className="page-title">Hotels</h1>
      <p className="page-description">
        Browse hotels available in the Hotel Booking System.
      </p>

      {loading && (
        <div className="loading">Loading hotels...</div>
      )}

      {error && (
        <div className="error">{error}</div>
      )}

      {!loading && !error && (
        <>
          {hotels.length === 0 ? (
            <div className="empty-state">No hotels found.</div>
          ) : (
            <div className="grid">
              {hotels.map(hotel => (
                <Card key={hotel.id} title={hotel.hotel_name}>
                  <p><strong>Address:</strong> {hotel.address}</p>
                  <p><strong>City:</strong> {hotel.city}</p>
                  <p><strong>Country:</strong> {hotel.country}</p>
                  <p><strong>Email:</strong> {hotel.email}</p>
                  <p><strong>Phone:</strong> {hotel.phone_number}</p>
                </Card>
              ))}
            </div>
          )}

          <div className="pagination">
            <button
              className="btn btn-secondary"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage} of {lastPage}</span>
            <button
              className="btn"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === lastPage}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default HotelsPage