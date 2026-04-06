import { ChevronLeft, ShoppingCart } from 'lucide-react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import axios from 'axios'
import { useEffect, useState } from 'react'

interface Product {
  id: number
  title: string
  price: number
  thumbnail: string
  description: string
  category: string
}

const ProductDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const totalItems = useCartStore((state) => state.totalItems())
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    async function carregar() {
      const { data } = await axios.get(`https://dummyjson.com/products/${id}`)
      setProduct(data)
    }
    carregar()
  }, [id])

  const [intPart, decPart] = product ? product.price.toFixed(2).split('.') : ['0', '00']

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
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[11px] font-bold size-[18px] rounded-full flex items-center justify-center leading-none">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex justify-center px-10 py-10">
        <div className="bg-white rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] w-full max-w-[1360px] px-[60px] pt-[43px] pb-[60px]">

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 font-bold text-[24px] tracking-[-0.36px] text-[#263238] hover:text-[#407bff] transition-colors mb-[54px]"
            aria-label="Voltar para o catálogo"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
            VOLTAR
          </button>

          {product && (
            <div className="grid grid-cols-2 gap-[67px]">

              {/* Left column: image + name + price */}
              <div className="flex flex-col gap-6">
                <div className="rounded-[10px] border border-[#e1e1e1] flex items-center justify-center h-[397px] overflow-hidden">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full object-contain p-6"
                  />
                </div>

                <h1 className="font-bold text-[36px] tracking-[-0.54px] text-[#263238] leading-tight">
                  {product.title}
                </h1>

                <div className="flex items-baseline gap-2">
                  <span className="text-[#9e9e9e] text-[28px] tracking-[-0.42px] font-normal">R$</span>
                  <span className="text-[#407bff] font-bold text-[48px] tracking-[-0.72px] leading-none">{intPart}</span>
                  <span className="text-[#407bff] font-bold text-[28px] tracking-[-0.42px]">,{decPart}</span>
                </div>
              </div>

              {/* Right column: description */}
              <div className="bg-[#f2f2f2] rounded-[10px] px-[29px] py-[38px]">
                <h2 className="font-bold text-[24px] tracking-[-0.36px] text-[#9e9e9e] mb-5">
                  Descrição do Produto
                </h2>
                <p className="text-[#9e9e9e] text-[18px] tracking-[-0.27px] leading-relaxed">
                  {product.description}
                </p>
              </div>

            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default ProductDetails
