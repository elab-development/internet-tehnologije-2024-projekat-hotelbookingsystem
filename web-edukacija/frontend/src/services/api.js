const API_BASE_URL = 'http://127.0.0.1:8000/api'

export async function getHotels(page = 1, perPage = 10) {
  try {
    const response = await fetch(`${API_BASE_URL}/hotels?page=${page}&per_page=${perPage}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
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

export async function registerUser(userData) {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed')
    }
    return data
  } catch (error) {
    console.error('Error registering user:', error)
    throw error
  }
}

export async function loginUser(credentials) {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'Login failed')
    }
    return data
  } catch (error) {
    console.error('Error logging in:', error)
    throw error
  }
}

export async function logoutUser(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error logging out:', error)
    throw error
  }
}
