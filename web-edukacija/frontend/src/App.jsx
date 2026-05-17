import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import HomePage from './pages/HomePage.jsx'
import HotelsPage from './pages/HotelsPage.jsx'
import RoomsPage from './pages/RoomsPage.jsx'
import AuthPage from './pages/AuthPage.jsx'

function App() {
  return (
    <div className="App">
      <Header />
      <main className="container page">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
