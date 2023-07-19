import styles from './styles.module.scss'

export default function Devices() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1>APARELHOS CONECTADOS</h1>
        <div className={styles.line} />

        <text>TOTAL: 5</text>

        <div className={styles.content_grid}>
          <div className={styles.grid}>
            <div>
              <h2>CELULAR SAMSUNG GALAXY A22 DUAL - PRETO</h2>
              <h6>R$1999,00</h6>
              <p>(a vista)</p>
              <h6>R$1999,00</h6>
              <p>(cartão)</p>
              <h6>R$1999,00</h6>
              <p>(carne)</p>
            </div>
            <h4>10002</h4>
          </div>
        </div>
      </div>
    </main>
  )
}
