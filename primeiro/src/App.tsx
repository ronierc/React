export default function App(){
  return(
    <div>
      <h1>Meu projeto</h1>

      <Aluno nome="Ronier" idade={23}/>
      <Aluno nome="Maria" idade={12}/>
    </div>
  )
}

interface AlunoProps{
  nome: string;
  idade: number;
}


function Aluno({ nome,idade }: AlunoProps){
  return(
    <div>
      <h1>Aluno: { nome }</h1>
      <h3>Idade: { idade }</h3>
    </div>
  )
}