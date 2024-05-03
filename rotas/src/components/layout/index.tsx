import { Outlet } from 'react-router-dom'
import { Header } from '../../components/header'


export function Layout(){
    return(
        <>
            <Header/>
            <Outlet/>
            <br /><br />
            <footer>
                <span>Todos os Direitos Reservador</span>
            </footer>
        </>
    )
}