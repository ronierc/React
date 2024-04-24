import { useState } from 'react'

export default function App(){

  const [ input, setInput ] = useState(""); //a primeira variavel é o que vai no value do input
  const [ idade, setIdade ] = useState<string | number>(""); // <string | number> faz aceitar qualquer valor se não seria somente string
  const [ aluno, setAluno ] = useState("Sem nenhum nome"); 

  function mostrarAluno(){
    setAluno(input)
    console.log(idade)
  }

  return(
    <div>
      <h1>Conhecendo useState</h1>

      <input 
        placeholder="Digite o nome"
        value={input} //pega o useState
        onChange={ (e) => setInput(e.target.value)} //sempre que digitado vai passar o valor no useState
      />
      <br />
      <input 
        placeholder="Digite a Idade"
        value={idade} //pega o useState
        onChange={ (e) => setIdade(e.target.value)} //sempre que digitado vai passar o valor no useState
      />

      <br />

      <button onClick={mostrarAluno}>Mostrar Aluno</button>

      <hr />

      <div>
        <h3>Bem Vindo: {aluno}</h3>
      </div>
    </div>
  )
}

