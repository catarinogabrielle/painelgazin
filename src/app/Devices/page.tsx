import styles from './styles.module.scss'

import devices from '../../../devices.json'

export default function Devices() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1>APARELHOS CONECTADOS</h1>
        <div className={styles.line} />

        <text>TOTAL: {devices.length}</text>

        <div className={styles.content_grid}>
          {devices.data.map(item => (
            <div key={item.id} className={styles.grid}>
              <div>
                <h2>{item.device}</h2>
              </div>

              <div>
                <h6>R${item.price}</h6>
                <p>(a vista)</p>
              </div>

              <div>
                <h6>R${item.price_card}</h6>
                <p>(cartão)</p>
              </div>

              <div>
                <h6>R${item.price_desk}</h6>
                <p>(carne)</p>
              </div>
              <h4>{item.branch}</h4>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
