import { useState, FormEvent } from 'react'

interface ResultadoProps{
  nome: string,
  idade: number,
}

function App() {
  const [nome, setNome] = useState("")
  const [anoNasc, setAnoNasc] = useState(0)
  const [idade, setIdade] = useState<ResultadoProps>()

  function caluclarIdade(event: FormEvent){
    event.preventDefault();
    const currentYear = new Date().getUTCFullYear();
    setIdade({
      nome: nome,
      idade: currentYear - anoNasc
    })


    setNome("")
    setAnoNasc(0)
  }

  return (
      <div>
        <h1>Descubra sua idade</h1>
          <form onSubmit={caluclarIdade} className='container'>
            <label>Qual seu nome</label>
            <input 
              type="text" 
              placeholder='Digite seu nome'
              onChange={(e) => setNome(e.target.value)}
              value={nome}
              required
            />
            <label>Ano em que nasceu:</label>
            <input 
              type="number" 
              placeholder='Digite o ano de nascumento'
              onChange={(e) => setAnoNasc(Number(e.target.value))}
              value={anoNasc}
              required
            />            
            <button type='submit' onClick={caluclarIdade}>Calcular Idade</button>
          </form>

      {idade && idade.nome !== '' && (
        <section className="result">
          <h2>{idade?.nome} você tem: <span>{idade?.idade} anos</span> </h2>
        </section>
      )}
      </div>
  )
}

export default App
