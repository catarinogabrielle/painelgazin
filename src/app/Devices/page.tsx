"use client"

import React, { useState } from 'react'
import styles from './styles.module.scss'
import useSWR from "swr"
import { Api, Api_Gazin } from "../../services/api"
import { ThreeDots } from 'react-loader-spinner'
import { DebounceInput } from 'react-debounce-input'
import { FiSearch } from "react-icons/fi"

export default function Devices() {
  const [search, setSearch] = useState('10002')

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
  const valueVoltagem = devices_?.map((item: { voltagem: any }) => (item.voltagem))

  function useDevicesGazin() {
    let address = `celulares?idfilial=${search}&token=Gazin-tech%C3%87$2y$10$85Udhj9L4Pa9XULE5RxyTu0Yv5G0POBiS7u2Yb693P9o6Ctege7cq%C3%87Gazin-tech`

    const fetcher = async (address: string) => await Api_Gazin.get(address).then((res) => res.data)
    const { data, isLoading, mutate } = useSWR(address, fetcher, { refreshInterval: 1000 })

    return {
      devices_gazin: data,
      isLoading,
      mutate
    }
  }

  const { devices_gazin } = useDevicesGazin()

  console.log(devices_gazin)

  function mask(input: string): string {
    input = parseFloat(input).toFixed(2)
    input = input.toString().replace('.', ',')
    const valor = input.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

    return 'R$ ' + valor
  }

  let number = devices_gazin?.length

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1>APARELHOS CONECTADOS</h1>
        <div className={styles.line} />
        {devices_gazin !== undefined ? (
          <>
            <div className={styles.head}>
              <text>TOTAL: {number}</text>

              <div className={styles.boxInput}>
                <div className={styles.buttonSearch} title="pesquisar">
                  <FiSearch className={styles.iconSearch} size={17} />
                </div>

                <DebounceInput
                  debounceTimeout={500}
                  placeholder={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
            </div>

            <div className={styles.content_grid}>
              {devices_gazin?.map((item: { produto: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; cor: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; voltagem: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; idproduto: React.Key | null | undefined; precopartida: string; precoaprazo: string }) => {
                if (valueApi == item.produto && valueFilial == search && valueColor == item.cor && valueVoltagem == item.voltagem) return (
                  <div key={item.idproduto} className={styles.grid}>
                    <div>
                      <h2>{item.produto} {item.voltagem} - {item.cor}</h2>
                    </div>

                    <div>
                      <h6>{mask(item.precopartida)}</h6>
                      <p>(a vista)</p>
                    </div>

                    <div>
                      <h6>{mask(item.precoaprazo)}</h6>
                      <p>(cartão)</p>
                    </div>

                    <div>
                      <h6>{mask(item.precoaprazo)}</h6>
                      <p>(carne)</p>
                    </div>
                    <h4>{search}</h4>
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          <div style={{ marginTop: 20 }}>
            <ThreeDots
              height="60"
              width="60"
              radius="9"
              color='#180c72'
              ariaLabel='three-dots-loading'
            />
          </div>
        )}
      </div>
    </main>
  )
}
