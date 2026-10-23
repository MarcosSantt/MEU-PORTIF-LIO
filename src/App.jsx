import Cabecalho from './components/Cabecalho.jsx'
import Rodape from './components/Rodape.jsx'
import Inicio from './sections/Inicio.jsx'
import Projetos from './sections/Projetos.jsx'
import Sobre from './sections/Sobre.jsx'
import Tecnologias from './sections/Tecnologias.jsx'
import Identidade from './sections/Identidade.jsx'
import Contato from './sections/Contato.jsx'

export default function App() {
  return (
    <>
      <Cabecalho />
      <main id="conteudo">
        <Inicio />
        <Projetos />
        <Sobre />
        <Tecnologias />
        <Identidade />
        <Contato />
      </main>
      <Rodape />
    </>
  )
}
