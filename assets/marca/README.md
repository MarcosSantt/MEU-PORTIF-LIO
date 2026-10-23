# Marcos Dev — identidade visual

Material da marca pessoal para usar no portfólio.

## Estrutura
- `index.html` — índice com links para as pranchas
- `pranchas/` — 5 pranchas de apresentação (1200×800), HTML estático
  1. Capa · 2. Símbolo e construção · 3. Versões · 4. Cores e tipografia · 5. Aplicações
- `logo/svg/` — logos vetoriais (texto em curvas)
- `logo/png/` — logos em PNG com fundo transparente, ícones e favicons

## Tokens da marca
| Nome        | Hex       | Uso                         |
|-------------|-----------|-----------------------------|
| Tinta       | `#0F1115` | texto, símbolo              |
| Papel       | `#FAFAF8` | fundo                       |
| Azul código | `#2563EB` | a barra, links, destaque    |
| Grafite     | `#5B6170` | texto secundário, "dev"     |
| Azul claro  | `#60A5FA` | destaque sobre fundo escuro |

Fontes (Google Fonts): **Manrope** (400/500/700) para marca e textos, **JetBrains Mono** (400) para legendas e código.

```css
:root {
  --ink: #0F1115;
  --paper: #FAFAF8;
  --accent: #2563EB;
  --muted: #5B6170;
  --accent-on-dark: #60A5FA;
  --font-sans: "Manrope", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

## Regras do símbolo
- Círculo e barra com a mesma espessura de traço
- Barra a 60°, centrada no círculo
- Área de proteção: metade do raio em volta
- Tamanho mínimo: 16 px na tela, 6 mm impresso
- Placeholders no verso do cartão: `[seu e-mail]`, `[seu site]`
