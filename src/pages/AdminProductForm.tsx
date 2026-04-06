import { ChevronDown } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRef } from 'react'

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  price: z
    .string()
    .min(1, 'Preço é obrigatório')
    .refine((v) => !isNaN(Number(v.replace(',', '.'))), 'Preço inválido'),
  description: z.string().min(1, 'Descrição é obrigatória'),
})

type FormData = z.infer<typeof schema>

const CATEGORIES = ['laptops', 'smartphones', 'tablets', 'mobile-accessories']

const AdminProductForm = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  function onSubmit(data: FormData) {
    console.log('Produto salvo:', data)
    navigate('/admin/products')
  }

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
        <main className="flex-1 px-[41px] py-[40px]">
          <div className="bg-white rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] px-[112px] py-[60px]">

            <h1 className="font-bold text-[24px] text-[#263238] tracking-[-0.36px] mb-8">
              DADOS DO PRODUTO
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="grid grid-cols-2 gap-6">

                {/* Left column */}
                <div className="flex flex-col gap-4">

                  {/* Nome do Produto */}
                  <div className="flex flex-col gap-1">
                    <div className="border border-[#e1e1e1] rounded-[10px] h-[60px] flex items-center px-4 focus-within:border-[#407bff] transition-colors">
                      <input
                        {...register('name')}
                        type="text"
                        placeholder="Nome do Produto"
                        className="flex-1 text-[18px] text-[#263238] tracking-[-0.27px] outline-none bg-transparent placeholder:text-[#9e9e9e]"
                        aria-label="Nome do produto"
                      />
                    </div>
                    {errors.name && (
                      <span className="text-[#df5753] text-[13px]">{errors.name.message}</span>
                    )}
                  </div>

                  {/* Categorias */}
                  <div className="flex flex-col gap-1">
                    <div className="border border-[#e1e1e1] rounded-[10px] h-[60px] flex items-center px-4 focus-within:border-[#407bff] transition-colors">
                      <select
                        {...register('category')}
                        className="flex-1 text-[18px] text-[#9e9e9e] tracking-[-0.27px] outline-none bg-transparent appearance-none cursor-pointer"
                        aria-label="Categoria"
                      >
                        <option value="">Categorias</option>
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat} className="text-[#263238]">
                            {cat}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="text-[#9e9e9e] flex-shrink-0 pointer-events-none" />
                    </div>
                    {errors.category && (
                      <span className="text-[#df5753] text-[13px]">{errors.category.message}</span>
                    )}
                  </div>

                  {/* Preço */}
                  <div className="flex flex-col gap-1">
                    <div className="border border-[#e1e1e1] rounded-[10px] h-[60px] flex items-center px-4 focus-within:border-[#407bff] transition-colors">
                      <input
                        {...register('price')}
                        type="text"
                        placeholder="Preço"
                        className="flex-1 text-[18px] text-[#263238] tracking-[-0.27px] outline-none bg-transparent placeholder:text-[#9e9e9e]"
                        aria-label="Preço do produto"
                      />
                    </div>
                    {errors.price && (
                      <span className="text-[#df5753] text-[13px]">{errors.price.message}</span>
                    )}
                  </div>

                  {/* Adicionar imagem */}
                  <div className="flex flex-col gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png"
                      className="hidden"
                      aria-label="Selecionar imagem do produto"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-[#9e9e9e] text-white font-bold text-[14px] tracking-[-0.21px] px-6 h-[38px] rounded-[6px] hover:bg-[#757575] transition-colors w-fit"
                    >
                      ADICIONAR IMAGEM
                    </button>
                    <p className="text-[#407bff] text-[14px] tracking-[-0.21px] leading-relaxed">
                      As imagens devem ser JPG ou PNG e não devem ultrapassar{' '}
                      <strong>5 mb.</strong>
                    </p>
                  </div>
                </div>

                {/* Right column — Descrição */}
                <div className="flex flex-col gap-1">
                  <div className="border border-[#e1e1e1] rounded-[10px] h-full min-h-[280px] flex items-start px-4 py-4 focus-within:border-[#407bff] transition-colors">
                    <textarea
                      {...register('description')}
                      placeholder="Descrição"
                      className="flex-1 h-full w-full text-[18px] text-[#263238] tracking-[-0.27px] outline-none bg-transparent placeholder:text-[#9e9e9e] resize-none"
                      aria-label="Descrição do produto"
                    />
                  </div>
                  {errors.description && (
                    <span className="text-[#df5753] text-[13px]">{errors.description.message}</span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 mt-10">
                <button
                  type="button"
                  onClick={() => navigate('/admin/products')}
                  className="border border-[#df5753] text-[#df5753] font-bold text-[16px] tracking-[-0.24px] px-[60px] h-[50px] rounded-[10px] hover:bg-[#df5753] hover:text-white transition-colors"
                >
                  CANCELAR
                </button>
                <button
                  type="submit"
                  className="bg-[#407bff] text-white font-bold text-[16px] tracking-[-0.24px] px-[60px] h-[50px] rounded-[10px] hover:bg-[#2563eb] transition-colors"
                >
                  SALVAR
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminProductForm
