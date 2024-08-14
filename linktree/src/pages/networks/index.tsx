import { FormEvent, useEffect, useState } from 'react'
import { Header } from '../../components/header'
import { Input } from '../../components/input'

import { db } from '../../services/firebaseConnection'
import { 
  setDoc, //Cria um documento que a gente escreve o nome
  doc, //Cria um item com ID
  getDoc //busca uma vez um unico documento
 } from 'firebase/firestore'

export function Networks() {
  const [facebook, setFacebook] = useState("")
  const [instagram, setInstagram] = useState("")
  const [youtube, setYoutube] = useState("")

  useEffect(() => {
    function loadLinks(){
      const docRef = doc(db, "social", "link")
      getDoc(docRef)
        .then((snapshot) => {
          if(snapshot.data() !== undefined){
            setFacebook(snapshot.data()?.facebook)
            setInstagram(snapshot.data()?.instagram)
            setYoutube(snapshot.data()?.youtube)
          }
        })
    }

    loadLinks()
  }, [])

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    setDoc(doc(db, "social", "link" ), {
      facebook: facebook,
      instagram: instagram,
      youtube: youtube
    }).then(() => {
      console.log("Cadastrado com sucesso!")
    }).catch((error) => {
      console.error("Erro ao Salvar! " + error)
    })
  }

  return (
      <div className='flex items-center flex-col min-h-screen pb-7 px-2'>
        <Header/>

        <h1 className='text-white text-2xl font-medium mt-8 mb-4'>Minhas redes Sociais</h1>

        <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
          <label className="font-medium mt-2 mb-2">Link do Facebook</label>
          <Input
            type='urel'
            placeholder='Digite a url do Facebook...'
            value={facebook}
            onChange={ (e) => setFacebook(e.target.value) }
          />

        <label className="font-medium mt-2 mb-2">Link do Instagram</label>
          <Input
            type='urel'
            placeholder='Digite a url do Instagram...'
            value={instagram}
            onChange={ (e) => setInstagram(e.target.value) }
          />

          <label className="font-medium mt-2 mb-2">Link do Youtube</label>
            <Input
              type='urel'
              placeholder='Digite a url do Youtube...'
              value={youtube}
              onChange={ (e) => setYoutube(e.target.value) }
            />

            <button type='submit' className='bg-blue-500 h-9 rounded-md items-center justify-center flex mt-2 mb-7 font-medium'>Salvar Link</button>
        </form>
      </div>
  )
}