import { useState } from 'react'

export default function BotaoTema() {
  const [escuro, setEscuro] = useState(() => document.documentElement.dataset.theme === 'dark')

  function alternar() {
    const novo = !escuro
    setEscuro(novo)
    if (novo) document.documentElement.dataset.theme = 'dark'
    else delete document.documentElement.dataset.theme
    try {
      localStorage.setItem('tema', novo ? 'escuro' : 'claro')
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={alternar}
      aria-pressed={escuro}
      aria-label="Modo escuro"
      className="grid size-10 place-items-center rounded-lg text-subtle transition-colors hover:bg-surface hover:text-fg"
    >
      {escuro ? (
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}
