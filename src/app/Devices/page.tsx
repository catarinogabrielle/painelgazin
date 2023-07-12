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
            <h2>CELULAR SAMSUNG GALAXY A22 DUAL - PRETO</h2>
            <h4>10002</h4>
          </div>
        </div>
      </div>
    </main>
  )
}
