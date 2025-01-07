import { useContext } from "react"
import { Link } from "react-router-dom"

import { CartContext } from "../../contexts/CartContext"
import { getItem } from "localforage"

export function Cart(){
    const { cart, total, addItemCart, removeItemCart } = useContext(CartContext)
    
    return(
        <div className="w-full max-w-7xl mx-auto ">
            <h1 className="font-medium text-2xl text-center my-4">Meu Carrinho</h1>

            {cart.length === 0 && (
                <div className="flex flex-col items-center justify-center">
                    <p className="font-medium">Ops se carrinho está vazio...</p>
                    <Link 
                        to="/"
                        className="bg-slate-600 my-3 p-1 px-3 text-white font-medium rounded">
                        Acessar Produtos
                    </Link>
                </div>
            )}
            {cart.map( (item) => (
                <section key={item.id} className="flex items-center justify-between border-b-2 border-gray-500">
                    <img 
                        className="w-28"
                        src={item.cover}
                        alt={item.title}
                    />

                    <strong>Preço: {item.price}</strong>

                    <div className="flex items-center justify-center gap-3">
                        <button 
                            onClick={() => removeItemCart(item)}
                            className="bg-slate-300 px-2 rounded text-gray-700 font-medium flex items-center justify-center">
                            -
                        </button>
                        {item.amount}
                        <button 
                            onClick={() => addItemCart(item)}
                            className="bg-slate-300 px-2 rounded text-gray-700 font-medium flex items-center justify-center">
                            +
                        </button>
                    </div>

                    <strong className="float-right">
                        SubTotal: {item.total.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })}
                    </strong>
                </section>
            ))}
            {cart.length !== 0 && ( <p className="font-bold mt-4">Total : {total}</p> )}
            
        </div>
    )
}