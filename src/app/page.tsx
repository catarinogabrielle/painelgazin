import styles from './styles.module.scss'
import Link from 'next/link'
import { BsPhone } from "react-icons/bs"

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <Link href={'/Devices'} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <BsPhone className={styles.icon} />
            <text>Aparelhos conectados</text>
          </div>
        </Link>
      </div>
    </main>
  )
}
