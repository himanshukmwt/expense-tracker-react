import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Budget from './pages/Budget'
import MobileNavbar from './Components/MobileNavbar'

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-[#0f172a]">
        
        <Sidebar />
        <MobileNavbar />

        <main className="flex-1 p-4 md:p-6 text-white pt-20 md:pt-6 md:ml-56">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/budget" element={<Budget />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  )
}

export default App