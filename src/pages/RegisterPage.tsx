import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'

const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail com formato inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
})

type Inputs = z.infer<typeof registerSchema>

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmitForm: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  return (
    <div
      className="min-h-screen bg-[#f2f2f2] text-[#263238]"
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      {/* Navbar */}
      <nav className="bg-[#407bff] h-[70px] flex items-center px-10">
        <span className="text-white font-bold text-2xl tracking-[-0.36px]">DS Catalog</span>
        <div className="ml-auto flex items-center gap-10 text-lg">
          <Link to="/home" className="text-white font-bold">HOME</Link>
          <Link to="/ProductCatalog" className="text-white/50 font-semibold hover:text-white transition-colors">CATÁLOGO</Link>
          <a href="#" className="text-white/50 font-semibold hover:text-white transition-colors">ADMIN</a>
        </div>
      </nav>

      {/* Content */}
      <div className="flex items-center justify-between gap-12 px-[140px] py-12 min-h-[calc(100vh-70px)]">

        {/* Left: illustration */}
        <div className="flex-1 max-w-[700px] flex flex-col items-center text-center">
          <h1 className="text-[#263238] text-[55px] font-bold leading-tight tracking-[-0.825px] max-w-[647px] mb-6">
            Divulgue seus produtos no DS Catalog
          </h1>
          <p className="text-[#9e9e9e] text-2xl tracking-[-0.36px] max-w-[516px] mb-8">
            Faça parte do nosso catálogo de divulgação e aumente a venda dos seus produtos.
          </p>
          <img
            src="/assets/DesenhoLogin.svg"
            alt="Ilustração DS Catalog"
            className="w-full max-w-[400px] object-contain mx-auto block"
          />
        </div>

        {/* Right: register form */}
        <div className="bg-white rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] w-[551px] shrink-0 py-16 px-[50px] flex flex-col items-center">

          <h2 className="text-[#263238] text-[48px] tracking-[-0.72px] font-normal mb-10">
            CADASTRO
          </h2>

          <form className="w-full space-y-5" onSubmit={handleSubmit(onSubmitForm)} noValidate>

            {/* Nome */}
            <div>
              <div className={`border rounded-[10px] px-5 py-[14px] ${errors.name ? 'border-red-400' : 'border-[#e1e1e1]'}`}>
                <input
                  type="text"
                  placeholder="Nome completo"
                  {...register('name')}
                  className="w-full text-[#263238] text-[18px] tracking-[-0.27px] outline-none bg-transparent placeholder:text-[#9e9e9e]"
                />
              </div>
              {errors.name && <span className="text-red-500 text-[14px] mt-1 ml-1">{errors.name.message}</span>}
            </div>

            {/* Email */}
            <div>
              <div className={`border rounded-[10px] px-5 py-[14px] ${errors.email ? 'border-red-400' : 'border-[#e1e1e1]'}`}>
                <input
                  type="email"
                  placeholder="Email"
                  {...register('email')}
                  className="w-full text-[#263238] text-[18px] tracking-[-0.27px] outline-none bg-transparent placeholder:text-[#9e9e9e]"
                />
              </div>
              {errors.email && <span className="text-red-500 text-[14px] mt-1 ml-1">{errors.email.message}</span>}
            </div>

            {/* Senha */}
            <div>
              <div className={`border rounded-[10px] px-5 py-[14px] ${errors.password ? 'border-red-400' : 'border-[#e1e1e1]'}`}>
                <input
                  type="password"
                  placeholder="Senha"
                  {...register('password')}
                  className="w-full text-[#263238] text-[18px] tracking-[-0.27px] outline-none bg-transparent placeholder:text-[#9e9e9e]"
                />
              </div>
              {errors.password && <span className="text-red-500 text-[14px] mt-1 ml-1">{errors.password.message}</span>}
            </div>

            {/* Confirmar senha */}
            <div>
              <div className={`border rounded-[10px] px-5 py-[14px] ${errors.confirmPassword ? 'border-red-400' : 'border-[#e1e1e1]'}`}>
                <input
                  type="password"
                  placeholder="Confirmar senha"
                  {...register('confirmPassword')}
                  className="w-full text-[#263238] text-[18px] tracking-[-0.27px] outline-none bg-transparent placeholder:text-[#9e9e9e]"
                />
              </div>
              {errors.confirmPassword && <span className="text-red-500 text-[14px] mt-1 ml-1">{errors.confirmPassword.message}</span>}
            </div>

            <button
              type="submit"
              className="w-full bg-[#407bff] hover:bg-[#3068e0] active:bg-[#2558c8] transition-colors rounded-[10px] h-[62px] flex items-center justify-center text-white font-bold text-2xl tracking-[-0.36px] mt-4"
            >
              CADASTRAR
            </button>
          </form>

          <p className="mt-8 text-[18px] font-bold tracking-[-0.27px] text-center">
            <span className="text-[#9e9e9e]">Já tem cadastro? </span>
            <Link to="/" className="text-[#407bff] underline hover:text-[#3068e0]">
              LOGAR
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default RegisterPage
