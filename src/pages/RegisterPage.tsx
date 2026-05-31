import { useEffect, useState } from 'react'
import { type SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { registerRequest } from '../api/authApi'

const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail com formato inválido'),
  password: z.string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .regex(/[A-Z]/, 'Senha deve conter pelo menos 1 letra maiúscula')
    .regex(/[a-z]/, 'Senha deve conter pelo menos 1 letra minúscula')
    .regex(/[\d\W_]/, 'Senha deve conter número ou caractere especial'),
  confirmPassword: z.string().min(1, 'Confirme sua senha'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
})

type Inputs = z.infer<typeof registerSchema>

const RegisterPage = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { register, handleSubmit, control, trigger, formState: { errors } } = useForm<Inputs>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  })
  const password = useWatch({ control, name: 'password' })
  const confirmPassword = useWatch({ control, name: 'confirmPassword' })

  useEffect(() => {
    if (confirmPassword) {
      void trigger('confirmPassword')
    }
  }, [password, confirmPassword, trigger])

  const registerMutation = useMutation({
    mutationFn: registerRequest,
    onSuccess: () => {
      navigate('/')
    },
  })

  const onSubmitForm: SubmitHandler<Inputs> = (data) => {
    registerMutation.mutate({
      name: data.name,
      email: data.email,
      password: data.password,
    })
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
            {registerMutation.isError && (
              <div className="rounded-[10px] border border-red-400 bg-red-50 px-4 py-3 text-sm text-red-600">
                {(() => {
                  const err = registerMutation.error as any
                  if (err?.response?.data) {
                    if (err.response.data.error) {
                      return err.response.data.error
                    }
                    if (typeof err.response.data === 'object') {
                      const firstFieldErr = Object.values(err.response.data)[0]
                      if (typeof firstFieldErr === 'string') {
                        return firstFieldErr
                      }
                    }
                  }
                  return 'Não foi possível concluir o cadastro. Confira os dados informados.'
                })()}
              </div>
            )}

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
              <div className={`flex items-center gap-3 border rounded-[10px] px-5 py-[14px] ${errors.password ? 'border-red-400' : 'border-[#e1e1e1]'}`}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Senha"
                  {...register('password')}
                  className="w-full text-[#263238] text-[18px] tracking-[-0.27px] outline-none bg-transparent placeholder:text-[#9e9e9e]"
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  onClick={() => setShowPassword((current) => !current)}
                  className="cursor-pointer text-[#9e9e9e] transition-colors hover:text-[#407bff] focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
              {errors.password && <span className="text-red-500 text-[14px] mt-1 ml-1">{errors.password.message}</span>}
            </div>

            {/* Confirmar senha */}
            <div>
              <div className={`flex items-center gap-3 border rounded-[10px] px-5 py-[14px] ${errors.confirmPassword ? 'border-red-400' : 'border-[#e1e1e1]'}`}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirmar senha"
                  {...register('confirmPassword')}
                  className="w-full text-[#263238] text-[18px] tracking-[-0.27px] outline-none bg-transparent placeholder:text-[#9e9e9e]"
                />
                <button
                  type="button"
                  aria-label={showConfirmPassword ? 'Ocultar confirmação de senha' : 'Mostrar confirmação de senha'}
                  onClick={() => setShowConfirmPassword((current) => !current)}
                  className="cursor-pointer text-[#9e9e9e] transition-colors hover:text-[#407bff] focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                >
                  {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
              {errors.confirmPassword && <span className="text-red-500 text-[14px] mt-1 ml-1">{errors.confirmPassword.message}</span>}
            </div>

            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full cursor-pointer bg-[#407bff] hover:bg-[#3068e0] active:bg-[#2558c8] transition-colors rounded-[10px] h-[62px] flex items-center justify-center text-white font-bold text-2xl tracking-[-0.36px] mt-4 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {registerMutation.isPending ? 'CADASTRANDO...' : 'CADASTRAR'}
            </button>
          </form>

          <p className="mt-8 text-[18px] font-bold tracking-[-0.27px] text-center">
            <span className="text-[#9e9e9e]">Já tem cadastro? </span>
            <Link to="/" className="cursor-pointer text-[#407bff] underline hover:text-[#3068e0]">
              LOGAR
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default RegisterPage
