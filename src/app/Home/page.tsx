import styles from './styles.module.scss'
import Link from 'next/link'
import { BsPhone } from "react-icons/bs"
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Home() {
  return (
    <>
    <main className={styles.main}>
      <Header />
      <div className={styles.content}>
        <Link href={'/Devices'} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <BsPhone className={styles.icon} />
            <text>Aparelhos conectados</text>
          </div>
        </Link>
      </div>
    </main>
    <Footer />
    </>
  )
}
