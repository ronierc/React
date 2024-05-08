import { FormEvent, useState, useEffect } from 'react'

import { Header } from '../../components/header'
import { Input } from '../../components/input'

import { FiTrash } from 'react-icons/fi';
import { db } from '../../services/firebaseConnection';
import { 
  addDoc, //Adiciona documento dentro de uma coleção (Gera Id aleatorio) AUTOID
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  doc, 
  deleteDoc 
} from 'firebase/firestore';

interface linkProps{
  id: string,
  name: string,
  url: string,
  bg: string,
  color: string
}

export function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#f1f1f1");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212");

  const [links, setLinks] = useState<linkProps[]>([])

  useEffect(() => {
    const linkRef = collection(db, "links"); //encontra a collection no bd
    const queryRef = query(linkRef, orderBy("created", "asc")); //cria a consulta da collection encontrada assim e ordena

    const unsub = onSnapshot(queryRef, (snapshot) => { //onSnapshot fica monitorando o banco a qualquer alteração
      let lista = [] as linkProps[];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color
        })
      })

      setLinks(lista); //Pega as informações retornadas pela query e inclui em um array

    })

    return () => {//função anonima para quando sair do onSnapshot, para não ficar carregando a memoria
      unsub(); //Função que desmonta o inSnapshot
    }

  }, [])

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    if(nameInput === "" && urlInput === ""){
      alert("Preencha as informações!!!");
      return;
    }

    addDoc(collection(db, "links"), { //Cria o banco
      name: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date()
    })
    .then(() => {
      setNameInput("");
      setUrlInput("");
      console.log("CADASTRADO COM SUCESSO");
    }).catch((error) => {
      console.error("ERRO AO CADASTRAR NO BANCO" + error);
    })
  }

  return (
    <div className='flex items-center flex-col min-h-screen pb-7 px-2'>
      <Header />

      <form className='flex flex-col mt-8 mb-3 w-full max-w-xl' onSubmit={handleRegister}>
        <label className='text-white font-medium mt-2 mb-2'>Nome do Link</label>
        <Input
          placeholder='Digite o link...'
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />

        <label className='text-white font-medium mt-2 mb-2'>URL do Link</label>
        <Input
          type='url'
          placeholder='Digite a url...'
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        <section className='flex my-4 gap-5'>
          <div className='flex my-4 gap-2'>
            <label className='text-white font-medium mt-2 mb-2'>Cor do Link</label>
            <input
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>
          <div className='flex my-4 gap-2'>
            <label className='text-white font-medium mt-2 mb-2'>Fundo do Link</label>
            <input
              type="color"
              value={backgroundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
            />
          </div>
        </section>

        {nameInput !== '' && (
          <div className='flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md'>
            <label className='text-white font-medium mt-2 mb-3'>Veja como esta fincando</label>
            <article
              className='w-11/12 max-w-lg flex flex-col items-center justify-between bg-slate-500 rounded px-1 py-3'
              style={{ marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput }}
            >
              <p className="font-medium" style={{ color: textColorInput }} >{nameInput}</p>
            </article>
          </div>
        )}

        <button type='submit' className='mb-7 bg-blue-600 h-9 rounded-md font-medium gap-4 flex justify-center items-center'>
          Cadastrar
        </button>

      </form>

      <h2 className='font-bold mb-4 text-2x1'>
        Meus Links
      </h2>

      <article 
        className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 select-none"
        style={{ backgroundColor: "#ccc", color: "#369" }}  
      >
        <p>Canal do Youtube</p>
        <div>
          <button
            className="border border-dashed p-1 rounded bg-slate-700"
            >
            <FiTrash size={18} color='#ccc'/>
          </button>
        </div>
      </article>
    </div>
  )
}