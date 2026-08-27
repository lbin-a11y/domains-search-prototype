import { Routes, Route, Navigate } from 'react-router-dom'
import Domains from './pages/Domains/Domains'
import DomainSearch from './pages/DomainSearch/DomainSearch'
import Dashboard from './pages/Dashboard/Dashboard'
import Cart from './pages/Cart/Cart'
import AccountDashboard from './dashboard/pages/AccountDashboard'
import DomainsList from './dashboard/pages/DomainsList'
import DomainHome from './dashboard/pages/DomainHome'
import WebsiteHome from './dashboard/pages/WebsiteHome'
import DevPanel from './prototype/DevPanel'

function App() {
  return (
    <>
      <Routes>
        {/* Logged-in account surfaces */}
        <Route path="/" element={<AccountDashboard />} />
        <Route path="/domains" element={<DomainsList />} />
        <Route path="/domains/:domainName" element={<DomainHome />} />
        <Route path="/domains/:domainName/*" element={<DomainHome />} />
        <Route path="/websites/:identifier" element={<WebsiteHome />} />
        <Route path="/websites/:identifier/*" element={<WebsiteHome />} />

        {/* Pre-existing unauthenticated domain search flow */}
        <Route path="/buy" element={<Domains />} />
        <Route path="/domain-search" element={<DomainSearch />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <DevPanel />
    </>
  )
}

export default App
