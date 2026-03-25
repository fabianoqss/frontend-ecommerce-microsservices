import { useState, type FormEventHandler } from 'react'

// Figma illustration assets (valid for 7 days)
const imgIllustration = 'https://www.figma.com/api/mcp/asset/1cdc3c4c-44ba-4768-bd14-9f04b4bb9e7c'
const imgArrow = 'https://www.figma.com/api/mcp/asset/17bbadf7-8042-4dab-892a-1384bf53a18e'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    console.log('Login:', { email, password })
  }

  return (
    <div
      className="min-h-screen bg-[#f2f2f2] text-[#263238]"
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      <nav className="bg-[#407bff] h-[70px] flex items-center px-10">
        <span className="text-white font-bold text-2xl tracking-[-0.36px]">
          DS Catalog
        </span>
        <div className="ml-auto flex items-center gap-10 text-lg">
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

      <div className="flex items-center justify-between gap-12 px-[140px] py-12 min-h-[calc(100vh-70px)]">

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

        <div className="bg-white rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] w-[551px] shrink-0 py-16 px-[50px] flex flex-col items-center">

          <h2 className="text-[#263238] text-[48px] tracking-[-0.72px] font-normal mb-10">
            LOGIN
          </h2>

          <form className="w-full space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="border border-[#e1e1e1] rounded-[10px] px-5 py-[14px]">
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-[#263238] text-[18px] tracking-[-0.27px] outline-none bg-transparent placeholder:text-[#9e9e9e]"
                required
              />
            </div>

            <div className="border border-[#e1e1e1] rounded-[10px] px-5 py-[14px]">
              <input
                id="password"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-[#263238] text-[18px] tracking-[-0.27px] outline-none bg-transparent placeholder:text-[#9e9e9e]"
                required
              />
            </div>

            {/* Forgot password */}
            <div className="text-right">
              <a
                href="#"
                className="text-[#407bff] text-[18px] tracking-[-0.27px] hover:underline"
              >
                Esqueci a senha?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="relative w-full bg-[#407bff] hover:bg-[#3068e0] active:bg-[#2558c8] transition-colors rounded-[10px] h-[62px] flex items-center justify-center text-white font-bold text-2xl tracking-[-0.36px] mt-4"
            >
              LOGAR
              <div className="absolute right-0 top-0 bottom-0 w-[62px] bg-[rgba(38,50,56,0.5)] rounded-r-[10px] flex items-center justify-center">
                <img src={imgArrow} alt="" className="w-5 h-5" />
              </div>
            </button>
          </form>

          {/* Register */}
          <p className="mt-8 text-[18px] font-bold tracking-[-0.27px] text-center">
            <span className="text-[#9e9e9e]">Não tem Cadastro? </span>
            <a href="#" className="text-[#407bff] underline hover:text-[#3068e0]">
              CADASTRAR
            </a>
          </p>

        </div>
      </div>
    </div>
  )
}

export default LoginPage
