import { Link } from 'react-router-dom'

export function Sobre(){
    return(
        <div>
            <h1>Bem vindo a página Sobre!</h1>
            <br />

            <Link to="/">Home</Link>
            <Link to="/produto">Produto</Link>
            <Link to="/contato">Contato</Link>
        </div>
    )
}