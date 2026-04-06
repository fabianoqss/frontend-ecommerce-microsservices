import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

interface Product {
  id: number
  title: string
  price: number
  thumbnail: string
  category: string
}

const PAGES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '...', 35]

const AdminProducts = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function carregar() {
      const categories = ['laptops', 'smartphones', 'tablets', 'mobile-accessories']
      const responses = await Promise.all(
        categories.map((cat) => axios.get(`https://dummyjson.com/products/category/${cat}?limit=20`))
      )
      setProducts(responses.flatMap((res) => res.data.products))
    }
    carregar()
  }, [])

  return (
    <div
      className="min-h-screen bg-[#f2f2f2] text-[#263238]"
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      {/* Navbar */}
      <nav className="bg-[#407bff] h-[70px] flex items-center px-10">
        <span className="text-white font-bold text-2xl tracking-[-0.36px]">DS Catalog</span>
        <div className="ml-auto flex items-center gap-10 text-[18px] tracking-[-0.27px]">
          <Link to="/home" className="text-white/50 font-semibold hover:text-white transition-colors">HOME</Link>
          <Link to="/ProductCatalog" className="text-white/50 font-semibold hover:text-white transition-colors">CATÁLOGO</Link>
          <Link to="/admin/products" className="text-white font-bold">ADMIN</Link>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="bg-white w-[304px] min-h-[calc(100vh-70px)] flex-shrink-0">
          <div className="bg-[#407bff]/30 border-b border-[#e1e1e1] px-10 py-[26px]">
            <span className="text-[#407bff] font-bold text-[18px] tracking-[-0.27px]">Produtos</span>
          </div>
          <div className="border-b border-[#e1e1e1] px-10 py-[26px]">
            <button className="text-[#9e9e9e] font-bold text-[18px] tracking-[-0.27px] hover:text-[#407bff] transition-colors">
              Categorias
            </button>
          </div>
          <div className="border-b border-[#e1e1e1] px-10 py-[26px]">
            <button className="text-[#9e9e9e] font-bold text-[18px] tracking-[-0.27px] hover:text-[#407bff] transition-colors">
              Usuários
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 px-[41px] py-[22px] flex flex-col gap-5">

          {/* ADICIONAR + Search bar */}
          <div className="flex items-center gap-4">
            <button
              className="bg-[#407bff] text-white font-bold text-[16px] tracking-[-0.24px] px-8 h-[60px] rounded-[10px] hover:bg-[#2563eb] transition-colors whitespace-nowrap"
              onClick={() => navigate('/admin/products/new')}
              aria-label="Adicionar produto"
            >
              ADICIONAR
            </button>

            <div className="bg-white rounded-[10px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] h-[60px] flex items-center px-4 flex-1">
              <div className="flex items-center gap-2 flex-1 px-2">
                <input
                  type="text"
                  placeholder="Nome do produto"
                  className="flex-1 text-[18px] text-[#9e9e9e] tracking-[-0.27px] outline-none bg-transparent placeholder:text-[#9e9e9e]"
                  aria-label="Buscar por nome do produto"
                />
                <Search size={20} className="text-[#9e9e9e] flex-shrink-0" />
              </div>
              <div className="w-px h-[36px] bg-[#e1e1e1] mx-2" />
              <div className="flex items-center gap-2 px-2 cursor-pointer">
                <span className="text-[18px] text-[#9e9e9e] tracking-[-0.27px]">Categoria</span>
                <ChevronDown size={16} className="text-[#9e9e9e]" />
              </div>
              <div className="w-px h-[36px] bg-[#e1e1e1] mx-2" />
              <button
                className="text-[14px] font-bold text-[#9e9e9e] tracking-[-0.21px] border border-[#e1e1e1] rounded-[6px] px-4 h-[38px] hover:text-[#407bff] hover:border-[#407bff] transition-colors"
                aria-label="Limpar filtro"
              >
                LIMPAR FILTRO
              </button>
            </div>
          </div>

          {/* Product list */}
          <div className="flex flex-col gap-5">
            {products.map((product) => {
              const [intPart, decPart] = product.price.toFixed(2).split('.')
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-[10px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] h-[160px] flex"
                >
                  {/* Image */}
                  <div className="w-[148px] flex items-center justify-center p-4 flex-shrink-0">
                    <img src={product.thumbnail} alt={product.title} className="h-full object-contain" />
                  </div>

                  {/* Divider */}
                  <div className="w-px bg-[#e1e1e1] my-4" />

                  {/* Info */}
                  <div className="flex-1 px-6 py-4 flex flex-col justify-center gap-2">
                    <p className="font-bold text-[18px] text-[#263238] tracking-[-0.27px] leading-snug">
                      {product.title}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[#9e9e9e] text-[14px] tracking-[-0.21px]">R$</span>
                      <span className="text-[#407bff] font-bold text-[24px] tracking-[-0.36px] leading-none">{intPart}</span>
                      <span className="text-[#407bff] font-bold text-[18px] tracking-[-0.27px]">,{decPart}</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <span className="bg-[#e0e0e0] text-[#424242] font-bold text-[14px] tracking-[-0.21px] px-3 py-1 rounded-[4px]">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-stretch justify-center gap-3 px-6 flex-shrink-0 w-[200px]">
                    <button
                      className="border border-[#e1e1e1] rounded-[6px] py-2 px-4 font-bold text-[14px] text-[#9e9e9e] tracking-[-0.21px] hover:border-[#407bff] hover:text-[#407bff] transition-colors"
                      aria-label={`Editar ${product.title}`}
                    >
                      EDITAR
                    </button>
                    <button
                      className="border border-[#df5753] rounded-[6px] py-2 px-4 font-bold text-[14px] text-[#df5753] tracking-[-0.21px] hover:bg-[#df5753] hover:text-white transition-colors"
                      aria-label={`Excluir ${product.title}`}
                    >
                      EXCLUIR
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 py-4">
            <button
              className="flex items-center justify-center size-[40px] rounded-full text-white bg-[#9e9e9e] hover:bg-[#407bff] transition-colors"
              aria-label="Página anterior"
            >
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
            <button
              className="flex items-center justify-center size-[40px] rounded-full text-white bg-[#9e9e9e] hover:bg-[#407bff] transition-colors"
              aria-label="Próxima página"
            >
              <ChevronRight size={18} />
            </button>
          </div>

        </main>
      </div>
    </div>
  )
}

export default AdminProducts
