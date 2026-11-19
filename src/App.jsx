import Cabecalho from './components/Cabecalho.jsx'
import Rodape from './components/Rodape.jsx'
import FundoAnimado from './components/FundoAnimado.jsx'
import useCenas from './useCenas.js'
import Inicio from './sections/Inicio.jsx'
import Projetos from './sections/Projetos.jsx'
import Sobre from './sections/Sobre.jsx'
import Tecnologias from './sections/Tecnologias.jsx'
import Contato from './sections/Contato.jsx'

export default function App() {
  useCenas()

  return (
    <>
      <FundoAnimado />
      <Cabecalho />
      <main id="conteudo">
        <Inicio />
        <Projetos />
        <Sobre />
        <Tecnologias />
        <Contato />
      </main>
      <Rodape />
    </>
  )
}
