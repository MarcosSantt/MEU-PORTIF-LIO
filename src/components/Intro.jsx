import { useEffect, useRef, useState } from 'react'

// Abertura com a logo, em 4 atos (tempos em segundos, ver LINHA_DO_TEMPO):
//  1. tentáculos saem das bordas da tela e agarram o símbolo lá no fundo
//  2. seguram e giram o símbolo, trazendo-o para perto enquanto ele se desenha
//  3. tomam impulso e arremessam o símbolo contra a tela (impacto + onda de choque)
//  4. recolhem para fora da tela, a assinatura aparece e a câmera atravessa o símbolo
// O giro do símbolo é calculado aqui em JS (e não em CSS) para que a ponta de cada
// tentáculo acompanhe exatamente o anel do símbolo em perspectiva.
// Só roda quando o index.html marca <html data-intro> (sempre que a página carrega,
// exceto com movimento reduzido).
const DURACAO = 3900
const CAMADAS = 10 // espessura do símbolo (fatias empilhadas no eixo Z)
const PERSPECTIVA = 900 // igual ao perspective de .intro-lente

const LINHA_DO_TEMPO = {
  agarra: 0.85, // pontas chegam no símbolo
  giraFim: 2.0, // fim do giro segurando
  solta: 2.14, // fim do impulso: arremesso
  impacto: 2.36, // símbolo bate na tela
  recolhe: 2.75, // tentáculos já fora da tela
}

const CORES = {
  escuro: { sombra: [4, 8, 20], corpoBase: [10, 22, 52], corpoPonta: [37, 99, 235], brilho: [147, 197, 253], ventosa: [96, 165, 250], onda: [96, 165, 250] },
  claro: { sombra: [6, 8, 12], corpoBase: [15, 17, 21], corpoPonta: [29, 78, 216], brilho: [147, 197, 253], ventosa: [96, 165, 250], onda: [37, 99, 235] },
}

const limitar = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const misturar = (a, b, k) => a + (b - a) * k
const saida = (k) => 1 - (1 - k) ** 3
const entraESai = (k) => (k < 0.5 ? 4 * k ** 3 : 1 - (-2 * k + 2) ** 3 / 2)
const rgb = (c) => `rgb(${c[0]},${c[1]},${c[2]})`
const misturarCor = (a, b, k) => a.map((v, i) => Math.round(misturar(v, b[i], k)))
const GRAU = Math.PI / 180

// Pose do símbolo no tempo t: profundidade (z, px) e rotações (graus)
function pose(t) {
  const L = LINHA_DO_TEMPO
  const balanco = (s) => 25 * Math.sin(s * 3)
  if (t < L.agarra) {
    const k = t / L.agarra
    return { z: -1700 + 1050 * saida(k), a: 15, b: balanco(t), c: -60 * k }
  }
  if (t < L.giraFim) {
    const e = entraESai((t - L.agarra) / (L.giraFim - L.agarra))
    return { z: -650 + 590 * e, a: 15 - 5 * e, b: balanco(t) * (1 - e * 0.5), c: -60 - 660 * e }
  }
  const bSolta = balanco(L.giraFim) * 0.5
  if (t < L.solta) {
    const k = (t - L.giraFim) / (L.solta - L.giraFim)
    return { z: -60 - 160 * saida(k), a: 10, b: bSolta, c: -720 - 40 * k }
  }
  if (t < L.impacto) {
    const e = 1 - (1 - (t - L.solta) / (L.impacto - L.solta)) ** 2
    return { z: -220 + 470 * e, a: 10 * (1 - e), b: misturar(bSolta, 360, e), c: misturar(-760, -1080, e) }
  }
  // Mola amortecida depois do impacto
  const s = t - L.impacto
  const mola = Math.exp(-8 * s)
  return { z: 250 * mola * Math.cos(14 * s), a: 6 * mola * Math.sin(16 * s), b: 360, c: -1080 }
}

// Mesma ordem do CSS "translateZ rotateX rotateY rotateZ": gira em Z, Y, X, empurra em Z e projeta
function projetar(x, y, p, cx, cy) {
  const [a, b, c] = [p.a * GRAU, p.b * GRAU, p.c * GRAU]
  const x1 = x * Math.cos(c) - y * Math.sin(c)
  const y1 = x * Math.sin(c) + y * Math.cos(c)
  const x2 = x1 * Math.cos(b)
  const z2 = -x1 * Math.sin(b)
  const y3 = y1 * Math.cos(a) - z2 * Math.sin(a)
  const z3 = y1 * Math.sin(a) + z2 * Math.cos(a)
  const escala = PERSPECTIVA / (PERSPECTIVA - (z3 + p.z))
  return [cx + x2 * escala, cy + y3 * escala]
}

function Simbolo({ desenhar = false }) {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true">
      <circle cx="256" cy="256" r="191" fill="none" strokeWidth="35" className={desenhar ? 'intro-circulo' : 'intro-circulo-fatia'} pathLength="1" />
      <line x1="314" y1="156" x2="198" y2="356" strokeWidth="35" strokeLinecap="round" className={desenhar ? 'intro-traco' : 'intro-traco-fatia'} pathLength="1" />
    </svg>
  )
}

// Desenha um tentáculo como um tubo afinando: contorno escuro, corpo em degradê,
// faixa de luz no dorso e ventosas na barriga. pts = [{x, y, w, s}] (s de 0 a 1)
function desenharTentaculo(ctx, pts, cores) {
  const n = pts.length
  if (n < 2) return
  const normais = pts.map((p, i) => {
    const a = pts[Math.max(0, i - 1)]
    const b = pts[Math.min(n - 1, i + 1)]
    const dx = b.x - a.x
    const dy = b.y - a.y
    const d = Math.hypot(dx, dy) || 1
    return [-dy / d, dx / d]
  })
  ctx.lineCap = 'round'

  // Contorno (sombra)
  ctx.strokeStyle = rgb(cores.sombra)
  for (let i = 1; i < n; i++) {
    ctx.lineWidth = pts[i].w + 3
    ctx.beginPath()
    ctx.moveTo(pts[i - 1].x, pts[i - 1].y)
    ctx.lineTo(pts[i].x, pts[i].y)
    ctx.stroke()
  }
  // Corpo: escuro na base, azul da marca na ponta
  for (let i = 1; i < n; i++) {
    ctx.strokeStyle = rgb(misturarCor(cores.corpoBase, cores.corpoPonta, pts[i].s ** 1.4))
    ctx.lineWidth = pts[i].w
    ctx.beginPath()
    ctx.moveTo(pts[i - 1].x, pts[i - 1].y)
    ctx.lineTo(pts[i].x, pts[i].y)
    ctx.stroke()
  }
  // Volume: faixa escura na barriga e faixa de luz no dorso (luz vindo de cima)
  const faixa = (lado, largura, cor, alfa) => {
    ctx.strokeStyle = `rgba(${cor[0]},${cor[1]},${cor[2]},${alfa})`
    ctx.lineCap = 'butt'
    for (let i = 1; i < n; i++) {
      const p0 = pts[i - 1]
      const p1 = pts[i]
      const sinal = normais[i][1] < 0 ? 1 : -1 // escolhe o lado virado para cima
      const o0 = p0.w * lado * sinal
      const o1 = p1.w * lado * sinal
      ctx.lineWidth = p1.w * largura
      ctx.beginPath()
      ctx.moveTo(p0.x + normais[i - 1][0] * o0, p0.y + normais[i - 1][1] * o0)
      ctx.lineTo(p1.x + normais[i][0] * o1, p1.y + normais[i][1] * o1)
      ctx.stroke()
    }
    ctx.lineCap = 'round'
  }
  faixa(-0.3, 0.3, cores.sombra, 0.45)
  faixa(0.22, 0.22, cores.brilho, 0.55)
  faixa(0.3, 0.07, [255, 255, 255], 0.7)

  // Ventosas na barriga
  for (let i = 4; i < n - 2; i += 3) {
    const p = pts[i]
    if (p.s < 0.3 || p.w < 5) continue
    const sinal = normais[i][1] < 0 ? -1 : 1
    const vx = p.x + normais[i][0] * p.w * 0.34 * sinal
    const vy = p.y + normais[i][1] * p.w * 0.34 * sinal
    const r = p.w * 0.17
    ctx.fillStyle = rgb(cores.sombra)
    ctx.beginPath()
    ctx.arc(vx, vy, r * 1.25, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = `rgba(${cores.ventosa[0]},${cores.ventosa[1]},${cores.ventosa[2]},0.85)`
    ctx.beginPath()
    ctx.arc(vx, vy, r, 0, Math.PI * 2)
    ctx.fill()
  }
}

function useTentaculos(atras, frente, lente, cena) {
  useEffect(() => {
    const telas = [atras.current, frente.current]
    const [ctxA, ctxF] = telas.map((c) => c.getContext('2d'))
    const L = LINHA_DO_TEMPO
    let w = 0
    let h = 0
    let cx = 0
    let cy = 0
    let raio = 0

    // Mede a tela e a posição do símbolo. Roda a cada quadro: no celular a barra de endereço
    // aparece e some e muda a altura da tela no meio da abertura (nem sempre com evento de
    // resize), e os tentáculos precisam continuar mirando onde o símbolo está de fato.
    function medir() {
      const largura = telas[0].clientWidth
      const altura = telas[0].clientHeight
      const dpr = Math.min(devicePixelRatio || 1, 2)
      if (largura !== w || altura !== h || telas[0].width !== Math.round(largura * dpr)) {
        w = largura
        h = altura
        for (const c of telas) {
          c.width = Math.round(w * dpr)
          c.height = Math.round(h * dpr)
          c.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0)
        }
      }
      // Relativo à própria tela de desenho (e não à janela), para nunca desalinhar
      const base = telas[0].getBoundingClientRect()
      const r = lente.current.getBoundingClientRect()
      cx = r.left - base.left + r.width / 2
      cy = r.top - base.top + r.height / 2
      raio = (r.width * 191) / 512
    }
    medir()

    const escuro = document.documentElement.dataset.theme === 'dark'
    const cores = escuro ? CORES.escuro : CORES.claro
    const total = w < 700 ? 5 : 7
    const grossura = Math.max(24, Math.min(64, Math.min(w, h) / 13))

    // Cada tentáculo nasce fora da tela, numa direção em volta do centro
    const tentaculos = Array.from({ length: total }, (_, i) => {
      const angulo = (i / total) * Math.PI * 2 + 0.35 + (Math.random() - 0.5) * 0.35
      return {
        angulo,
        fase: Math.random() * Math.PI * 2,
        atraso: Math.random() * 0.15,
        grossura: grossura * (0.8 + Math.random() * 0.4),
        enrola: i % 2 ? 1 : -1, // sentido em que a ponta abraça o anel
        frente: i % 2 === 0, // metade passa por cima do símbolo, metade por trás
        soltouEm: null,
      }
    })

    // Distância do centro até fora da borda da tela, na direção do ângulo
    function foraDaTela(angulo, margem) {
      const dx = Math.cos(angulo)
      const dy = Math.sin(angulo)
      const d = Math.min(Math.abs(w / 2 / (dx || 1e-6)), Math.abs(h / 2 / (dy || 1e-6)))
      return [cx + dx * (d + margem), cy + dy * (d + margem)]
    }

    function espinha(tt, t, p) {
      // Base: entra um pouco na tela durante o ato, sai no fim
      const recolher = t > L.solta ? saida(limitar((t - L.solta - tt.atraso * 0.5) / (L.recolhe - L.solta - 0.1))) : 0
      const chegar = saida(limitar(t / 0.5))
      // Redemoinho: enquanto seguram, as bases giram junto com o símbolo (com um leve atraso,
      // que curva o corpo), assim os tentáculos não se cruzam por cima da logo
      const giroDesde = (pose(Math.min(Math.max(t, L.agarra), L.solta)).c - pose(L.agarra).c) * GRAU
      const anguloBase = tt.angulo + giroDesde * 0.9
      const base = foraDaTela(anguloBase, misturar(140, -30, chegar) + recolher * 900)

      // Ponto de agarre no anel, em coordenadas do próprio símbolo (antes do giro)
      const local = tt.angulo - pose(L.agarra).c * GRAU
      const pontoNoAnel = (desvio) => projetar(Math.cos(local + desvio) * raio, Math.sin(local + desvio) * raio, p, cx, cy)

      let ponta
      let abraco = 0 // 0..1: quanto da ponta está enrolada no anel
      let onda = 1 // amplitude da ondulação
      if (t < L.agarra) {
        const k = saida(limitar((t - tt.atraso) / (L.agarra - tt.atraso)))
        const alvo = pontoNoAnel(0)
        const inicio = foraDaTela(tt.angulo, 60)
        ponta = [misturar(inicio[0], alvo[0], k), misturar(inicio[1], alvo[1], k)]
        abraco = limitar((k - 0.8) / 0.2)
        onda = 1.2 - k * 0.6
      } else if (t < L.solta) {
        ponta = pontoNoAnel(0)
        abraco = 1
        onda = t < L.giraFim ? 0.35 : 0.15 // tensionado enquanto segura
        tt.soltouEm = ponta
      } else {
        // Soltou: chicoteia para fora e recolhe junto com a base
        const k = limitar((t - L.solta) / (L.recolhe - L.solta))
        const de = tt.soltouEm || pontoNoAnel(0)
        // Solta rápido (sai de cima do símbolo antes do impacto) e recolhe junto com a base
        const e = saida(limitar(k * 1.6))
        ponta = [misturar(de[0], base[0], e), misturar(de[1], base[1], e)]
        abraco = 1 - limitar(k * 10)
        onda = 2.2 * (1 - k) + 0.3
      }

      // Corpo: curva cúbica da base à ponta + onda que corre pelo tentáculo
      const dx = ponta[0] - base[0]
      const dy = ponta[1] - base[1]
      const comp = Math.hypot(dx, dy) || 1
      const [nx, ny] = [-dy / comp, dx / comp]
      const curva = Math.sin(t * 2.2 + tt.fase) * comp * 0.18
      const c1 = [base[0] + dx * 0.33 + nx * curva, base[1] + dy * 0.33 + ny * curva]
      const c2 = [base[0] + dx * 0.7 - nx * curva * 0.8, base[1] + dy * 0.7 - ny * curva * 0.8]
      const N = 34
      const fimCorpo = 0.84 // o resto (16%) é a parte que abraça o anel
      const pts = []
      for (let i = 0; i <= N; i++) {
        const u = i / N
        const m = 1 - u
        let x = m ** 3 * base[0] + 3 * m * m * u * c1[0] + 3 * m * u * u * c2[0] + u ** 3 * ponta[0]
        let y = m ** 3 * base[1] + 3 * m * m * u * c1[1] + 3 * m * u * u * c2[1] + u ** 3 * ponta[1]
        const ond = Math.sin(u * Math.PI * 2.4 - t * 7 + tt.fase) * Math.sin(Math.PI * u) * Math.min(60, comp * 0.08) * onda
        x += nx * ond
        y += ny * ond
        const s = u * fimCorpo
        pts.push({ x, y, s, w: tt.grossura * (1 - 0.8 * s ** 0.85) })
      }

      // Ponta enrolada: segue o anel do símbolo a partir do ponto de agarre
      const abracoPts = []
      if (abraco > 0) {
        const M = 12
        abracoPts.push(pts[pts.length - 1])
        for (let j = 1; j <= M; j++) {
          const v = j / M
          const [x, y] = pontoNoAnel(tt.enrola * v * 1.1 * abraco)
          const s = fimCorpo + v * (1 - fimCorpo)
          abracoPts.push({ x, y, s, w: Math.max(2, tt.grossura * (1 - 0.82 * s) * (1 - v * 0.6)) })
        }
      }
      return { pts, abracoPts }
    }

    // Onda de choque e tremor da tela no impacto
    function impacto(t) {
      const s = t - L.impacto
      if (s < 0 || s > 0.7) {
        cena.current.style.transform = ''
        return
      }
      const forca = Math.exp(-7 * s) * Math.min(w, h) * 0.018
      cena.current.style.transform = `translate(${(Math.random() - 0.5) * forca}px, ${(Math.random() - 0.5) * forca}px)`
      for (let i = 0; i < 2; i++) {
        const k = limitar((s - i * 0.08) / 0.6)
        if (k <= 0) continue
        ctxF.strokeStyle = `rgba(${cores.onda[0]},${cores.onda[1]},${cores.onda[2]},${(1 - k) * 0.6})`
        ctxF.lineWidth = (1 - k) * 14 + 1
        ctxF.beginPath()
        ctxF.arc(cx, cy, raio * (1.1 + saida(k) * 5), 0, Math.PI * 2)
        ctxF.stroke()
      }
    }

    const giro = lente.current.firstElementChild
    const inicio = performance.now()
    // Só no servidor de desenvolvimento: ?quadro=1.5 congela a abertura em 1,5s para inspecionar
    const congelado = import.meta.env.DEV ? parseFloat(new URLSearchParams(location.search).get('quadro')) : NaN
    if (!Number.isNaN(congelado)) {
      for (const a of cena.current.closest('.intro').getAnimations({ subtree: true })) {
        a.pause()
        a.currentTime = congelado * 1000
      }
    }
    let quadro = 0
    function animar(agora) {
      if (!cena.current) return // a abertura já foi desmontada (pulada)
      const t = Number.isNaN(congelado) ? (agora - inicio) / 1000 : congelado
      medir()
      const p = pose(t)
      giro.style.transform = `translateZ(${p.z}px) rotateX(${p.a}deg) rotateY(${p.b}deg) rotateZ(${p.c}deg)`

      ctxA.clearRect(0, 0, w, h)
      ctxF.clearRect(0, 0, w, h)
      if (t < L.recolhe + 0.2) {
        for (const tt of tentaculos) {
          const { pts, abracoPts } = espinha(tt, t, p)
          desenharTentaculo(tt.frente ? ctxF : ctxA, pts, cores)
          // A ponta que abraça o anel passa sempre por cima do símbolo
          if (abracoPts.length) desenharTentaculo(ctxF, abracoPts, cores)
        }
      }
      impacto(t)
      if (t < DURACAO / 1000) quadro = requestAnimationFrame(animar)
    }
    quadro = requestAnimationFrame(animar)

    return () => {
      cancelAnimationFrame(quadro)
    }
  }, [atras, frente, lente, cena])
}

export default function Intro() {
  const [ativa, setAtiva] = useState(() => document.documentElement.hasAttribute('data-intro'))
  const [saindo, setSaindo] = useState(false)
  if (!ativa) return null
  return <Abertura saindo={saindo} pular={() => { setSaindo(true); setTimeout(() => setAtiva(false), 350) }} fim={() => setAtiva(false)} />
}

function Abertura({ saindo, pular, fim }) {
  const atras = useRef(null)
  const frente = useRef(null)
  const lente = useRef(null)
  const cena = useRef(null)
  useTentaculos(atras, frente, lente, cena)

  useEffect(() => {
    const raiz = document.documentElement
    raiz.classList.add('intro-rodando')
    const congelado = import.meta.env.DEV && new URLSearchParams(location.search).has('quadro')
    const t = congelado ? 0 : setTimeout(fim, DURACAO)
    addEventListener('keydown', pular, { once: true })
    return () => {
      clearTimeout(t)
      removeEventListener('keydown', pular)
      raiz.classList.remove('intro-rodando')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`intro ${saindo ? 'intro-pulando' : ''}`} onClick={pular} role="presentation">
      <div ref={cena} className="intro-cena">
        <div className="intro-brilho" aria-hidden="true" />
        <canvas ref={atras} className="intro-tela" aria-hidden="true" />
        <div className="intro-palco">
          <div ref={lente} className="intro-lente">
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
        <canvas ref={frente} className="intro-tela intro-tela-frente" aria-hidden="true" />
        <p className="intro-assinatura" aria-hidden="true">
          marcos dev
        </p>
      </div>
      <p className="sr-only">Carregando o portfólio de Marcos</p>
    </div>
  )
}
