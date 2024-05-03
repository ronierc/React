import styles from './home.module.css'
import { Link } from 'react-router-dom'

export function Home(){
    return(
        <div className={styles.container}>
            <h1>Home</h1>
        </div>
    )
}