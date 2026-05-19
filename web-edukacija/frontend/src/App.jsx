import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Breadcrumbs from './components/Breadcrumbs.jsx'
import HomePage from './pages/HomePage.jsx'
import HotelsPage from './pages/HotelsPage.jsx'
import RoomsPage from './pages/RoomsPage.jsx'
import AuthPage from './pages/AuthPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import ManagerPage from './pages/ManagerPage.jsx'

function App() {
  return (
    <div className="App">
      <Header />
      <main className="container page">
        <Breadcrumbs />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/manager" element={<ManagerPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
