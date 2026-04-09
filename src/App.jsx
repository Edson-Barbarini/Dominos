//Edson e Lucas Volpe, trabalho deve ser vizualisado para celular 

import { useState } from 'react'
import './App.css'


const pizzas = [
  { id: 1, nome: 'Pepperoni Clássica',  descricao: 'Molho de tomate, mussarela e pepperoni',        preco: 49.90, foto: '/pizza-peperoni.webp', tag: 'novo'  },
  { id: 2, nome: 'Portuguesa',          descricao: 'Presunto, ovo, cebola, azeitona e mussarela',    preco: 47.90, foto: '/portuguesa.png', tag: null    },
  { id: 3, nome: 'Frango com Catupiry', descricao: 'Frango desfiado ao molho e catupiry original',   preco: 52.90, foto: '/fran-catupiry.jpg', tag: 'promo' },
  { id: 4, nome: 'Brócolis ',       descricao: 'Legumes grelhados, pimentão e mussarela',        preco: 44.90, foto: '/brocolis.jpg', tag: 'novo'  },
  { id: 5, nome: 'Calabresa Especial',  descricao: 'Calabresa fatiada, cebola e orégano',            preco: 45.90, foto: '/calabresa.jpg', tag: null   },
  { id: 6, nome: 'Quatro Queijos',      descricao: 'Mussarela, provolone, parmesão e gorgonzola',    preco: 55.90, foto: '/quatro-queijo.jpg', tag: 'promo' },
]

const cupons = [
  { id: 1, codigo: 'DOM10OFF',    descricao: '10% de desconto em qualquer pizza',          validade: 'Válido até 30/04/2025',      emoji: '💰' },
  { id: 2, codigo: 'FRETEGRATIS', descricao: 'Frete grátis no próximo pedido',              validade: 'Válido até 20/04/2025',      emoji: '🚗' },
  { id: 3, codigo: 'SEGUNDA2X1',  descricao: 'Compre 1 pizza e leve 2 toda segunda-feira', validade: 'Toda segunda-feira',         emoji: '🎉' },
  { id: 4, codigo: 'PRIMEIROAPP', descricao: 'R$ 15,00 de desconto no 1º pedido pelo app', validade: 'Apenas para novos clientes', emoji: '📱' },
]

function App() {

  const [categoriaAtiva, setCategoriaAtiva] = useState('pizzas')


  const [menuAberto, setMenuAberto] = useState(false)


  const [contadorCliques, setContadorCliques] = useState(0)

  const [copiados, setCopiados] = useState({})

  function selecionarCategoria(categoria) {
    setCategoriaAtiva(categoria)                    
    setContadorCliques(anterior => anterior + 1)   
    setMenuAberto(false)                           
  }
  function copiarCupom(id, codigo) {
    navigator.clipboard.writeText(codigo).catch(() => {})

    setCopiados(anterior => ({ ...anterior, [id]: true }))

    setTimeout(() => {
      setCopiados(anterior => ({ ...anterior, [id]: false }))
    }, 2000)
  }
  return (
    <div className="container">
    <header className="header">
      <h1 className="header-titulo">
        <img src="./logo2-domino.png" alt="logo" className="logo" /> 
        Domino's Pizza
      </h1>
      <p className="header-subtitulo">Peça online e receba quentinho!</p>
    </header>
      <div className="botoes-container">
        <button
          className={`botao-categoria ${categoriaAtiva === 'pizzas' ? 'ativo' : ''}`}
          onClick={() => selecionarCategoria('pizzas')}
        >
          🍕 Cardápio de Pizzas
        </button>
        <button
          className={`botao-categoria ${categoriaAtiva === 'cupons' ? 'ativo' : ''}`}
          onClick={() => selecionarCategoria('cupons')}
        >
          🎟️ Cupons de Desconto
        </button>
      </div>
      <main className="main">
        {categoriaAtiva === '' && (
          <div className="mensagem-inicial">
            <p>👆 Selecione uma categoria acima para explorar!</p>
          </div>
        )}
        {categoriaAtiva === 'pizzas' && (
          <section>
            <h2 className="secao-titulo">Nosso Cardápio</h2>
            <div className="grid">
              {pizzas.map(pizza => (
                <div key={pizza.id} className="card">

                  <div className="card-foto">
                    <img src={pizza.foto} alt={pizza.nome} className="foto-pizza" />
                  </div>

                  <div className="card-corpo">
                    <h3 className="card-nome">{pizza.nome}</h3>
                    <p className="card-descricao">{pizza.descricao}</p>

                    <div className="card-rodape">
                      <span className="preco">
                        R$ {pizza.preco.toFixed(2).replace('.', ',')}
                      </span>

                      {pizza.tag === 'novo'  && <span className="tag-novo">Novo</span>}
                      {pizza.tag === 'promo' && <span className="tag-promo">Promoção</span>}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </section>
        )}
        {categoriaAtiva === 'cupons' && (
          <section>
            <h2 className="secao-titulo">Cupons Disponíveis</h2>
            <div className="grid-cupons">

              {cupons.map(cupom => (
                <div key={cupom.id} className="cupom-card">

                  <div className="cupom-emoji">{cupom.emoji}</div>
                  <p className="cupom-codigo">{cupom.codigo}</p>
                  <p className="cupom-descricao">{cupom.descricao}</p>
                  <p className="cupom-validade">{cupom.validade}</p>

                  <button
                    className={`botao-copiar ${copiados[cupom.id] ? 'copiado' : ''}`}
                    onClick={() => copiarCupom(cupom.id, cupom.codigo)}
                  >
                    {copiados[cupom.id] ? '✓ Copiado!' : 'Copiar código'}
                  </button>

                </div>
              ))}

            </div>
          </section>
)}
      </main>
      <footer className="rodape">
        <p>Feito pelos Melhores Devs: Edson Fernando e Lucas Volpe</p>
      </footer>
    </div>
  );
}

export default App;