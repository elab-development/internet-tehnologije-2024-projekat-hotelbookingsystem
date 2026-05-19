import { useState, useEffect } from 'react'
import Card from '../components/Card'
import { getHotels } from '../services/api'
import { getWeatherByCity } from '../services/weatherApi'
import { exportToCsv } from '../utils/csvExport'

function HotelsPage() {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [weatherData, setWeatherData] = useState({})
  const [weatherLoading, setWeatherLoading] = useState(null)
  const [weatherError, setWeatherError] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [exportMessage, setExportMessage] = useState('')
  const perPage = 2

  const filteredHotels = hotels.filter(hotel => {
    const search = searchTerm.toLowerCase()
    return (
      hotel.hotel_name?.toLowerCase().includes(search) ||
      hotel.city?.toLowerCase().includes(search) ||
      hotel.country?.toLowerCase().includes(search)
    )
  })

  const getHotelPhone = (hotel) => {
    return hotel.phone_number || hotel.phone || hotel.phoneNumber || ''
  }

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

  const handleExportHotels = () => {
    if (filteredHotels.length === 0) {
      setExportMessage('No hotels available for export.')
      return
    }

    const rows = filteredHotels.map(hotel => ({
      id: hotel.id,
      hotel_name: hotel.hotel_name,
      city: hotel.city,
      country: hotel.country,
      address: hotel.address,
      email: hotel.email,
      phone_number: getHotelPhone(hotel),
    }))

    setExportMessage('')
    exportToCsv('hotels.csv', rows)
  }

  return (
    <div>
      <h1 className="page-title">Hotels</h1>
      <p className="page-description">
        Browse hotels available in the Hotel Booking System.
      </p>

      <input
        className="form-input search-input"
        type="text"
        placeholder="Search hotels by name, city or country"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="export-controls">
        <button className="btn btn-secondary" onClick={handleExportHotels}>
          Export Hotels CSV
        </button>
        {exportMessage && (
          <p className="empty-state">{exportMessage}</p>
        )}
      </div>

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
          ) : filteredHotels.length === 0 ? (
            <div className="empty-state">No hotels match your search.</div>
          ) : (
            <div className="grid">
              {filteredHotels.map(hotel => (
                <Card key={hotel.id} title={hotel.hotel_name}>
                  <p><strong>Address:</strong> {hotel.address}</p>
                  <p><strong>City:</strong> {hotel.city}</p>
                  <p><strong>Country:</strong> {hotel.country}</p>
                  <p><strong>Email:</strong> {hotel.email}</p>
                  <p><strong>Phone:</strong> {getHotelPhone(hotel)}</p>
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