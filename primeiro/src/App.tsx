import { useState } from 'react'

interface InfoAlunoProps{
  nome: string;
  idade: string;
}

export default function App(){

  const [ input, setInput ] = useState(""); //a primeira variavel é o que vai no value do input
  const [ idade, setIdade ] = useState("");  
  const [ contador, setContador ] = useState(0);

  const [infoAluno, setInfoAluno] = useState<InfoAlunoProps>(); //Igual fiz na idade na aula anterior mas usando uma tipagem de interface

  function mostrarAluno(){
    setInfoAluno({
      nome: input,
      idade: idade,
    })
  }

  function adicionar(){
    setContador(valorAtual => valorAtual + 1)
  }  
  function diminuir(){
    if(contador === 0){
      return
    }
    setContador(valorAtual => valorAtual - 1)
  }

  return(
    <div>
      <h1>Conhecendo useState</h1>

      <input 
        placeholder="Digite o nome"
        value={input} //pega o useState
        onChange={ (e) => setInput(e.target.value)} //sempre que digitado vai passar o valor no useState
      />
      <br /><br />
      <input 
        placeholder="Digite a Idade"
        value={idade} //pega o useState
        onChange={ (e) => setIdade(e.target.value)} //sempre que digitado vai passar o valor no useState
      />

      <br /><br />

      <button onClick={mostrarAluno}>Mostrar Aluno</button>

      <hr />

      <div>
        <h3>Bem Vindo: { infoAluno?.nome }</h3> 
        <h4>Bem Vindo: { infoAluno?.idade }</h4>
        {/* Acima ele coloca o ? para se tiver vazio não exibir nada */}
      </div>

      <hr />
      <br />

      <h1>Contator com useState</h1>
      <button onClick={adicionar}>+</button> {contador} <button onClick={diminuir}>-</button>
    </div>
  )
}

