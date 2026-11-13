// Conteúdo do portfólio — edite aqui.
//
// Imagens de projeto: coloque o arquivo em src/assets/projetos/ e importe no topo, ex.:
//   import meuProjeto from './assets/projetos/meu-projeto.webp'
// depois use `imagem: meuProjeto`. Proporção ideal: 16:10 (ex.: 1600×1000).

export const projetos = [
  {
    nome: 'Elas no Padrão',
    tipo: 'Loja virtual',
    resumo: 'Loja online de joias e acessórios, feita do zero.',
    descricao:
      'Site próprio com catálogo, sacola e painel administrativo com controle de estoque. Os produtos também alimentam o catálogo do Instagram e do WhatsApp.',
    tecnologias: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Supabase', 'Cloudflare Pages'],
    imagem: null,
    // Site mostrado ao vivo no card do projeto (no lugar da imagem)
    site: 'https://elasnopadrao.com.br',
    // Página com o site real rodando dentro de um celular (arquivo em public/)
    demo: `${import.meta.env.BASE_URL}demo-elas-no-padrao.html`,
    github: '',
  },
  {
    nome: 'LD Concept',
    tipo: 'Vitrine digital',
    resumo: 'Vitrine de moda feminina com pedido pelo WhatsApp.',
    descricao:
      'Catálogo de peças em que a cliente monta a sua seleção e envia direto para o WhatsApp da loja, com a mensagem pronta. A própria loja cadastra e edita as peças pelo celular, num painel administrativo.',
    tecnologias: ['React', 'TypeScript', 'Vite', 'Decap CMS', 'Cloudflare Workers'],
    imagem: null,
    // Site mostrado ao vivo no card do projeto (no lugar da imagem)
    site: 'https://ld-concept.marcoseduardo07666.workers.dev',
    demo: 'https://ld-concept.marcoseduardo07666.workers.dev',
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
  email: 'marcoseduardo07666@gmail.com',
  github: 'https://github.com/MarcosSantt',
  linkedin: 'https://www.linkedin.com/in/marcos-eduardo-dos-santos-sousa-3773aa3b6',
  whatsapp: '5511953035526',
}
