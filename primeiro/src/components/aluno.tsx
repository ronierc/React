import './aluno.css'

interface AlunoProps{
    nome: string;
    idade: number;
  }
  
  
 export function Aluno({ nome,idade }: AlunoProps){
    return(
      <div className='aluno'>
        <h1>Aluno: { nome }</h1>
        <h3>Idade: { idade }</h3>
      </div>
    )
  }