import Image from 'next/image'
import styles from './styles.module.scss'
import Link from 'next/link'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content_header}>
        <div className={styles.logo_header}>
          <Image
            src="/logogazin.png"
            alt="Gazin Logo"
            className={styles.logo}
            width={200}
            height={100}
            priority
          />
          <text>Seja Bem Vindo (a)</text>
        </div>

        <nav className={styles.navigation_header}>
          <text><Link href={'/Home'} style={{ textDecoration: 'none', color: '#fff' }}>Home</Link></text>
          <text><Link href={'/'} style={{ textDecoration: 'none', color: '#fff' }}>Sair</Link></text>
        </nav>
      </div>
    </header>
  )
}
