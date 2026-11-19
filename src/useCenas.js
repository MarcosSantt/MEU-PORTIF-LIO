import { useEffect } from 'react'

// Cada filho de .escalonado entra quando aparece na tela. Os que aparecem juntos
// entram em sequência (0,12s entre um e outro).
export default function useCenas() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entradas) => {
        let ordem = 0
        for (const e of entradas) {
          if (!e.isIntersecting) continue
          e.target.style.setProperty('--atraso-cena', `${ordem++ * 0.12}s`)
          e.target.classList.add('visivel')
          observer.unobserve(e.target)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    document.querySelectorAll('.escalonado > *').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
