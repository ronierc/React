import { createBrowserRouter } from 'react-router-dom'

import { Home } from './pages/home'
import { Admin } from './pages/admin'
import { Networks } from './pages/networks'
import { Login } from './pages/login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },{
    path: '/admin',
    element: <Admin/>
  },{
    path: '/admin/social',
    element: <Networks/>
  },{
    path: '/login',
    element: <Login/>
  }
])

export {router}
