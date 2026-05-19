function AdminPage() {
  return (
    <div>
      <h1 className="page-title">Admin Panel</h1>
      <p className="page-description">
        Administrators can manage hotels, room types and rooms from this section.
      </p>

      <ul>
        <li>Manage hotels</li>
        <li>Manage room types</li>
        <li>Manage rooms</li>
      </ul>
    </div>
  )
}

export default AdminPage
