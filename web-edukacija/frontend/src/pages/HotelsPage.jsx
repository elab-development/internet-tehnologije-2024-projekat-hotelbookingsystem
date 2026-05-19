import { useState, useEffect } from 'react'
import Card from '../components/Card'
import { getHotels } from '../services/api'
import { getWeatherByCity } from '../services/weatherApi'

function HotelsPage() {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [weatherData, setWeatherData] = useState({})
  const [weatherLoading, setWeatherLoading] = useState(null)
  const [weatherError, setWeatherError] = useState({})
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

  const handleShowWeather = async (hotel) => {
    try {
      setWeatherLoading(hotel.id)
      setWeatherError({ ...weatherError, [hotel.id]: null })
      const data = await getWeatherByCity(hotel.city)
      setWeatherData({ ...weatherData, [hotel.id]: data })
    } catch (err) {
      setWeatherError({ ...weatherError, [hotel.id]: 'Weather data unavailable.' })
      console.error(err)
    } finally {
      setWeatherLoading(null)
    }
  }

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
                  <button className="btn" onClick={() => handleShowWeather(hotel)}>
                    Show Weather
                  </button>
                  {weatherLoading === hotel.id && (
                    <p className="weather-info">Loading weather...</p>
                  )}
                  {weatherError[hotel.id] && (
                    <p className="weather-info">{weatherError[hotel.id]}</p>
                  )}
                  {weatherData[hotel.id] && (
                    <div className="weather-info">
                      <p><strong>Weather in:</strong> {weatherData[hotel.id].city}, {weatherData[hotel.id].country}</p>
                      <p><strong>Temperature:</strong> {weatherData[hotel.id].temperature}°C</p>
                      <p><strong>Wind speed:</strong> {weatherData[hotel.id].windspeed} km/h</p>
                    </div>
                  )}
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