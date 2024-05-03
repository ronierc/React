import { Link, useParams } from 'react-router-dom'

export function Produto(){
    const { id } = useParams();

    return(
        <div>
            <h1>Bem vindo ao Produto {id}!</h1>
        </div>
    )
}