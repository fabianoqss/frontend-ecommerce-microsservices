import { ArrowRight } from 'lucide-react'

function HomePage() {
  return (
    <div
      className="h-screen flex flex-col bg-[#f2f2f2] overflow-hidden"
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      {/* Navbar */}
      <nav className="bg-[#407bff] h-[70px] flex-shrink-0 flex items-center px-10">
        <span className="text-white font-bold text-2xl tracking-[-0.36px]">
          DS Catalog
        </span>
        <div className="ml-auto flex items-center gap-10 text-[18px] tracking-[-0.27px]">
          <a href="#" className="text-white font-bold">
            HOME
          </a>
          <a href="#" className="text-white/50 font-semibold hover:text-white transition-colors">
            CATÁLOGO
          </a>
          <a href="#" className="text-white/50 font-semibold hover:text-white transition-colors">
            ADMIN
          </a>
        </div>
      </nav>

      <main className="flex-1 px-10 py-8 min-h-0">
        <div className="bg-white rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] h-full grid grid-cols-2 px-[100px]">

          {/* Coluna esquerda — texto + botão */}
          <div className="flex flex-col justify-center gap-8">
            <h1 className="text-[55px] font-bold text-[#263238] leading-none tracking-[-0.825px]">
              Conheça o melhor<br />catálogo de produtos
            </h1>
            <p className="text-2xl text-[#9e9e9e] leading-normal tracking-[-0.36px]">
              Ajudaremos você a encontrar os melhores produtos disponíveis no mercado.
            </p>
            <div className="h-[70px] w-[450px] rounded-[10px] bg-[#407bff] flex items-center overflow-hidden cursor-pointer hover:brightness-110 transition-all">
              <span className="flex-1 text-white font-bold text-2xl tracking-[-0.36px] text-center pl-4">
                INICIE AGORA A SUA BUSCA
              </span>
              <div className="bg-[rgba(38,50,56,0.5)] h-full w-[60px] flex items-center justify-center rounded-r-[10px] flex-shrink-0">
                <ArrowRight size={24} className="text-white" />
              </div>
            </div>
          </div>

          {/* Coluna direita — ilustração */}
          <div className="flex items-center justify-center">
            <img src="/assets/Desenho.svg" alt="Desenho" className="h-full w-full object-contain" />
          </div>

        </div>
      </main>
    </div>
  )
}

export default HomePage
