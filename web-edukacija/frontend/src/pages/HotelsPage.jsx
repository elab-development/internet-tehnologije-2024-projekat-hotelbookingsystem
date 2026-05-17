import Card from '../components/Card'

function HotelsPage() {
  return (
    <div>
      <h1 className="page-title">Hotels</h1>
      <p className="page-description">
        Browse hotels available in the Hotel Booking System. API integration will be added in the next step.
      </p>

      <div className="grid">
        <Card title="Grand Plaza Hotel">
          <p><strong>Address:</strong> 123 Main Street</p>
          <p><strong>City:</strong> New York</p>
          <p><strong>Country:</strong> United States</p>
          <p><strong>Email:</strong> info@grandplaza.com</p>
          <p><strong>Phone:</strong> +1-555-0101</p>
        </Card>

        <Card title="Seaside Resort & Spa">
          <p><strong>Address:</strong> 45 Beach Road</p>
          <p><strong>City:</strong> Split</p>
          <p><strong>Country:</strong> Croatia</p>
          <p><strong>Email:</strong> info@seaside.com</p>
          <p><strong>Phone:</strong> +385-555-0202</p>
        </Card>

        <Card title="Mountain View Lodge">
          <p><strong>Address:</strong> 12 Mountain Street</p>
          <p><strong>City:</strong> Kopaonik</p>
          <p><strong>Country:</strong> Serbia</p>
          <p><strong>Email:</strong> info@mountainview.com</p>
          <p><strong>Phone:</strong> +381-555-0303</p>
        </Card>
      </div>
    </div>
  )
}

export default HotelsPage