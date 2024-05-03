import { createBrowserRouter } from 'react-router-dom'

import{ Home } from './pages/home'
import{ Sobre } from './pages/sobre'

const router = createBrowserRouter([
    {
        path: "/", //Quando estiver na raiz vai carregar a abaixo
        element: <Home/>
    },{
        path: "/sobre",
        element: <Sobre/>
    }
])

export { router };