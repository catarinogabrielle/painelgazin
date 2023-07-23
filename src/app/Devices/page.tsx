"use client"

import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import useSWR from "swr"
import { Api, Api_Gazin } from "../../services/api"

export default function Devices() {
  const [filial, setFilial] = useState('10002')

  function useDevices() {
    let address = `devices`

    const fetcher = async (address: string) => await Api.get(address).then((res) => res.data)
    const { data, isLoading, mutate } = useSWR(address, fetcher, { refreshInterval: 1000 })

    return {
      devices_: data,
      isLoading,
      mutate
    }
  }

  const { devices_, isLoading } = useDevices()

  const valueApi = devices_?.map((item: { device: any }) => (item.device))
  const valueFilial = devices_?.map((item: { branch: any }) => (item.branch))
  const valueColor = devices_?.map((item: { color: any }) => (item.color))

  function useDevicesGazin() {
    let address = `celulares?idfilial=${filial}&token=Gazin-tech%C3%87$2y$10$85Udhj9L4Pa9XULE5RxyTu0Yv5G0POBiS7u2Yb693P9o6Ctege7cq%C3%87Gazin-tech`

    const fetcher = async (address: string) => await Api_Gazin.get(address).then((res) => res.data)
    const { data, isLoading, mutate } = useSWR(address, fetcher, { refreshInterval: 1000 })

    return {
      devices_gazin: data,
      isLoading,
      mutate
    }
  }

  const { devices_gazin } = useDevicesGazin()
  let number = devices_gazin?.length

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1>APARELHOS CONECTADOS</h1>
        <div className={styles.line} />
        {isLoading == false ? (
          <>
            <text>TOTAL: {number}</text>

            <div className={styles.content_grid}>
              {devices_gazin?.map((item: { produto: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; idproduto: React.Key | null | undefined; cor: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; precopartida: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; precoaprazo: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.PromiseLikeOfReactNode | null | undefined }) => {
                if (valueApi == item.produto && valueFilial == filial && valueColor == item.cor) return (
                  <div key={item.idproduto} className={styles.grid}>
                    <div>
                      <h2>{item.produto} - {item.cor}</h2>
                    </div>

                    <div>
                      <h6>R${item.precopartida}</h6>
                      <p>(a vista)</p>
                    </div>

                    <div>
                      <h6>R${item.precoaprazo}</h6>
                      <p>(cartão)</p>
                    </div>

                    <div>
                      <h6>R${item.precoaprazo}</h6>
                      <p>(carne)</p>
                    </div>
                    <h4>{filial}</h4>
                  </div>
                )
              })}
            </div>
          </>
        ) : (null)}
      </div>
    </main>
  )
}
