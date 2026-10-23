import Secao from '../components/Secao.jsx'
import simboloMono from '../../assets/marca/logo/svg/simbolo-mono.svg'
import { projetos } from '../data.js'

function LinkProjeto({ href, children, principal }) {
  const base = 'inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium'
  if (!href) {
    return (
      <span aria-disabled="true" title="Em breve" className={`${base} cursor-not-allowed border border-dashed border-line text-subtle`}>
        {children} <span className="font-mono text-xs">· em breve</span>
      </span>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${base} transition-colors ${principal ? 'bg-fg text-bg hover:opacity-85' : 'border border-line hover:border-fg'}`}
    >
      {children} <span aria-hidden="true">↗</span>
      <span className="sr-only">(abre em nova aba)</span>
    </a>
  )
}

function Imagem({ projeto }) {
  if (projeto.imagem) {
    return (
      <img
        src={projeto.imagem}
        alt={`Tela do projeto ${projeto.nome}`}
        loading="lazy"
        className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
    )
  }
  return (
    <div className="relative grid size-full place-items-center">
      <img src={simboloMono} alt="" className="size-16 opacity-10 dark:invert" />
      <span className="absolute bottom-4 left-4 font-mono text-xs text-subtle">[imagem do projeto]</span>
    </div>
  )
}

export default function Projetos() {
  return (
    <Secao id="projetos" numero="01" rotulo="Projetos" titulo="Trabalhos recentes">
      <ol className="escalonado space-y-16 sm:space-y-24">
        {projetos.map((p, i) => (
          <li key={p.nome} className="group grid items-center gap-8 md:grid-cols-12 md:gap-12">
            <div className={`aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface md:col-span-7 ${i % 2 ? 'md:order-2' : ''}`}>
              <Imagem projeto={p} />
            </div>

            <div className="md:col-span-5">
              <p className="font-mono text-xs text-subtle">
                {String(i + 1).padStart(2, '0')} / {p.tipo}
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                {p.nome}
                {p.cliente && <span className="font-normal text-subtle"> · {p.cliente}</span>}
              </h3>
              <p className="mt-3 font-medium">{p.resumo}</p>
              <p className="mt-2 leading-relaxed text-subtle">{p.descricao}</p>

              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Tecnologias usadas em ${p.nome}`}>
                {p.tecnologias.length > 0 ? (
                  p.tecnologias.map((t) => (
                    <li key={t} className="rounded-md border border-line px-2 py-1 font-mono text-xs text-subtle">
                      {t}
                    </li>
                  ))
                ) : (
                  <li className="rounded-md border border-dashed border-line px-2 py-1 font-mono text-xs text-subtle">[tecnologias]</li>
                )}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <LinkProjeto href={p.demo} principal>
                  Ver demo
                </LinkProjeto>
                <LinkProjeto href={p.github}>GitHub</LinkProjeto>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Secao>
  )
}
