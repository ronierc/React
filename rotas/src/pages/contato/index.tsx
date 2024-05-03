import { Link } from 'react-router-dom'

export function Contato(){
    return(
        <div>
            <h1>Bem vindo a página Contato!</h1>
            <br />
            <h3>Tel: 1234-5678</h3>

            <Link to="/">Home</Link>
            <Link to="/sobre">Sobre</Link>
            <Link to="/produto">Produto</Link>
        </div>
    )
}