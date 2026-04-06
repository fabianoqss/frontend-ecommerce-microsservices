import { Search, ChevronDown, ChevronLeft, ChevronRight, ShoppingCart, Plus } from 'lucide-react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

interface Product {
  id: number
  title: string
  price: number
  thumbnail: string
  category: string
}

interface CardProdutoProps {
  name?: string
  price?: string
  cents?: string
  image?: string
  onClick?: () => void
  onAddToCart?: (e: React.MouseEvent) => void
}

const CardProduto = ({
  name = 'Computador Desktop - Intel Core i7',
  price = '2.779',
  cents = ',00',
  image,
  onClick,
  onAddToCart,
}: CardProdutoProps) => (
  <div
    className="bg-white rounded-[10px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] w-[247px] flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    aria-label={`Ver detalhes de ${name}`}
  >
    {/* Product image */}
    <div className="flex items-center justify-center h-[185px] px-4 pt-4">
      <img src={image} alt={name} className="h-full object-contain" />
    </div>

    {/* Divider */}
    <div className="border-t border-[#e1e1e1] mx-0" />

    {/* Info */}
    <div className="px-[21px] py-4 flex flex-col gap-1">
      <p className="text-[#263238] text-[18px] font-bold tracking-[-0.27px] leading-snug">
        {name}
      </p>
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-baseline gap-1">
          <span className="text-[#9e9e9e] text-[18px] tracking-[-0.27px]">R$</span>
          <span className="text-[#407bff] text-[32px] font-bold tracking-[-0.48px] leading-none">{price}</span>
          <span className="text-[#407bff] text-[18px] font-bold tracking-[-0.27px]">{cents}</span>
        </div>
        <button
          onClick={onAddToCart}
          className="flex items-center justify-center size-[36px] rounded-full bg-[#407bff] text-white hover:bg-[#2563eb] transition-colors flex-shrink-0"
          aria-label={`Adicionar ${name} ao carrinho`}
        >
          <Plus size={20} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  </div>
)

const PAGES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '...', 35]



const ProductCatalog = () => {
  const navigate = useNavigate()
  const [dados, setDados] = useState<Product[]>([]);
  const { addItem, totalItems } = useCartStore()

  useEffect(() => {
    async function carregar() {
      const categories = ['laptops', 'smartphones', 'tablets', 'mobile-accessories']
      const responses = await Promise.all(
        categories.map((cat) => axios.get(`https://dummyjson.com/products/category/${cat}?limit=20`))
      )
      const allProducts = responses.flatMap((res) => res.data.products)
      setDados(allProducts)
    }

    carregar();
  }, []);

  return (

    
    <div
      className="min-h-screen bg-[#f2f2f2] text-[#263238]"
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      {/* Navbar */}
      <nav className="bg-[#407bff] h-[70px] flex-shrink-0 flex items-center px-10">
        <span className="text-white font-bold text-2xl tracking-[-0.36px]">DS Catalog</span>
        <div className="ml-auto flex items-center gap-10 text-[18px] tracking-[-0.27px]">
          <Link to="/home" className="text-white/50 font-semibold hover:text-white transition-colors">HOME</Link>
          <Link to="/ProductCatalog" className="text-white font-bold">CATÁLOGO</Link>
          <Link to="/admin/products" className="text-white/50 font-semibold hover:text-white transition-colors">ADMIN</Link>
          <button onClick={() => navigate('/cart')} className="relative text-white hover:text-white/80 transition-colors" aria-label="Carrinho de compras">
            <ShoppingCart size={24} />
            {totalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[11px] font-bold size-[18px] rounded-full flex items-center justify-center leading-none">
                {totalItems() > 99 ? '99+' : totalItems()}
              </span>
            )}
          </button>
        </div>
      </nav>

      <main className="px-[179px] py-[22px] flex flex-col gap-6">

        {/* Search bar */}
        <div className="bg-white rounded-[10px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] h-[60px] flex items-center px-4">
          {/* Nome do produto */}
          <div className="flex items-center gap-2 flex-1 px-2">
            <input
              type="text"
              placeholder="Nome do produto"
              className="flex-1 text-[18px] text-[#9e9e9e] tracking-[-0.27px] outline-none bg-transparent placeholder:text-[#9e9e9e]"
              aria-label="Buscar por nome do produto"
            />
            <Search size={20} className="text-[#9e9e9e] flex-shrink-0" />
          </div>

          {/* Divider */}
          <div className="w-px h-[36px] bg-[#e1e1e1] mx-2" />

          {/* Categoria */}
          <div className="flex items-center gap-2 px-2 cursor-pointer">
            <span className="text-[18px] text-[#9e9e9e] tracking-[-0.27px]">Categoria</span>
            <ChevronDown size={16} className="text-[#9e9e9e]" />
          </div>

          {/* Divider */}
          <div className="w-px h-[36px] bg-[#e1e1e1] mx-2" />

          {/* Limpar filtro */}
          <button
            className="text-[14px] font-bold text-[#9e9e9e] tracking-[-0.21px] border border-[#e1e1e1] rounded-[6px] px-4 h-[38px] hover:text-[#407bff] hover:border-[#407bff] transition-colors"
            aria-label="Limpar filtro"
          >
            LIMPAR FILTRO
          </button>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-4 gap-[30px]">
          {dados.map((product) => {
            const [intPart, decPart] = product.price.toFixed(2).split('.')
            return (
              <CardProduto
                key={product.id}
                name={product.title}
                price={intPart}
                cents={`,${decPart}`}
                image={product.thumbnail}
                onClick={() => navigate(`/ProductDetails/${product.id}`)}
                onAddToCart={(e) => {
                  e.stopPropagation()
                  addItem({ id: product.id, title: product.title, price: product.price, thumbnail: product.thumbnail })
                }}
              />
            )
          })}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 py-4">
          <button className="flex items-center justify-center size-[40px] rounded-full text-white bg-[#9e9e9e] hover:bg-[#407bff] transition-colors" aria-label="Página anterior">
            <ChevronLeft size={18} />
          </button>

          {PAGES.map((page, i) => (
            <button
              key={i}
              className={`flex items-center justify-center size-[40px] rounded-full text-white text-[18px] font-bold tracking-[-0.27px] transition-colors ${
                page === 1 ? 'bg-[#407bff]' : 'bg-[#9e9e9e] hover:bg-[#407bff]'
              }`}
              aria-label={`Página ${page}`}
            >
              {page}
            </button>
          ))}

          <button className="flex items-center justify-center size-[40px] rounded-full text-white bg-[#9e9e9e] hover:bg-[#407bff] transition-colors" aria-label="Próxima página">
            <ChevronRight size={18} />
          </button>
        </div>

      </main>
    </div>
  )
}

export default ProductCatalog
