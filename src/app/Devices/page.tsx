"use client"

import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import useSWR from "swr"
import { Api } from "../../services/api"

export default function Devices() {

  function useDevices() {
    let address = `devices`

    const fetcher = async (address: string) => await Api.get(address).then((res) => res.data)
    const { data, mutate } = useSWR(address, fetcher, { refreshInterval: 1000 })

    return {
      devices_: data,
      mutate
    }
  }

  const { devices_ } = useDevices()

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1>APARELHOS CONECTADOS</h1>
        <div className={styles.line} />

        <text>TOTAL: {devices_?.length}</text>

        <div className={styles.content_grid}>
          {devices_?.map((item: { id: React.Key | null | undefined; device: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; price: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; price_card: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; price_desk: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; branch: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined }) => (
            <div key={item.id} className={styles.grid}>
              <div>
                <h2>{item.device}</h2>
              </div>

              <div>
                <h6>{item.price}</h6>
                <p>(a vista)</p>
              </div>

              <div>
                <h6>{item.price_card}</h6>
                <p>(cartão)</p>
              </div>

              <div>
                <h6>{item.price_desk}</h6>
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
