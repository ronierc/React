import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs"
import { api } from "../../services/api"
import { CartContext } from "../../contexts/CartContext";
import toast from "react-hot-toast"
import { ProductProps } from "../home";

export function ProductDetail(){
    const { id }= useParams();
    const { addItemCart } = useContext(CartContext)
    const [product, setProduct] = useState<ProductProps>()
    const navigate = useNavigate()

    useEffect(() => {
        async function getProduct(){
            const response = await api.get(`/products/${id}`)
            setProduct(response.data)
        }

        getProduct()
    }, [id])

    function handleAddCartItem(product: ProductProps){
        toast.success("Produto adicionado no carrinho.", {
            style:{
                borderRadius: 10,
                backgroundColor: "#121212",
                color: "#fff"
            }
        })
        addItemCart(product)
        navigate("/cart")
    }

    return(
        <div>
            <main className="w-full max-w-7xl px-4 mx-auto my-6">
                { product && (
                    <section key={product.id} className="w-full">
                        <div className="flex flex-col lg:flex-row">
                            <img 
                                className="flex-1 w-full max-h-72 object-contain"
                                src={product?.cover}
                                alt="Imagem do Produdo" 
                            /> 
                            <div className="flex-1">
                                <p className="font-bold text-2x1 mt-4 mb-2">{product?.title}</p>
                                <p className="my-4">{product?.description}</p>

                                <strong className="text-zinc-300">
                                    {product?.price.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL"
                                    })}
                                </strong>
                                <button className="bg-zinc-500 p-1 rounded ml-3" onClick={ () => handleAddCartItem(product) }>
                                    <BsCartPlus size={20} color="#fff" />
                                </button>

                            </div>
                        </div>
                    </section>
                )}
            </main>
        </div>
    )
}