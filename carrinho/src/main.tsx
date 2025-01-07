import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import './index.css'

import CartProvider from './contexts/CartContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <RouterProvider router={router}/>
    </CartProvider>
  </StrictMode>,
)
