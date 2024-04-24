import './header.css'

interface HeaderProps{
    title?: string; //Se colocar o interrogação não fica obrigatório
}

// Assim eu posso fazer a definição padrão caso não vanha nada do app.tsx
export function Header({ title = "Curso React + TypeScript" }: HeaderProps){
    return(
        <header className='header'>
            <h1 className='title'>{ title }</h1>
        </header>
    )
}