import { useState } from 'react'
import logoImg from './assets/logo.png'
import './App.css'

function App() {
  const [textoFrase, setTextoFrase] = useState("")
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(0)

  const allFrases = [
    {
      id: 1,
      nome: "Motivação",
      frases: [
        "Acredite em si mesmo e você será imparável.",
        "Cada dia é uma nova oportunidade para brilhar.",
        "Se você pode sonhar, pode realizar.",
        "A persistência leva ao sucesso.",
        "A jornada mais longa começa com um único passo.",
        "Sua determinação é sua maior força.",
        "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
        "Encare cada desafio como uma chance de crescimento.",
        "Grandes coisas nunca vêm da zona de conforto.",
        "Mude seus pensamentos e você mudará seu mundo.",
        "A adversidade revela o verdadeiro campeão que há em você.",
        "Você é mais forte do que imagina.",
        "O que você faz hoje pode melhorar todos os amanhãs.",
        "Acredite no poder dos seus sonhos e siga em frente."
      ]
    },{
      id: 2,
      nome: "Bem Estar",
      frases: [
        "Temos na filosofia uma medicina muito agradável, pois, nas outras, sentimos o bem-estar apenas depois da cura; esta faz bem e cura ao mesmo tempo.",
        "Quando a alegria se torna tristeza e o bem-estar infortúnio, as almas pacientes extrairão prazer mesmo da dor.",
        "Aquele que está bem pode fazer muita coisa supérflua e insensata. Quando o bem-estar acaba e começa a aflição, começa a educação que a vida nos quer dar.",
        "O bem-estar na vida obtém-se com o aperfeiçoamento da convivência entre os homens."
      ]
    },{
      id: 3,
      nome: "Academia",
      frases: [
        "A pior desistência é aquela que ocorre antes de sequer tentar.",
        "Você não pode desistir agora da maromba. Seu corpo e sua mente agradecem!",
        "Nos dias bons eu me esforço, nos dias ruins eu me esforço mais ainda.",
        "Cada minuto de treino pesado é uma oportunidade para se superar e chegar mais perto do seu objetivo."
      ]
    }
  ]

  function handleSwitchCategory(index: number){
    setCategoriaSelecionada(index)
  }

  function gerarFrase(index: number){
    let numeroAleatorio = Math.floor(Math.random() * allFrases[categoriaSelecionada].frases.length) // gera de 0 até o tamanho do array
    
    setTextoFrase(`"${allFrases[categoriaSelecionada].frases[numeroAleatorio]}"`)
  }

  return (
      <div className='container'>
        <img src={logoImg} className="logo" alt="Logo"/>
          
        <h2 className='title'>Categorias</h2>
        <section className='category-area'>
          {allFrases.map((item, index) => (
            <button 
              key={item.id} 
              className='category-button'
              style={{
                borderWidth: item.nome === allFrases[categoriaSelecionada].nome ? 2 : 0,
                borderColor: "#1fa4db"
              }}
              onClick={ () => handleSwitchCategory(index) }
            >
              {item.nome}
            </button>
          ))}
        </section>

        <button 
          className='button-frase'
          onClick={ () => gerarFrase(categoriaSelecionada)}
        >Gerar Frases</button>
        
        {textoFrase !== '' && <p className='texto-frase'>{textoFrase}</p>}
      </div>
  )
}

export default App
