import { Link, useParams } from 'react-router-dom'

export function Produto(){
    const { id } = useParams();

    return(
        <div>
            <h1>Bem vindo ao Produto {id}!</h1>
            <br />

            <Link to="/">Home</Link>
            <Link to="/sobre">Sobre</Link>
            <Link to="/contato">Contato</Link>
        </div>
    )
}