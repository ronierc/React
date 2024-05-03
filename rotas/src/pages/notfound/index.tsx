import { Link } from 'react-router-dom'

export function NotFound(){
    return(
        <div>
            <h1>Ops, Essa pagina não existe!</h1>
            <br />

            <Link to="/">Voltar a Home</Link>
        </div>
    )
}