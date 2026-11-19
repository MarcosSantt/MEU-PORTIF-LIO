import { useEffect, useRef } from 'react'

// Fitas de luz no fundo, nas cores da marca (assets/marca/README.md)
const CORES = {
  // Escuro: azul da marca e azul claro (accent-on-dark) brilhando sobre o fundo grafite
  escuro: { base: '37, 99, 235', destaque: '96, 165, 250', alfa: 1 },
  // Claro: azul da marca mais forte e destaques em tinta (#0f1115) para contrastar com o papel
  claro: { base: '37, 99, 235', destaque: '15, 17, 21', alfa: 1.8 },
}

export default function FundoAnimado() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const movimentoReduzido = matchMedia('(prefers-reduced-motion: reduce)')
    let w = 0
    let h = 0
    let tempo = 0
    let quadro = 0

    function redimensionar() {
      w = innerWidth
      h = innerHeight
      const dpr = Math.min(devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    redimensionar()

    const total = innerWidth < 960 ? 15 : 30
    const fitas = Array.from({ length: total }, (_, i) => ({
      posicao: i / total,
      periodo1: 8 + Math.random() * 6,
      periodo2: 8 + Math.random() * 6,
      espessura: 0.6 + Math.random() * 1.2,
      destaque: i % 5 === 0,
      alfa: 0.05 + Math.random() * 0.2,
    }))

    function desenhar() {
      const escuro = document.documentElement.dataset.theme === 'dark'
      const cores = escuro ? CORES.escuro : CORES.claro
      ctx.clearRect(0, 0, w, h)
      // No escuro as fitas se somam e brilham; no claro se sobrepõem normalmente
      ctx.globalCompositeOperation = escuro ? 'lighter' : 'source-over'

      for (const f of fitas) {
        const alfa = Math.min(f.alfa * cores.alfa, 0.5)
        ctx.beginPath()
        ctx.moveTo(-200 + f.posicao * w + Math.sin(tempo / f.periodo1) * 100, h + 200)
        ctx.bezierCurveTo(
          w * 0.2 + Math.cos(tempo / f.periodo2) * 200,
          h * 0.8,
          w * 0.8 + Math.sin(tempo / f.periodo1) * 200,
          h * 0.2,
          w + 200,
          -200 + Math.cos(tempo / f.periodo2) * 100,
        )
        ctx.lineWidth = f.espessura
        ctx.strokeStyle = `rgba(${f.destaque ? cores.destaque : cores.base}, ${alfa})`
        ctx.stroke()
      }
    }

    function animar() {
      tempo += 0.01
      desenhar()
      quadro = requestAnimationFrame(animar)
    }

    // Com movimento reduzido, mostra só um quadro parado
    function iniciar() {
      cancelAnimationFrame(quadro)
      if (movimentoReduzido.matches) desenhar()
      else animar()
    }

    function aoRedimensionar() {
      redimensionar()
      if (movimentoReduzido.matches) desenhar()
    }

    // Redesenha o quadro parado quando o tema muda
    const tema = new MutationObserver(() => movimentoReduzido.matches && desenhar())
    tema.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    addEventListener('resize', aoRedimensionar)
    movimentoReduzido.addEventListener('change', iniciar)
    iniciar()

    return () => {
      cancelAnimationFrame(quadro)
      tema.disconnect()
      removeEventListener('resize', aoRedimensionar)
      movimentoReduzido.removeEventListener('change', iniciar)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className="camera pointer-events-none fixed inset-0 -z-10 h-screen w-screen" />
}
