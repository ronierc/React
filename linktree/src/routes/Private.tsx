import { ReactNode, useState, useEffect } from "react";

import { Navigate } from "react-router-dom";

import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";

interface PrivateProps{
    children: ReactNode
}

export function Private({ children }: PrivateProps ): any{
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() =>{

        const unsub = onAuthStateChanged(auth, (user) => {
            if(user){
                const userData = { //onAuthStateChanged por padrão recebe um elemento user. Assim passamos ele em um array pra salvar em alguma validação futura
                    uid: user?.uid,
                    email: user?.email
                }

                localStorage.setItem("@reactlinks", JSON.stringify(userData))//Salva no localstorage
                setLoading(false)
                setSigned(true)
            } else {
                setLoading(false)
                setSigned(false)
            }
        })

        return () => { //Função de limpesa, quando sair do useEfect ele executa ela. Pra não ficar monitorando sempre e não perder perfomace. Valisa somente na entrada
            unsub();
        }

    }, [])

    if(loading){ //Carregamento da tela
        return <div>Carregando...</div>
    }

    if(!signed){ //Se não estiver logado e está tentando acessar a rota...
        return <Navigate to="/login"/>
    }

    return children; //Se ele não travou nas validações acima. Ai ele cai dentro da tag informada dentro do <Private> no app.tsx
}