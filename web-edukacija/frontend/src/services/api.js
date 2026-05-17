const API_BASE_URL = 'http://127.0.0.1:8000/api'

export async function getHotels() {
  try {
    const response = await fetch(`${API_BASE_URL}/hotels`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data.data || data
  } catch (error) {
    console.error('Error fetching hotels:', error)
    throw error
  }
}

export async function getRooms() {
  try {
    const response = await fetch(`${API_BASE_URL}/rooms`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data.data || data
  } catch (error) {
    console.error('Error fetching rooms:', error)
    throw error
  }
}
