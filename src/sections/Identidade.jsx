import { useRef, useState } from 'react'
import Secao from '../components/Secao.jsx'

const imagens = import.meta.glob('../assets/pranchas/*.png', { eager: true, import: 'default' })

const pranchas = [
  ['01-capa', 'Capa'],
  ['02-simbolo', 'Símbolo e construção'],
  ['03-versoes', 'Versões'],
  ['04-cores-tipografia', 'Cores e tipografia'],
  ['05-aplicacoes', 'Aplicações'],
].map(([arquivo, legenda]) => ({ src: imagens[`../assets/pranchas/${arquivo}.png`], legenda }))

const cores = [
  ['Tinta', '#0F1115', 'texto e símbolo'],
  ['Papel', '#FAFAF8', 'fundo'],
  ['Azul código', '#2563EB', 'a barra, links'],
  ['Grafite', '#5B6170', 'texto secundário'],
  ['Azul claro', '#60A5FA', 'destaque no escuro'],
]

const resumo = [
  ['Desafio', 'Criar uma marca pessoal simples, que funcione do favicon de 16 px ao cartão de visita.'],
  ['Conceito', 'Um círculo e uma barra. O círculo é o projeto inteiro; a barra é o “/” do código, inclinada a 60° para dar ideia de movimento.'],
  ['Entregas', 'Símbolo, logos horizontal e vertical, versões para fundo escuro e mono, paleta, tipografia, favicons e ícones.'],
]

function Paleta() {
  const [copiada, setCopiada] = useState('')

  async function copiar(hex) {
    try {
      await navigator.clipboard.writeText(hex)
      setCopiada(hex)
      setTimeout(() => setCopiada(''), 1500)
    } catch {}
  }

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {cores.map(([nome, hex, uso]) => (
          <li key={hex}>
            <button
              type="button"
              onClick={() => copiar(hex)}
              className="group w-full text-left"
              aria-label={`${nome}, ${hex}. Copiar código da cor`}
            >
              <span className="block aspect-[4/3] rounded-lg border border-line transition-transform group-hover:-translate-y-0.5" style={{ background: hex }} />
              <span className="mt-3 block font-medium">{nome}</span>
              <span className="block font-mono text-xs text-subtle">{copiada === hex ? 'copiado ✓' : hex}</span>
              <span className="block text-sm text-subtle">{uso}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="sr-only" aria-live="polite">
        {copiada && `${copiada} copiado`}
      </p>
    </>
  )
}

function Tipografia() {
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
      <div className="bg-bg p-6 sm:p-8">
        <p className="font-mono text-xs text-subtle">Manrope · 400 / 500 / 700</p>
        <p className="mt-4 text-6xl font-bold tracking-tight">Aa</p>
        <ul className="mt-6 space-y-1.5 text-lg">
          <li className="font-bold">sites que vendem</li>
          <li className="font-medium">sistemas que funcionam</li>
          <li>código que dura</li>
        </ul>
      </div>
      <div className="bg-bg p-6 sm:p-8">
        <p className="font-mono text-xs text-subtle">JetBrains Mono · 400</p>
        <p className="mt-4 font-mono text-6xl">{'{ }'}</p>
        <p className="mt-6 font-mono text-lg">
          <span className="text-brand">const</span> dev = <span className="text-subtle">"marcos"</span>;
        </p>
        <p className="mt-2 text-subtle">Legendas, detalhes e trechos de código.</p>
      </div>
    </div>
  )
}

function Pranchas() {
  const dialogo = useRef(null)
  const [aberta, setAberta] = useState(null)

  function abrir(i) {
    setAberta(i)
    dialogo.current.showModal()
  }

  return (
    <>
      <ol className="escalonado grid gap-10">
        {pranchas.map((p, i) => (
          <li key={p.legenda}>
            <figure>
              <button
                type="button"
                onClick={() => abrir(i)}
                className="group block w-full cursor-zoom-in overflow-hidden rounded-xl border border-line"
                aria-label={`Ampliar prancha ${i + 1}: ${p.legenda}`}
              >
                <img
                  src={p.src}
                  alt=""
                  width="2400"
                  height="1600"
                  loading="lazy"
                  className="w-full transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </button>
              <figcaption className="mt-3 font-mono text-xs text-subtle">
                0{i + 1} — {p.legenda}
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>

      <dialog
        ref={dialogo}
        onClose={() => setAberta(null)}
        onClick={(e) => e.target === dialogo.current && dialogo.current.close()}
        aria-label={aberta !== null ? `Prancha ${aberta + 1}: ${pranchas[aberta].legenda}` : 'Prancha'}
        className="m-auto max-h-none max-w-none bg-transparent p-4 backdrop:backdrop-blur-sm"
      >
        {aberta !== null && (
          <div className="flex w-[min(92vw,1400px)] flex-col items-end gap-3">
            <button
              type="button"
              onClick={() => dialogo.current.close()}
              className="rounded-lg bg-paper px-3 py-1.5 text-sm font-medium text-ink"
              autoFocus
            >
              Fechar ✕
            </button>
            <img
              src={pranchas[aberta].src}
              alt={`Prancha ${aberta + 1}: ${pranchas[aberta].legenda}`}
              className="max-h-[80vh] w-full rounded-lg object-contain"
            />
          </div>
        )}
      </dialog>
    </>
  )
}

export default function Identidade() {
  return (
    <Secao id="identidade" numero="04" rotulo="Identidade visual" titulo="Case: a marca marcos dev">
      <dl className="escalonado grid gap-8 md:grid-cols-3">
        {resumo.map(([termo, texto]) => (
          <div key={termo} className="border-t border-line pt-5">
            <dt className="font-mono text-xs tracking-[0.2em] text-subtle uppercase">{termo}</dt>
            <dd className="mt-3 leading-relaxed">{texto}</dd>
          </div>
        ))}
      </dl>

      <h3 className="mt-20 mb-6 font-mono text-xs tracking-[0.2em] text-subtle uppercase">Cores</h3>
      <Paleta />

      <h3 className="mt-16 mb-6 font-mono text-xs tracking-[0.2em] text-subtle uppercase">Tipografia</h3>
      <Tipografia />

      <h3 className="mt-20 mb-6 font-mono text-xs tracking-[0.2em] text-subtle uppercase">Pranchas</h3>
      <Pranchas />
    </Secao>
  )
}
