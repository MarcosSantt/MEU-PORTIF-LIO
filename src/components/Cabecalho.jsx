import { useEffect, useState } from 'react'
import logo from '../../assets/marca/logo/svg/logo-horizontal.svg'
import logoEscuro from '../../assets/marca/logo/svg/logo-horizontal-fundo-escuro.svg'
import BotaoTema from './BotaoTema.jsx'

const links = [
  ['#projetos', 'Projetos'],
  ['#sobre', 'Sobre'],
  ['#tecnologias', 'Tecnologias'],
  ['#identidade', 'Identidade'],
  ['#contato', 'Contato'],
]

export default function Cabecalho() {
  const [aberto, setAberto] = useState(false)
  const [ativa, setAtiva] = useState('')

  // Realça no menu a seção que está na tela
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) if (e.isIntersecting) setAtiva(`#${e.target.id}`)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    document.querySelectorAll('main section[id]').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Esc fecha o menu do celular
  useEffect(() => {
    if (!aberto) return
    const fechar = (e) => e.key === 'Escape' && setAberto(false)
    addEventListener('keydown', fechar)
    return () => removeEventListener('keydown', fechar)
  }, [aberto])

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-fg focus:px-3 focus:py-2 focus:text-bg">
        Pular para o conteúdo
      </a>
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <a href="#inicio" aria-label="marcos dev — início">
          <img src={logo} alt="" className="h-7 w-auto dark:hidden" />
          <img src={logoEscuro} alt="" className="hidden h-7 w-auto dark:block" />
        </a>

        <nav aria-label="Principal" className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 md:flex">
            {links.map(([href, texto]) => (
              <li key={href}>
                <a
                  href={href}
                  aria-current={ativa === href ? 'true' : undefined}
                  className="rounded-md px-3 py-2 text-sm font-medium text-subtle transition-colors hover:text-fg aria-[current]:text-fg"
                >
                  {texto}
                </a>
              </li>
            ))}
          </ul>
          <BotaoTema />
          <button
            type="button"
            onClick={() => setAberto(!aberto)}
            aria-expanded={aberto}
            aria-controls="menu-movel"
            aria-label="Menu"
            className="grid size-10 place-items-center rounded-lg text-subtle hover:text-fg md:hidden"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {aberto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </nav>
      </div>

      {aberto && (
        <ul id="menu-movel" className="border-t border-line px-4 py-2 md:hidden">
          {links.map(([href, texto]) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => setAberto(false)}
                aria-current={ativa === href ? 'true' : undefined}
                className="block py-3 font-medium text-subtle hover:text-fg aria-[current]:text-fg"
              >
                {texto}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
