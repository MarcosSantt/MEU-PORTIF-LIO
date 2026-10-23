import Secao from '../components/Secao.jsx'
import avatar from '../../assets/marca/logo/svg/avatar-escuro.svg'

// Para usar uma foto sua, importe-a aqui e troque `avatar` por ela.
const foto = avatar

const etapas = [
  ['Entender', 'Uma conversa para saber o que o seu negócio precisa, para quem é e o que conta como sucesso.'],
  ['Construir', 'Desenvolvimento em etapas curtas, com versões para você testar e opinar durante o caminho.'],
  ['Entregar', 'Publicação, domínio configurado e suporte depois do lançamento para os ajustes finais.'],
]

const fatos = [
  ['Local', 'Atibaia, SP'],
  ['Formação', 'Análise e Desenvolvimento de Sistemas · USF'],
  ['Atuação', 'Freelancer · sites e sistemas web'],
]

export default function Sobre() {
  return (
    <Secao id="sobre" numero="02" rotulo="Sobre" titulo="Prazer, Marcos.">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <img src={foto} alt="Avatar de Marcos" className="aspect-square w-32 rounded-2xl object-cover md:w-48" />
        </div>

        <div className="md:col-span-8">
          <div className="space-y-4 text-lg leading-relaxed text-subtle">
            <p>
              Sou desenvolvedor web freelancer em <span className="text-fg">Atibaia, SP</span>, e estudante de Análise e
              Desenvolvimento de Sistemas na <span className="text-fg">USF</span>.
            </p>
            <p>
              Crio sites que apresentam bem o negócio e sistemas que resolvem problemas reais do dia a dia, do controle
              de estoque a um quiz em tempo real. Gosto de entender o que o cliente precisa antes de escrever a primeira
              linha de código.
            </p>
          </div>

          <dl className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
            {fatos.map(([termo, valor]) => (
              <div key={termo}>
                <dt className="font-mono text-xs tracking-[0.15em] text-subtle uppercase">{termo}</dt>
                <dd className="mt-1.5 font-medium">{valor}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <h3 className="mt-20 font-mono text-xs tracking-[0.2em] text-subtle uppercase">Como eu trabalho</h3>
      <ol className="escalonado mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
        {etapas.map(([titulo, texto], i) => (
          <li key={titulo} className="bg-bg p-6 sm:p-8">
            <span className="font-mono text-sm text-brand">0{i + 1}</span>
            <p className="mt-4 text-lg font-bold">{titulo}</p>
            <p className="mt-2 leading-relaxed text-subtle">{texto}</p>
          </li>
        ))}
      </ol>
    </Secao>
  )
}
