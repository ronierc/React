import { useState } from 'react'

interface userProps{
  nome: string;
  cargo: string;
}

export default function App(){

  const [user, setUser] = useState<userProps>({
    nome: "Visitante",
    cargo: "",
  })

  function handleLogin(){
    setUser({
      nome: "Sujeito Programador",
      cargo: "Programador",
    })
  }
  function handleLogout(){
    setUser({
      nome: "Visitante",
      cargo: "",
    })
  }

  return(
    <div>
      <h1>Conhecendo useState</h1>

      <button onClick={handleLogin}>
        Entrar
      </button>
      <button onClick={handleLogout}>
        Logout
      </button>

      <h4>Olá { user.nome }</h4>
      <strong>{ user.cargo }</strong>
    </div>
  )
}

