import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'

const CartPage = () => {
  const navigate = useNavigate()
  const { items, addItem, removeItem, updateQuantity, totalItems } = useCartStore()

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const [totalInt, totalDec] = totalPrice.toFixed(2).split('.')

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
          <Link to="/admin/products" className="text-white/50 font-semibold hover:text-white transition-colors">ADMIN</Link>
          <button className="relative text-white hover:text-white/80 transition-colors" aria-label="Carrinho de compras">
            <ShoppingCart size={24} />
            {totalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[11px] font-bold size-[18px] rounded-full flex items-center justify-center leading-none">
                {totalItems() > 99 ? '99+' : totalItems()}
              </span>
            )}
          </button>
        </div>
      </nav>

      <main className="max-w-[1200px] mx-auto px-6 py-10 flex flex-col gap-6">

        {/* Title */}
        <h1 className="font-bold text-[36px] text-[#263238] tracking-[-0.54px] text-center">
          Meu Carrinho
        </h1>

        {/* Empty state */}
        {items.length === 0 && (
          <div className="bg-white rounded-[10px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center py-20 gap-4">
            <ShoppingCart size={64} className="text-[#e1e1e1]" />
            <p className="text-[#9e9e9e] text-[18px] tracking-[-0.27px]">Seu carrinho está vazio.</p>
            <Link
              to="/ProductCatalog"
              className="bg-[#407bff] text-white font-bold text-[16px] tracking-[-0.24px] px-8 h-[48px] rounded-[10px] hover:bg-[#2563eb] transition-colors flex items-center"
            >
              VER PRODUTOS
            </Link>
          </div>
        )}

        {/* Two-column layout: items + sticky summary */}
        {items.length > 0 && (
          <div className="flex gap-6 items-start">

            {/* Left: scrollable item list */}
            <div className="flex-1 flex flex-col gap-4">
              {items.map((item) => {
                const [intPart, decPart] = (item.price * item.quantity).toFixed(2).split('.')
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-[10px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] flex h-[140px]"
                  >
                    {/* Image */}
                    <div className="w-[120px] flex items-center justify-center p-3 flex-shrink-0">
                      <img src={item.thumbnail} alt={item.title} className="h-full object-contain" />
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-[#e1e1e1] my-4" />

                    {/* Info */}
                    <div className="flex-1 px-5 py-4 flex flex-col justify-between">
                      <p className="font-bold text-[16px] text-[#263238] tracking-[-0.24px] leading-snug line-clamp-2">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            if (item.quantity === 1) removeItem(item.id)
                            else updateQuantity(item.id, item.quantity - 1)
                          }}
                          className="size-[32px] rounded-full bg-[#9e9e9e] hover:bg-[#407bff] text-white flex items-center justify-center transition-colors"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-bold text-[18px] text-[#263238] w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addItem({ id: item.id, title: item.title, price: item.price, thumbnail: item.thumbnail })}
                          className="size-[32px] rounded-full bg-[#407bff] hover:bg-[#2563eb] text-white flex items-center justify-center transition-colors"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Price + delete */}
                    <div className="flex flex-col items-end justify-between px-5 py-4 flex-shrink-0">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="size-[36px] rounded-[6px] bg-[#df5753] hover:bg-[#c0392b] text-white flex items-center justify-center transition-colors"
                        aria-label={`Remover ${item.title} do carrinho`}
                      >
                        <Trash2 size={16} />
                      </button>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[#9e9e9e] text-[14px] tracking-[-0.21px]">R$</span>
                        <span className="text-[#407bff] font-bold text-[24px] tracking-[-0.36px] leading-none">{intPart}</span>
                        <span className="text-[#407bff] font-bold text-[16px] tracking-[-0.24px]">,{decPart}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Right: sticky summary */}
            <div className="w-[320px] flex-shrink-0 sticky top-6">
              <div className="bg-white rounded-[10px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] px-6 py-6 flex flex-col gap-5">
                <h2 className="font-bold text-[20px] text-[#263238] tracking-[-0.3px]">Resumo do Pedido</h2>

                <div className="flex flex-col gap-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-[14px]">
                      <span className="text-[#263238] tracking-[-0.21px] line-clamp-1 flex-1 mr-2">
                        {item.title} <span className="text-[#9e9e9e]">x{item.quantity}</span>
                      </span>
                      <span className="text-[#407bff] font-bold whitespace-nowrap">
                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#e1e1e1] pt-4 flex items-center justify-between">
                  <span className="font-bold text-[18px] text-[#263238] tracking-[-0.27px]">Total</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[#9e9e9e] text-[14px]">R$</span>
                    <span className="text-[#407bff] font-bold text-[32px] tracking-[-0.48px] leading-none">{totalInt}</span>
                    <span className="text-[#407bff] font-bold text-[18px] tracking-[-0.27px]">,{totalDec}</span>
                  </div>
                </div>

                <button
                  className="w-full bg-[#407bff] text-white font-bold text-[16px] tracking-[-0.24px] h-[50px] rounded-[10px] hover:bg-[#2563eb] transition-colors"
                  aria-label="Finalizar pedido"
                >
                  FINALIZAR PEDIDO
                </button>

                <button
                  onClick={() => navigate('/ProductCatalog')}
                  className="w-full border border-[#e1e1e1] text-[#9e9e9e] font-bold text-[14px] tracking-[-0.21px] h-[44px] rounded-[10px] hover:border-[#407bff] hover:text-[#407bff] transition-colors"
                >
                  CONTINUAR COMPRANDO
                </button>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  )
}

export default CartPage
