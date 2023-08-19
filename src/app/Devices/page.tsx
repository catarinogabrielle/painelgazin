"use client"

import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import useSWR from "swr"
import { Api } from "../../services/api"
import { ThreeDots } from 'react-loader-spinner'
import { DebounceInput } from 'react-debounce-input'
import { FiSearch } from "react-icons/fi"

export default function Devices() {
  const [search, setSearch] = useState('10002')
  const [length, setLength] = useState()

  function useDevices() {
    let address = `devices`

    const fetcher = async (address: string) => await Api.get(address).then((res) => res.data)
    const { data, isLoading, mutate } = useSWR(address, fetcher, { refreshInterval: 1000 })

    return {
      devices: data,
      isLoading,
      mutate
    }
  }

  const { devices, isLoading } = useDevices()

  const count = () => {
    const devices_app = devices?.map(item => item.branch)
    var quantidade = 0

    for (var i = 0; i < devices?.length; i++) {
      if (devices_app[i] == search) {
        quantidade++
      }
    }

    setLength(quantidade)
  }

  useEffect(() => {
    count()
  }, [isLoading, search])

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1>APARELHOS CONECTADOS</h1>
        <div className={styles.line} />
        {isLoading == false ? (
          <>
            <div className={styles.head}>
              <text>TOTAL: {length}</text>

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
              {devices?.map(item => {
                if (item.branch === search)
                  return (
                    <div key={item.id} className={styles.grid}>
                      <div>
                        <h2>{item.device} {item.color}</h2>
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

                      <h4>{item.branch}</h4>
                    </div>
                  )
              })}
            </div>
          </>
        ) : (
          <div className={styles.loader}>
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

