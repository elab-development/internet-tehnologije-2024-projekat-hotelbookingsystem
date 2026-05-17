import { loginUser, logoutUser } from '../services/api'

export function useAuth() {
  const getToken = () => {
    return localStorage.getItem('token')
  }

  const getUser = () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }

  const isAuthenticated = () => {
    return !!getToken()
  }

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials)
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      return response
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      const token = getToken()
      if (token) {
        await logoutUser(token)
      }
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    } catch (error) {
      console.error('Logout error:', error)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      throw error
    }
  }

  return {
    getToken,
    getUser,
    isAuthenticated,
    login,
    logout,
  }
}
