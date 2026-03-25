import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ProductCatalog from './pages/ProductCatalog'
import HomePage from './pages/HomePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/ProductCatalog" element={<ProductCatalog />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
