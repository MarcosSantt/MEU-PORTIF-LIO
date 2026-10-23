import { useState } from 'react'
import Secao from '../components/Secao.jsx'
import { contatos } from '../data.js'

const canais = [
  {
    rotulo: 'E-mail',
    valor: contatos.email,
    placeholder: '[seu e-mail]',
    href: contatos.email && `mailto:${contatos.email}`,
  },
  {
    rotulo: 'WhatsApp',
    valor: contatos.whatsapp && 'Enviar mensagem',
    placeholder: '[WhatsApp]',
    href: contatos.whatsapp && `https://wa.me/${contatos.whatsapp}`,
  },
  {
    rotulo: 'LinkedIn',
    valor: contatos.linkedin.replace(/^https?:\/\/(www\.)?/, ''),
    placeholder: '[LinkedIn]',
    href: contatos.linkedin,
  },
  {
    rotulo: 'GitHub',
    valor: contatos.github.replace(/^https?:\/\/(www\.)?/, ''),
    placeholder: '[GitHub]',
    href: contatos.github,
  },
]

function CopiarEmail() {
  const [copiado, setCopiado] = useState(false)
  if (!contatos.email) return null

  async function copiar() {
    try {
      await navigator.clipboard.writeText(contatos.email)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 1500)
    } catch {}
  }

  return (
    <button type="button" onClick={copiar} className="rounded-lg border border-line px-5 py-3 font-medium transition-colors hover:border-fg">
      <span aria-live="polite">{copiado ? 'E-mail copiado ✓' : 'Copiar e-mail'}</span>
    </button>
  )
}

export default function Contato() {
  const principal = canais[0]

  return (
    <Secao id="contato" numero="05" rotulo="Contato" titulo="Vamos tirar seu projeto do papel?">
      <p className="max-w-xl text-lg leading-relaxed text-subtle">
        Conte o que você precisa: um site novo, um sistema para a sua empresa ou uma melhoria em algo que já existe.
        Respondo em até um dia útil.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        {principal.href ? (
          <a href={principal.href} className="rounded-lg bg-fg px-5 py-3 font-medium text-bg transition-opacity hover:opacity-85">
            Enviar e-mail
          </a>
        ) : (
          <span className="rounded-lg border border-dashed border-line px-5 py-3 font-mono text-sm text-subtle">{principal.placeholder}</span>
        )}
        <CopiarEmail />
      </div>

      <ul className="escalonado mt-14 divide-y divide-line border-y border-line">
        {canais.map((c) => (
          <li key={c.rotulo}>
            {c.href ? (
              <a
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 py-5"
              >
                <span className="font-mono text-xs tracking-[0.2em] text-subtle uppercase">{c.rotulo}</span>
                <span className="flex items-center gap-2 font-medium transition-colors group-hover:text-brand">
                  {c.valor}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </span>
              </a>
            ) : (
              <div className="flex items-center justify-between gap-4 py-5">
                <span className="font-mono text-xs tracking-[0.2em] text-subtle uppercase">{c.rotulo}</span>
                <span className="font-mono text-sm text-subtle">{c.placeholder}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </Secao>
  )
}
