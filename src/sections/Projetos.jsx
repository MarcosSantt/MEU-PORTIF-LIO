import { useEffect, useRef, useState } from 'react'
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

// Largura em que o site é renderizado antes de ser reduzido para caber no card:
// versão de computador em telas grandes, versão de celular em telas pequenas
const LARGURA_COMPUTADOR = 1280
const LARGURA_CELULAR = 390

// Mostra o site real, ao vivo, dentro do card. Passando o mouse (ou tocando no celular) dá para rolar e navegar.
function SiteAoVivo({ projeto }) {
  const caixa = useRef(null)
  const [tamanho, setTamanho] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const el = caixa.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setTamanho({ w: e.contentRect.width, h: e.contentRect.height }))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const largura = tamanho.w && tamanho.w < 480 ? LARGURA_CELULAR : LARGURA_COMPUTADOR
  const escala = tamanho.w ? tamanho.w / largura : 0

  return (
    <div ref={caixa} className="relative size-full overflow-hidden bg-white">
      {escala > 0 && (
        <iframe
          src={projeto.site}
          title={`Site ${projeto.nome} ao vivo`}
          loading="lazy"
          className="absolute left-0 top-0 border-0"
          style={{
            width: largura,
            height: tamanho.h / escala,
            transform: `scale(${escala})`,
            transformOrigin: '0 0',
          }}
        />
      )}
      {/* No celular o aviso fica abaixo do card, para não cobrir o site */}
      <span className="pointer-events-none absolute bottom-3 left-3 hidden items-center gap-1.5 rounded-md bg-black/75 px-2 py-1 font-mono text-[11px] text-white transition-opacity duration-300 group-hover:opacity-0 sm:inline-flex">
        <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" aria-hidden="true" />
        ao vivo · passe o mouse para navegar
      </span>
    </div>
  )
}

function Imagem({ projeto }) {
  if (projeto.site) return <SiteAoVivo projeto={projeto} />
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
            <div className={`md:col-span-7 ${i % 2 ? 'md:order-2' : ''}`}>
              {/* Site ao vivo: card mais alto no celular, para caber mais da página */}
              <div className={`overflow-hidden rounded-xl border border-line bg-surface ${p.site ? 'aspect-[4/5] sm:aspect-[16/10]' : 'aspect-[16/10]'}`}>
                <Imagem projeto={p} />
              </div>
              {p.site && (
                <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-subtle sm:hidden">
                  <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" aria-hidden="true" />
                  ao vivo · role dentro do card para navegar
                </p>
              )}
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
