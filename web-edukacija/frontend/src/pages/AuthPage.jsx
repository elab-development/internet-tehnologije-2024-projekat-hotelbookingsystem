import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import FormInput from '../components/FormInput'
import { registerUser } from '../services/api'
import { useAuth } from '../hooks/useAuth'

function AuthPage() {
  const [activeTab, setActiveTab] = useState('login')
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    password_confirmation: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      await registerUser(formData)
      setSuccess('Registration successful! Please login.')
      setActiveTab('login')
      setFormData({
        name: '',
        surname: '',
        email: formData.email,
        password: '',
        password_confirmation: ''
      })
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await login({
        email: formData.email,
        password: formData.password
      })
      setSuccess('Login successful!')
      setTimeout(() => {
        navigate('/')
      }, 500)
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="page-title">Authentication</h1>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          Login
        </button>
        <button 
          className={`tab ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          Register
        </button>
      </div>

      {success && (
        <div className="error" style={{ backgroundColor: '#d4edda', borderColor: '#c3e6cb', color: '#155724' }}>
          {success}
        </div>
      )}

      {error && (
        <div className="error">{error}</div>
      )}

      {activeTab === 'login' && (
        <Card title="Login">
          <form onSubmit={handleLogin}>
            <FormInput
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Enter your email"
              required
            />
            <FormInput
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Enter your password"
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Card>
      )}

      {activeTab === 'register' && (
        <Card title="Register">
          <form onSubmit={handleRegister}>
            <FormInput
              label="Name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter your name"
              required
            />
            <FormInput
              label="Surname"
              type="text"
              value={formData.surname}
              onChange={(e) => setFormData({...formData, surname: e.target.value})}
              placeholder="Enter your surname"
              required
            />
            <FormInput
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Enter your email"
              required
            />
            <FormInput
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Enter your password (min 8 characters)"
              required
            />
            <FormInput
              label="Confirm Password"
              type="password"
              value={formData.password_confirmation}
              onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
              placeholder="Confirm your password"
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </Card>
      )}
    </div>
  )
}

export default AuthPage
