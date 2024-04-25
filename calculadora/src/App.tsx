import { useState, FormEvent } from 'react'
import './App.css'

import logoImg from './assets/logo.png'

interface infoProps{
  title: string,
  gasolina: string | number,
  alcool: string | number,
}

function App() {
  const [gasolinaInput, setGasolinaInput] = useState(0)
  const [alcoolInput, setAlcoolInput] = useState(0)
  const [info, setInfo] = useState<infoProps>();

/*
  Calculo: alcool / gasolina
  E se o resultado for menor que 0.7 compensa usar • alcool
*/

  function calcular(event: FormEvent){
    event.preventDefault(); //Não carregar a pagina ao executar
    
    let calculo = (alcoolInput / gasolinaInput)

    if(calculo <= 0.7){
      setInfo({
        title: 'Compensa Alcool',
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput),
      })
    } else {
      setInfo({
        title: 'Compensa Gasolina',
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput),
      })
    }
  }

  function formatarMoeda(valor: number){ //Javascript p; transformar em moeda
    let valorFormatado = valor.toLocaleString("pt-br",{
      style: "currency",
      currency: "BRL"
    })

    return valorFormatado
  }

  return (
      <div>
        <main className='container'>
          <img className="logo" src={logoImg} alt="Logo Calculadora de Gasolina ou Alcool" />
          <h1 className='title'>Qual melhor opção?</h1>

          <form className="form" onSubmit={calcular}>
            <label>Alcool (Preço por litro)</label>
            <input 
              className='input'
              type="number"
              placeholder='4,90'
              min={1} step={0.01}
              required
              value={alcoolInput}
              onChange={(e) => setAlcoolInput(Number(e.target.value))}
            />
            
            <label>Gasolina (Preço por litro)</label>
            <input 
              className='input'
              type="number"
              placeholder='4,90'
              min={1} step={0.01}
              required
              value={gasolinaInput}
              onChange={(e) => setGasolinaInput(Number(e.target.value))}
            />

            <input type="submit" value="Calcular" />

          </form>

          
          {info && Object.keys(info).length > 0 && ( //Valida para exibir somente se tiver um valor no Obj Info
            <section className='result'>
              <h2>{ info?.title }</h2>
  
              <span>Àlcool { info?.gasolina }</span>
              <span>Gasolnia { info?.alcool }</span>
            </section>
          )}

        </main>
      </div>
  )
}

export default App
