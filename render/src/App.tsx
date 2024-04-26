import { useState } from 'react'
import './App.css'

function App() {
  const [userName, setUserName] = useState("Ronier")

  return (
      <div>
        
        {userName.length >= 5 && <h1>Username muito grande!</h1>}

        {userName && (
          <div>
            <h1>Valida se existe!</h1>
            <span>Bem vindo {userName}</span>
          </div>
        )}

      </div>
  )
}

export default App
