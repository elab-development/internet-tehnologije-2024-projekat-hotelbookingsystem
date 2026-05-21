import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { isAuthenticated, userRole } = useAuth()

  if (!isAuthenticated()) {
    return <Navigate to="/auth" replace />
  }

  if (!allowedRoles.includes(userRole())) {
    return (
      <div className="access-denied">
        Access denied. You do not have permission to view this page.
      </div>
    )
  }

  return children
}

export default ProtectedRoute
