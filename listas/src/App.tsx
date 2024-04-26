import { useState, useEffect, useRef, useMemo } from 'react'


function App() {
  const inputRef = useRef<HTMLInputElement>(null)
  const firstRender = useRef(true)

  const [input, setInput] = useState("")
  const [tasks, setTasks] = useState<string[]>([]) //Informa que é um array de string string[]
  const [editTask, setEditTask] = useState({ //Criado para validar se o input está sendo alterado ou incluido
    enable: false,
    task: ''
  })
  const [teste, setTest] = useState(false)

  useEffect(() => {
    const tarefasSalvas = localStorage.getItem("@cursoreact");

    if(tarefasSalvas){
      setTasks(JSON.parse(tarefasSalvas));
    }
  }, []) 

  useEffect(() => { //Esse useEffect salva no localStorage toda vez que o tasks sofre alteração. Assim não preciso colocar pra salvar em cada alteração
    if(firstRender.current){ //useRef para validar se é a primeira vez que rendeniza. e não subescrever o localStorage
      firstRender.current = false;
      return;
    }
    localStorage.setItem("@cursoreact", JSON.stringify(tasks))
    console.log("efect")

  }, [tasks]) 


function handleRegister(){
  if(!input){
    alert("Preencha o nome da tarefa!");
    return;
  }

  if(editTask.enable){
    handleSaveEdit();
    return;
  }

  setTasks(tarefas => [...tarefas, input])
  setInput("")

  //localStorage.setItem("@cursoreact", JSON.stringify([...tasks, input]))
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
    //localStorage.setItem("@cursoreact", JSON.stringify(allTasks))

  }

  function handleDelete(item: string){
    const removeTask = tasks.filter( task => task !== item) //Se o item for diferente do que você clicou ele salva na lista
    setTasks(removeTask)
    //localStorage.setItem("@cursoreact", JSON.stringify(removeTask))
    
  }

  function handleEdit(item: string){

    inputRef.current?.focus();// usa o useRef para deixar o focus no input ao clicar em edita 

    setInput(item)
    setEditTask({
      enable: true,
      task: item
    })
  }

  const totalTarefas = useMemo(() => { //useMemo evita reindenizações desnecessárias. Ele atualiza somente se alterar a tasks
    return tasks.length
  }, [tasks])

  return (
      <div>
        <h1>Lista de Tarefas</h1>

        <input 
          placeholder="Digite uma tarefa..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          ref={inputRef}
        />
        <button onClick={handleRegister}> 
          {editTask.enable ? "Atualizar Tarefa" : "Adicionar Tarefa"}
        </button>
        
        <hr />

        <strong>Você tem {totalTarefas} tarefas</strong>

        <br /><br />

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
