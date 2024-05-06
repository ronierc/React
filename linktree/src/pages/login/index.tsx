import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '../../components/input'

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(
      {
        email: email,
        password: password
      }
    )
  }

  return (
      <div className='flex w-full h-screen items-center justify-center flex-col'>
        <Link to="/">
          <h1 className='mt-11 mb-7 font-bold text-5xl'>Dev
            <span className='bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent relative right-2'>Link</span></h1>
        </Link>
        <form 
          onSubmit={handleSubmit}
          className="w-full max-w-xl flex flex-col px-2">
          
        <Input
            placeholder='Digite seu email'
            type='email' value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder='**********'
            type='password' value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button 
            type='submit'
            className='h-9 bg-blue-500 rounded border-0 text-lg font-medium'>
            Acessar
          </button>

        </form>      
      </div>
  )
}