import { useEffect, useState } from 'react'

// Abertura com a logo: o símbolo vem do fundo girando em 3D, se desenha, assenta,
// a assinatura aparece e a câmera atravessa o símbolo para revelar o site.
// Só roda quando o index.html marca <html data-intro> (sempre que a página carrega, exceto com movimento reduzido).
const DURACAO = 3000
const CAMADAS = 10 // espessura do símbolo (fatias empilhadas no eixo Z)

function Simbolo({ desenhar = false, className = '' }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
      <circle
        cx="256" cy="256" r="191" fill="none" strokeWidth="35"
        className={desenhar ? 'intro-circulo' : 'intro-circulo-fatia'}
        pathLength="1"
      />
      <line
        x1="314" y1="156" x2="198" y2="356" strokeWidth="35" strokeLinecap="round"
        className={desenhar ? 'intro-traco' : 'intro-traco-fatia'}
        pathLength="1"
      />
    </svg>
  )
}

export default function Intro() {
  const [ativa, setAtiva] = useState(() => document.documentElement.hasAttribute('data-intro'))
  const [saindo, setSaindo] = useState(false)

  useEffect(() => {
    if (!ativa) return
    const raiz = document.documentElement
    raiz.classList.add('intro-rodando')

    const fim = setTimeout(() => setAtiva(false), DURACAO)
    const pular = () => {
      setSaindo(true)
      setTimeout(() => setAtiva(false), 350)
    }
    addEventListener('keydown', pular, { once: true })
    return () => {
      clearTimeout(fim)
      removeEventListener('keydown', pular)
      raiz.classList.remove('intro-rodando')
    }
  }, [ativa])

  if (!ativa) return null

  return (
    <div
      className={`intro ${saindo ? 'intro-pulando' : ''}`}
      onClick={() => {
        setSaindo(true)
        setTimeout(() => setAtiva(false), 350)
      }}
      role="presentation"
    >
      <div className="intro-brilho" aria-hidden="true" />
      <div className="intro-palco">
        <div className="intro-lente">
          <div className="intro-giro">
            {Array.from({ length: CAMADAS }, (_, i) => (
              <div key={i} className="intro-fatia" style={{ '--z': `${-(i + 1) * 2.4}px`, '--sombra': (i + 1) / CAMADAS }}>
                <Simbolo />
              </div>
            ))}
            <div className="intro-frente">
              <Simbolo desenhar />
            </div>
            <div className="intro-reflexo" aria-hidden="true" />
          </div>
        </div>
      </div>
      <p className="intro-assinatura" aria-hidden="true">
        marcos dev
      </p>
      <p className="sr-only">Carregando o portfólio de Marcos</p>
    </div>
  )
}
