import { Nome } from "../Nome"
import { useContext } from "react"
import { UserContext } from "../../contexts/user"


export function Alunos(){
    const { qtdAlunos, mudaNome } = useContext(UserContext)
    return(
        <div>
            <h3>Quantidade de alunos: { qtdAlunos }</h3>
            <button onClick={ () => mudaNome('Roni')}>
                Mudar nome para Roni
            </button>
            <br /><br />
            <Nome />
        </div>
    )
}