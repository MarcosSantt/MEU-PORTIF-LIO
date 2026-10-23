import { useEffect, useRef } from 'react'

// Seção com rótulo em mono no estilo das pranchas ("02 — PROJETOS") e entrada suave
export default function Secao({ id, numero, rotulo, titulo, children }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          el.classList.add('visivel')
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="border-t border-line">
      <div ref={ref} className="revelar mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="font-mono text-xs tracking-[0.2em] text-subtle uppercase">
          {numero} — {rotulo}
        </p>
        <h2 id={`${id}-titulo`} className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {titulo}
        </h2>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}
