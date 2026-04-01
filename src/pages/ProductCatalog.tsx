import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

const imgProduct = 'https://www.figma.com/api/mcp/asset/9dff1e4e-978e-4bf4-a4f4-bde2998fdfe3'

interface CardProdutoProps {
  name?: string
  price?: string
  cents?: string
}

const CardProduto = ({
  name = 'Computador Desktop - Intel Core i7',
  price = '2.779',
  cents = ',00',
}: CardProdutoProps) => (
  <div className="bg-white rounded-[10px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] w-[247px] flex flex-col">
    {/* Product image */}
    <div className="flex items-center justify-center h-[185px] px-4 pt-4">
      <img src={imgProduct} alt={name} className="h-full object-contain" />
    </div>

    {/* Divider */}
    <div className="border-t border-[#e1e1e1] mx-0" />

    {/* Info */}
    <div className="px-[21px] py-4 flex flex-col gap-1">
      <p className="text-[#263238] text-[18px] font-bold tracking-[-0.27px] leading-snug">
        {name}
      </p>
      <div className="flex items-baseline gap-1 mt-1">
        <span className="text-[#9e9e9e] text-[18px] tracking-[-0.27px]">R$</span>
        <span className="text-[#407bff] text-[32px] font-bold tracking-[-0.48px] leading-none">{price}</span>
        <span className="text-[#407bff] text-[18px] font-bold tracking-[-0.27px]">{cents}</span>
      </div>
    </div>
  </div>
)

const PAGES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '...', 35]

const ProductCatalog = () => {
  return (
    <div
      className="min-h-screen bg-[#f2f2f2] text-[#263238]"
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      {/* Navbar */}
      <nav className="bg-[#407bff] h-[70px] flex-shrink-0 flex items-center px-10">
        <span className="text-white font-bold text-2xl tracking-[-0.36px]">DS Catalog</span>
        <div className="ml-auto flex items-center gap-10 text-[18px] tracking-[-0.27px]">
          <a href="#" className="text-white/50 font-semibold hover:text-white transition-colors">HOME</a>
          <a href="#" className="text-white font-bold">CATÁLOGO</a>
          <a href="#" className="text-white/50 font-semibold hover:text-white transition-colors">ADMIN</a>
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
          {Array.from({ length: 8 }).map((_, i) => (
            <CardProduto key={i} />
          ))}
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
