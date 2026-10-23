import Secao from '../components/Secao.jsx'
import { gruposTecnologias, projetos } from '../data.js'

// Projetos que usam cada tecnologia (sem diferenciar "Java / Spring Boot" de "Java", etc.)
function usadoEm(tecnologia) {
  return projetos.filter((p) => p.tecnologias.includes(tecnologia)).map((p) => p.nome)
}

export default function Tecnologias() {
  return (
    <Secao id="tecnologias" numero="03" rotulo="Tecnologias" titulo="Com o que eu trabalho">
      <p className="max-w-2xl text-lg leading-relaxed text-subtle">
        Ferramentas que uso no dia a dia, do front-end ao servidor e ao banco de dados.
      </p>

      <div className="escalonado mt-12 grid gap-10 sm:grid-cols-2">
        {gruposTecnologias.map(({ grupo, itens }) => (
          <div key={grupo}>
            <h3 className="font-mono text-xs tracking-[0.2em] text-subtle uppercase">{grupo}</h3>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {itens.map((t) => {
                const projetosComTech = usadoEm(t)
                return (
                  <li key={t} className="flex items-baseline justify-between gap-4 py-4">
                    <span className="text-lg font-medium">{t}</span>
                    {projetosComTech.length > 0 && (
                      <span className="text-right font-mono text-xs text-subtle">
                        <span className="sr-only">usado em </span>
                        {projetosComTech.join(' · ')}
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </Secao>
  )
}
