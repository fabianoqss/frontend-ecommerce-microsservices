import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ProductCatalog from './pages/ProductCatalog'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/ProductCatalog" element={<ProductCatalog />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
