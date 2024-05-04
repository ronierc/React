import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CoinProp } from '../home';
import styles from './detail.module.css'

interface ResponseData {
  data: CoinProp;
}
interface ErrorData {
  error: string;
}

type DataProps = ResponseData | ErrorData; //Ou recebo um ou outro, já valida

export function Detail() {
  const { cripto } = useParams();
  const navigate = useNavigate()

  const [coin, setCoin] = useState<CoinProp>()
  const [loading, setLoading] = useState(true) //Usando para carregar as informações

  useEffect(() => {
    async function getCoin() {
      try {
        fetch(`https://api.coincap.io/v2/assets/${cripto}`)
          .then(response => response.json())
          .then((data: DataProps) => {

            if ("error" in data) {
              navigate("/");
              return;
            }

            const price = Intl.NumberFormat("en-US", { //Formata para preço
              style: "currency",
              currency: "USD"
            })
            const priceCompact = Intl.NumberFormat("en-US", { //Formata para preço compactado
              style: "currency",
              currency: "USD",
              notation: "compact"
            })

            const resultData = { //Cria um novo array com o antido e os novos campos formatados
              ...data.data,
              formatedPrice: price.format(Number(data.data.priceUsd)),
              formatedMarket: priceCompact.format(Number(data.data.marketCapUsd)),
              formatedVolume: priceCompact.format(Number(data.data.volumeUsd24Hr))
            }

            setCoin(resultData)
            setLoading(false) // Quando termina de carregar passa false

          })
      } catch (err) {
        console.error(err);
        navigate("/");
      }
    }

    getCoin()

  }, [cripto])

  if (loading || !coin) { //Enquanto loading = true ou não encontrou o coin exibe carregando 
    return (
      <div className={styles.container}>
        <h4>Carregando...</h4>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1>{coin?.name} </h1>
      <h1>{coin?.symbol} </h1>

      <section>
        <img
          src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLowerCase()}@2x.png`}
          alt="Logo Cripto"
        />
        <h2>{coin?.name} | {coin?.symbol}</h2>

        <p><strong>Preço: </strong>{coin?.formatedPrice}</p>
        <p><strong>Mercado: </strong>{coin?.formatedMarket}</p>
        <p><strong>Volume: </strong>{coin?.formatedVolume}</p>
        <p><strong>Mudança 24h: </strong><span className={Number(coin?.changePercent24Hr) > 0 ? styles.profit : styles.loss }>{Number(coin?.changePercent24Hr).toFixed(3)}</span></p>
        
      </section>
    </div>
  )
}