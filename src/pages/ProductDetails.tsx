import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const imgProduct = 'https://www.figma.com/api/mcp/asset/20b6c3da-7ec0-4dac-b98f-b3e4e14f664e'

const ProductDetails = () => {
  const navigate = useNavigate()

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

          {/* Two-column layout */}
          <div className="grid grid-cols-2 gap-[67px]">

            {/* Left column: image + name + price */}
            <div className="flex flex-col gap-6">
              <div className="rounded-[10px] border border-[#e1e1e1] flex items-center justify-center h-[397px] overflow-hidden">
                <img
                  src={imgProduct}
                  alt="Computador Desktop - Intel Core i7"
                  className="h-full object-contain p-6"
                />
              </div>

              <h1 className="font-bold text-[36px] tracking-[-0.54px] text-[#263238] leading-tight">
                Computador Desktop - Intel Core i7
              </h1>

              <div className="flex items-baseline gap-2">
                <span className="text-[#9e9e9e] text-[28px] tracking-[-0.42px] font-normal">R$</span>
                <span className="text-[#407bff] font-bold text-[48px] tracking-[-0.72px] leading-none">2.779</span>
                <span className="text-[#407bff] font-bold text-[28px] tracking-[-0.42px]">,00</span>
              </div>
            </div>

            {/* Right column: description panel */}
            <div className="bg-[#f2f2f2] rounded-[10px] px-[29px] py-[38px]">
              <h2 className="font-bold text-[24px] tracking-[-0.36px] text-[#9e9e9e] mb-5">
                Descrição do Produto
              </h2>
              <p className="text-[#9e9e9e] text-[18px] tracking-[-0.27px] leading-relaxed">
                Seja um mestre em multitarefas com a capacidade para exibir quatro aplicativos
                simultâneos na tela. A tela está ficando abarrotada? Crie áreas de trabalho
                virtuais para obter mais espaço e trabalhar com os itens que você deseja. Além
                disso, todas as notificações e principais configurações são reunidas em uma única
                tela de fácil acesso.
              </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}

export default ProductDetails
