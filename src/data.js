// Conteúdo do portfólio — edite aqui.
//
// Imagens de projeto: coloque o arquivo em src/assets/projetos/ e importe no topo, ex.:
//   import luzEFe from './assets/projetos/luz-e-fe.webp'
// depois use `imagem: luzEFe`. Proporção ideal: 16:10 (ex.: 1600×1000).

export const projetos = [
  {
    nome: 'Luz e Fé',
    tipo: 'Aplicação web em tempo real',
    resumo: 'Quiz em tempo real no estilo Kahoot para a catequese.',
    descricao:
      'Os catequizandos entram pelo celular e respondem às perguntas ao mesmo tempo, com o resultado aparecendo na hora para toda a turma.',
    tecnologias: ['React', 'Vite', 'Tailwind', 'Supabase Realtime', 'Vercel'],
    imagem: null,
    demo: '',
    github: '',
  },
  {
    nome: 'EstoqueControl',
    cliente: 'Versah',
    tipo: 'Sistema de gestão',
    resumo: 'Sistema de controle de estoque.',
    descricao:
      'Sistema web com API própria e banco de dados relacional para registrar produtos, entradas e saídas do estoque.',
    tecnologias: ['Node.js', 'Express', 'PostgreSQL', 'Supabase', 'Render', 'Vercel'],
    imagem: null,
    demo: '',
    github: '',
  },
  {
    nome: 'Kriancê',
    tipo: 'Site promocional',
    resumo: 'Site promocional para animação de festas infantis.',
    descricao: 'Site para apresentar os serviços de animação de festas e facilitar o contato com novos clientes.',
    tecnologias: [], // [preencher]
    imagem: null,
    demo: '',
    github: '',
  },
]

export const gruposTecnologias = [
  { grupo: 'Front-end', itens: ['React', 'Vite', 'Tailwind'] },
  { grupo: 'Back-end', itens: ['Node.js', 'Express', 'Java / Spring Boot'] },
  { grupo: 'Dados', itens: ['PostgreSQL', 'Supabase'] },
  { grupo: 'Infraestrutura', itens: ['Docker'] },
]

// Deixe `link` vazio enquanto não tiver; o item aparece como placeholder.
// WhatsApp: só números com DDI e DDD, ex.: '5511999999999'.
export const contatos = {
  email: '',
  github: '',
  linkedin: '',
  whatsapp: '',
}
