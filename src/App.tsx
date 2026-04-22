import { Routes, Route, Navigate } from 'react-router-dom'
import Domains from './pages/Domains/Domains'
import DomainSearch from './pages/DomainSearch/DomainSearch'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Domains />} />
      <Route path="/domains" element={<Navigate to="/" replace />} />
      <Route path="/domain-search" element={<DomainSearch />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App
