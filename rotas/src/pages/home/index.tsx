import { Link } from 'react-router-dom'

export function Home(){
    return(
        <div>
            <h1>Bem vindo a página Home!</h1>
            <span>Minha primeira página com navegação</span>
        <br />

        <Link to="/sobre">Sobre</Link>
        </div>
    )
}