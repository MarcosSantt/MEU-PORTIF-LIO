import logo from '../../assets/marca/logo/svg/logo-horizontal.svg'
import logoEscuro from '../../assets/marca/logo/svg/logo-horizontal-fundo-escuro.svg'

export default function Rodape() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <img src={logo} alt="marcos dev" className="h-6 w-auto dark:hidden" />
          <img src={logoEscuro} alt="marcos dev" className="hidden h-6 w-auto dark:block" />
          <p className="mt-3 font-mono text-xs text-subtle">Atibaia, SP · {new Date().getFullYear()}</p>
        </div>
        <a href="#inicio" className="font-mono text-xs text-subtle transition-colors hover:text-fg">
          Voltar ao topo ↑
        </a>
      </div>
    </footer>
  )
}
