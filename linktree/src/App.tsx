import { createBrowserRouter } from 'react-router-dom'

import { Home } from './pages/home'
import { Admin } from './pages/admin'
import { Networks } from './pages/networks'
import { Login } from './pages/login'
import { ErrorPage } from './pages/error'

import { Private } from './routes/Private'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },{
    path: '/login',
    element: <Login/>
  },{
    path: '/admin',
    element: <Private><Admin/></Private> //Passa pelo Private se passar por ele ai sim acessa o Admin
  },{
    path: '/admin/social',
    element: <Private><Networks/></Private>
  },{
    path: '*',
    element: <ErrorPage/>
  }
])

export {router}
