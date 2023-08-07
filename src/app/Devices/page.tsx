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

  const { devices_ } = useDevices()

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

  function mask(input: string): string {
    input = parseFloat(input).toFixed(2)
    input = input.toString().replace('.', ',')
    const valor = input.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

    return 'R$ ' + valor
  }

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1>APARELHOS CONECTADOS</h1>
        <div className={styles.line} />
        <div className={styles.head}>
          <text>TOTAL: 5</text>

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
          <div className={styles.grid}>
            <div>
              <h2>nome do produto</h2>
            </div>

            <div>
              <h6>R$0.000,00</h6>
              <p>(a vista)</p>
            </div>

            <div>
              <h6>R$0.000,00</h6>
              <p>(cartão)</p>
            </div>

            <div>
              <h6>R$0.000,00</h6>
              <p>(carne)</p>
            </div>
            <h4>10002</h4>
          </div>
        </div>
      </div>
    </main>
  )
}
 /*<div style={{ marginTop: 20 }}>
    <ThreeDots
      height="60"
      width="60"
      radius="9"
      color='#180c72'
      ariaLabel='three-dots-loading'
    />
  </div>*/
