function ManagerPage() {
  return (
    <div>
      <h1 className="page-title">Manager Panel</h1>
      <p className="page-description">
        Managers can monitor reservations and room statuses from this section.
      </p>

      <ul>
        <li>View reservations</li>
        <li>Monitor room availability</li>
        <li>Update reservation status</li>
        <li>Check room status</li>
      </ul>
    </div>
  )
}

export default ManagerPage
