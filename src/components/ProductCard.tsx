import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  category: string;
}

const ProductCard = ({ name, price, category }: ProductCardProps) => {
  return (
    <div className="group relative p-6 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-blue-500/50 transition-all duration-300 shadow-2xl">
      {/* Espaço para Imagem */}
      <div className="h-48 w-full bg-gradient-to-tr from-gray-800 to-gray-700 rounded-2xl mb-4 flex items-center justify-center text-gray-500">
        [Imagem do Produto]
      </div>

      <span className="text-xs font-medium text-blue-400 uppercase tracking-widest">{category}</span>
      <h3 className="text-xl font-semibold mt-1 mb-2">{name}</h3>

      <div className="flex items-center justify-between mt-4">
        <span className="text-2xl font-bold">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}
        </span>
        <button className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-95">
          <ShoppingCart size={18} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
