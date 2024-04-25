import { useState, useEffect } from 'react'


function App() {
  const [input, setInput] = useState("")
  const [tasks, setTasks] = useState<string[]>([]) //Informa que é um array de string string[]
  const [editTask, setEditTask] = useState({ //Criado para validar se o input está sendo alterado ou incluido
    enable: false,
    task: ''
  })
  const [teste, setTest] = useState(false)

  useEffect(() => {
    const tarefasSalvas = localStorage.getItem("@cursoreact")

    if(tarefasSalvas){
      setTasks(JSON.parse(tarefasSalvas))
    }
  }, []) 

function handleRegister(){
  if(!input){
    alert("Preencha o nome da tarefa!")
    return
  }

  if(editTask.enable){
    handleSaveEdit()
    return
  }

  setTasks(tarefas => [...tarefas, input])
  setInput("")

  localStorage.setItem("@cursoreact", JSON.stringify([...tasks, input]))
}

  function handleSaveEdit(){ //Salvar edição 
    const findIndexTask = tasks.findIndex(task => task === editTask.task) //busca o index do campo clicado para edição
    const allTasks = [...tasks] //Pega todas as tarefas e joga em um novo array

    allTasks[findIndexTask] = input //Altera no novo array o valor do index pego antes 
    setTasks(allTasks) //Atualiza as tasks

    setEditTask({ //volta o campo para não editavel
      enable: false,
      task: ''
    })

    setInput("") //apaga o texto do imput
    localStorage.setItem("@cursoreact", JSON.stringify(allTasks))

  }

  function handleDelete(item: string){
    const removeTask = tasks.filter( task => task !== item) //Se o item for diferente do que você clicou ele salva na lista
    setTasks(removeTask)
    localStorage.setItem("@cursoreact", JSON.stringify(removeTask))
    
  }

  function handleEdit(item: string){
    setInput(item)
    setEditTask({
      enable: true,
      task: item
    })
  }

  return (
      <div>
        <h1>Lista de Tarefas</h1>

        <input 
          placeholder="Digite uma tarefa..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleRegister}> 
          {editTask.enable ? "Atualizar Tarefa" : "Adicionar Tarefa"}
        </button>
        
        <hr />

        {tasks.map((item,index) => (
          <section key={index}>
            <span>{ item }</span>
            <button onClick={ () => handleEdit(item) }>Editar</button>
            <button onClick={ () => handleDelete(item) }>Excluir</button>
          </section>
        ))}
      </div>
  )
}

export default App
