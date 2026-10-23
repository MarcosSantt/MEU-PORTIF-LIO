import simbolo from '../../assets/marca/logo/svg/simbolo.svg'
import simboloBranco from '../../assets/marca/logo/svg/simbolo-branco.svg'

const atraso = (s) => ({ '--atraso': `${s}s` })

export default function Inicio() {
  return (
    <section id="inicio" aria-labelledby="inicio-titulo" className="mx-auto max-w-5xl px-4 pt-16 pb-24 sm:px-6 sm:pt-28 sm:pb-36">
      <div className="entrada flex items-center gap-4">
        <img src={simbolo} alt="" className="size-12 dark:hidden" />
        <img src={simboloBranco} alt="" className="hidden size-12 dark:block" />
        <p className="font-mono text-xs tracking-[0.2em] text-subtle uppercase">Desenvolvedor web · Atibaia, SP</p>
      </div>

      <h1 id="inicio-titulo" className="entrada mt-10 max-w-3xl text-[2.6rem] leading-[1.05] font-bold tracking-tight sm:text-6xl lg:text-7xl" style={atraso(0.08)}>
        Sites e sistemas web feitos sob medida.
      </h1>

      <p className="entrada mt-6 max-w-xl text-lg leading-relaxed text-subtle" style={atraso(0.16)}>
        Do site que apresenta o seu negócio ao sistema que organiza o dia a dia da sua empresa. Código limpo,
        entrega no prazo e conversa direta com quem faz.
      </p>

      <div className="entrada mt-10 flex flex-wrap gap-3" style={atraso(0.24)}>
        <a href="#projetos" className="group inline-flex items-center gap-2 rounded-lg bg-fg px-5 py-3 font-medium text-bg transition-opacity hover:opacity-85">
          Ver projetos
          <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5">↓</span>
        </a>
        <a href="#contato" className="rounded-lg border border-line px-5 py-3 font-medium transition-colors hover:border-fg">
          Contato
        </a>
      </div>

      <p className="entrada mt-16 inline-flex items-center gap-2.5 font-mono text-xs text-subtle" style={atraso(0.32)}>
        <span className="relative flex size-2" aria-hidden="true">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60 motion-reduce:hidden" />
          <span className="relative inline-flex size-2 rounded-full bg-brand" />
        </span>
        Disponível para novos projetos
      </p>
    </section>
  )
}
