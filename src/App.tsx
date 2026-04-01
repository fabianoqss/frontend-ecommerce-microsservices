import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ProductCatalog from './pages/ProductCatalog'
import HomePage from './pages/HomePage'
import ProductDetails from './pages/ProductDetails'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/ProductCatalog" element={<ProductCatalog />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/ProductDetails" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
