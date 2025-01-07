import { createContext, ReactNode, useState } from "react";
import { ProductProps } from "../pages/home";

interface CartContextData {
    cart: CartProps[];
    cartAmount: number;
    addItemCart: (newItem: ProductProps) => void;
    removeItemCart: (product: CartProps) => void;
    total: string;
}

interface CartProps{
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
    amount: number;
    total: number
}

interface CartProviderProps{
    children: ReactNode;
}

export const CartContext = createContext({} as CartContextData)

function CartProvider({children}: CartProviderProps){
    const [cart, setCart] = useState<CartProps[]>([])
    const [total, setTotal] = useState("");

    function addItemCart(newItem: ProductProps){
        //Adiciona no carrinho
        //Valida se já não existe no carrinho
        const indexItem = cart.findIndex(item => item.id === newItem.id)

        if(indexItem !== -1){
            // Se entrou aqui somamos +1 ao total do carrinho
            let cartList = cart;

            cartList[indexItem].amount = cartList[indexItem].amount + 1;
            cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price;

            setCart(cartList);
            totalResultCart(cartList);
            return;
        }

        //Adiciona esse item na lista
        let data = {
            ...newItem,
            amount: 1,
            total: newItem.price
        }

        setCart(products => [...products, data])
        totalResultCart([...cart, data]);
    }

    function removeItemCart(product: CartProps){
        const indexItem = cart.findIndex( item => item.id === product.id)

        if(cart[indexItem]?.amount > 1){
            // Diminui apenas 1 amount do que você tem
            let cartList = cart;

            cart[indexItem].amount = cartList[indexItem].amount - 1;
            cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price;

            setCart(cartList);
            totalResultCart(cartList);
            return;
        }

        const removeItem = cart.filter(item => item.id !== product.id) //Retorna todos os itens diferente do que você clicou
        setCart(removeItem);
        totalResultCart(removeItem);
    }

    function totalResultCart(items: CartProps[]){
        let myCart = items;
        let result = myCart.reduce((acc, obj) => { return acc + obj.total}, 0) //Começa com zero e vai acumulando

        const resultFormat = result.toLocaleString("pt-BR", {style:"currency", currency:"BRL"});
        setTotal(resultFormat);
    }

    return(
        <CartContext.Provider 
            value={{ 
                cart,
                cartAmount: cart.length,
                addItemCart,
                removeItemCart,
                total
            }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;