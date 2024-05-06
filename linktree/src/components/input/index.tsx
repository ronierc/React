import { InputHTMLAttributes } from "react";

//Dessa maneira abaixo o interface já vai pegar todos as tags que já existem em um input
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

export function Input(props: InputProps){
    return (
        <input 
        {...props} 
        className="border-0 h-9 rounded-md outline-none px-2 mb-3"
        />
    )
}