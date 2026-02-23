import { useState, type FormEventHandler } from 'react'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    console.log('Login data:', { email, password, rememberMe })
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl shadow-slate-950/50">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">Entrar</h1>
          <p className="mt-2 text-sm text-slate-400">
            Acesse sua conta para continuar.
          </p>
        </header>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-200"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
              id="email"
              name="email"
              placeholder="voce@exemplo.com"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                className="block text-sm font-medium text-slate-200"
                htmlFor="password"
              >
                Senha
              </label>
              <a className="text-sm text-sky-400 hover:text-sky-300" href="#">
                Esqueci minha senha
              </a>
            </div>
            <input
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
              id="password"
              name="password"
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
            <input
              className="h-4 w-4 rounded border-slate-600 bg-slate-950 text-sky-500"
              name="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
            />
            Lembrar de mim
          </label>

          <button
            className="w-full rounded-lg bg-sky-600 px-4 py-3 font-medium text-white transition hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            type="submit"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Nao tem conta?{' '}
          <a className="font-medium text-sky-400 hover:text-sky-300" href="#">
            Criar conta
          </a>
        </p>
      </section>
    </main>
  )
}

export default LoginPage
