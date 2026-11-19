// Quebra o texto em palavras que sobem de dentro de uma máscara, uma de cada vez
export default function Palavras({ texto }) {
  const palavras = texto.split(' ')
  return palavras.map((p, i) => (
    <span key={i}>
      <span className="palavra">
        <span style={{ '--i': i }}>{p}</span>
      </span>
      {i < palavras.length - 1 && ' '}
    </span>
  ))
}
