import { Link, useLocation } from 'react-router-dom'

const pageLabels = {
  hotels: 'Hotels',
  rooms: 'Rooms',
  auth: 'Auth'
}

function Breadcrumbs() {
  const location = useLocation()
  const pathParts = location.pathname.split('/').filter(Boolean)

  if (pathParts.length === 0) {
    return <nav className="breadcrumbs">Home</nav>
  }

  return (
    <nav className="breadcrumbs">
      <Link to="/">Home</Link>
      {pathParts.map((part, index) => {
        const path = `/${pathParts.slice(0, index + 1).join('/')}`
        const label = pageLabels[part] || part
        const isLast = index === pathParts.length - 1

        return (
          <span key={path}>
            <span className="breadcrumb-separator">/</span>
            {isLast ? (
              <span>{label}</span>
            ) : (
              <Link to={path}>{label}</Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}

export default Breadcrumbs
