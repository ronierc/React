import { useState, FormEvent, useEffect } from 'react'
import styles from './home.module.css'
import { BsSearch } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'

export interface CoinProp {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    supply: string;
    maxSupply: string;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    priceUsd: string;
    changePercent24Hr: string;
    vwap24Hr: string;
    explorer: string;
    formatedPrice?: string
    formatedMarket?: string
    formatedVolume?: string
}

interface DataProp {
    data: CoinProp[]
}

export function Home() {
    const [input, setInput] = useState("")
    const [coins, setCoins] = useState<CoinProp[]>([])
    const [offset, setOffset] = useState(0) //Quantidade a carregar
    const navigate = useNavigate();

    useEffect(() => {
        getData()
    }, [offset]) //Sempre que a quantidade a carregar alterar ele recarrega

    async function getData() {
        fetch(`https://api.coincap.io/v2/assets?limit=10&offset=${offset}`)
            .then(response => response.json())
            .then((data: DataProp) => {
                const coinsData = data.data;

                const price = Intl.NumberFormat("en-US", { //Formata para preço
                    style: "currency",
                    currency: "USD"
                })
                const priceCompact = Intl.NumberFormat("en-US", { //Formata para preço compactado
                    style: "currency",
                    currency: "USD",
                    notation: "compact"
                })

                const formatedResult = coinsData.map((item) => { //Percorre o array das informações 
                    const formated = {//Cria um novo array com o antido e os novos campos formatados
                        ...item,
                        formatedPrice: price.format(Number(item.priceUsd)),
                        formatedMarket: priceCompact.format(Number(item.marketCapUsd)),
                        formatedVolume: priceCompact.format(Number(item.volumeUsd24Hr))
                    }
                    return formated
                })

                const listCoins = [...coins, ...formatedResult] //Usado para concatenar mais 10 quando clica no botão adicionar
                setCoins(listCoins)
            })
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (input === "") return

        navigate(`/detail/${input}`)
    }

    function handleGetmore() { // Adiciona mais 10 a lista
        if (offset === 0) {
            setOffset(10)
            return;
        }

        setOffset(offset + 10)

    }

    return (
        <main className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text" placeholder='Digite o nome da moeda'
                    value={input} onChange={(e) => setInput(e.target.value)}
                />
                <button type='submit'>
                    <BsSearch size={30} />
                </button>
            </form>


            <table>
                <thead>
                    <tr>
                        <th scope='col'>Moeda</th>
                        <th scope='col'>Valor mercado</th>
                        <th scope='col'>Preço</th>
                        <th scope='col'>Volume</th>
                        <th scope='col'>Mudança 24h</th>
                    </tr>
                </thead>

                <tbody id='tbody'>
                    {coins.length > 0 && coins.map((item) => (
                        <tr key={item.id}>

                            <td data-label="Moeda">
                                <div className={styles.name}>
                                    <img
                                        src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}
                                        alt="Logo Cripto"
                                    />
                                    <Link to={`/detail/${item.id}`}>
                                        <span>{item.name}</span> | {item.symbol}
                                    </Link>
                                </div>
                            </td>
                            <td data-label="Valor mercado">
                                {item.formatedMarket}
                            </td>
                            <td data-label="Preço">
                                {item.formatedPrice}
                            </td>
                            <td data-label="Volume">
                                {item.formatedVolume}
                            </td>
                            <td className={Number(item.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss} data-label="Mudança 24h">
                                <span>{Number(item.changePercent24Hr).toFixed(3)}</span>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>


            <button className={styles.buttonMore} onClick={handleGetmore}>
                Carregar Mais
            </button>
        </main>
    )
}