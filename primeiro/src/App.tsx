import { Header } from './components/header'
import { Aluno } from './components/aluno'
import { Footer } from './components/footer'

export default function App(){
  return(
    <div>
      <Header title='Alunos do React + TypeScript'/>

      <Aluno nome="Ronier" idade={23}/>
      <Aluno nome="Maria" idade={12}/>
      
      <Footer/>
    </div>
  )
}

