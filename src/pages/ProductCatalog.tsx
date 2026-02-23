import { ShoppingCart, Search, User } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const ProductCatalog = () => {
  const products = [
    { id: '1', name: 'MacBook Pro', price: 12500.00, category: 'Eletrônicos' },
    { id: '2', name: 'iPhone 15', price: 7200.00, category: 'Mobile' },
    { id: '3', name: 'Monitor Gamer', price: 2100.00, category: 'Periféricos' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white p-8">

      {/* Navbar Glassmorphism */}
      <nav className="flex items-center justify-between p-6 mb-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
        <h1 className="text-2xl font-bold tracking-tight">TechStore <span className="text-blue-400">Micro</span></h1>

        <div className="flex gap-6 items-center">
          <button className="hover:text-blue-400 transition-colors"><Search size={20} /></button>
          <button className="hover:text-blue-400 transition-colors"><User size={20} /></button>
          <div className="relative">
            <ShoppingCart size={20} className="hover:text-blue-400 cursor-pointer" />
            <span className="absolute -top-2 -right-2 bg-blue-500 text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
          </div>
        </div>
      </nav>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            category={product.category}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;