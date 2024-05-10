"use client"

import React, { useState, useEffect } from "react"
import styles from './styles.module.scss'
import Image from 'next/image'

import { ApiDevices } from "../../services/api_gazin"
import json from "../Application/json.json"

export default function Devices() {
  const [filtro, setFiltro] = useState(true)
  const [branch, setBranch] = useState('')
  const [values, setValues] = useState(false)
  const [brand, setBrand] = useState('Marca')
  const [product, setProduct] = useState('Modelo')
  const [color, setColor] = useState('Cor')
  const [voltagem, setVoltagem] = useState('Voltagem')
  const [devices, setDevices] = useState([])

  async function loadData() {
    await ApiDevices.get(`/celulares?idfilial=${branch == '' ? 10002 : branch}&token=Gazin-tech%C3%87$2y$10$85Udhj9L4Pa9XULE5RxyTu0Yv5G0POBiS7u2Yb693P9o6Ctege7cq%C3%87Gazin-tech`).then(response => {
      setDevices(response.data)

    }).catch((err) => {
      console.log('erro', err)
    })
    return true
  }

  const [time, setTime] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      loadData()
      setTime(!time)
    }, 600000)
  }, [time])

  const Marca = json?.map((item: { marca: string; }) => item.marca)
  const uniqueMarcaList = [...new Set(Marca)]

  function handleProductBrand(jsonData: any[], marca: string): string[] {
    const produtoNomes: string[] = []

    for (const value of jsonData) {
      if (value.marca === marca && !produtoNomes.includes(value.produto)) {
        produtoNomes.push(value.produto)
      }
    }

    return produtoNomes
  }

  function handleProductColor(jsonData: any[], produto: string): string[] {
    const produtoNomes: string[] = []

    for (const value of jsonData) {
      if (value.produto === produto && !produtoNomes.includes(value.cor)) {
        produtoNomes.push(value.cor)
      }
    }

    return produtoNomes
  }

  function handleProductVolt(jsonData: any[], produto: string): string[] {
    const voltagemDevice: string[] = []

    for (const value of jsonData) {
      if (value.produto === produto && !voltagemDevice.includes(value.voltagem)) {
        voltagemDevice.push(value.voltagem)
      }
    }

    return voltagemDevice
  }

  function HandleLowestPrice(
    jsonData: any,
    tipo: string
  ): any {
    const val = new Date()
    var today = val.toLocaleDateString()
    var dia = today.split("/")[0]
    var mes = today.split("/")[1]
    var ano = today.split("/")[2]
    var hoje = ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2)

    const produtosFiltradosDataIgualHoje = jsonData?.filter((produto: { idproduto: number; produto: string; cor: string; marca: string; tipo: string; voltagem: string; datainicial: string | number | Date; datafinal: string | number | Date; }) => {

      return (
        produto.produto == product &&
        produto.cor == color &&
        produto.marca == brand &&
        produto.tipo == tipo &&
        produto.voltagem == voltagem &&
        produto.datainicial == hoje && produto.datafinal == hoje
      )
    })

    if (produtosFiltradosDataIgualHoje && produtosFiltradosDataIgualHoje.length > 0) {

      if (tipo == 'A Vista') {
        produtosFiltradosDataIgualHoje?.sort((a: { precopartida: string; }, b: { precopartida: string; }) => {
          return parseFloat(a.precopartida) - parseFloat(b.precopartida)
        })
      }

      if (tipo == 'Cartão' || tipo == 'Carteira')
        produtosFiltradosDataIgualHoje?.sort((a: { precoaprazo: string; }, b: { precoaprazo: string; }) => {
          return parseFloat(a.precoaprazo) - parseFloat(b.precoaprazo)
        })

      return produtosFiltradosDataIgualHoje[0]
    }

    const produtosFiltrados = jsonData?.filter((produto: {
      datainicial: string; idproduto: number; produto: string; cor: string; marca: string; tipo: string; voltagem: string; datafinal: string | number | Date;
    }) => {

      return (
        produto.produto == product &&
        produto.cor == color &&
        produto.marca == brand &&
        produto.tipo == tipo &&
        produto.voltagem == voltagem &&
        produto.datafinal >= hoje &&
        produto.datainicial <= hoje
      )
    })

    if (tipo == 'A Vista') {
      produtosFiltrados?.sort((a: { precopartida: string; }, b: { precopartida: string; }) => {
        return parseFloat(a.precopartida) - parseFloat(b.precopartida)
      })
    }

    if (tipo == 'Cartão' || tipo == 'Carteira')
      produtosFiltrados?.sort((a: { precoaprazo: string; }, b: { precoaprazo: string; }) => {
        return parseFloat(a.precoaprazo) - parseFloat(b.precoaprazo)
      })

    return produtosFiltrados[0]
  }

  function mask(input: string): string {
    input = parseFloat(input).toFixed(2)
    input = input.toString().replace('.', ',')
    const valor = input.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

    return 'R$ ' + valor
  }

  return (
    <main className={styles.main}>
      {filtro ? (
        <>
          <Image
            src="/logogazin.png"
            alt="Gazin Logo"
            className={styles.logo}
            width={200}
            height={100}
            priority
          />
          <div className={styles.filtro}>
            {values == false ? (
              <>
                <h1>Digite sua filial:</h1>
                <input type="text" onChange={(event) => setBranch(event.target.value)} placeholder="Digite aqui" />
                {branch !== '' && (
                  <button type="button" onClick={() => { loadData(), setValues(true) }}>Filtrar Filial</button>
                )}
              </>
            ) : (
              <>
                <h1 style={{
                  backgroundColor: '#312783',
                  color: '#fff',
                  paddingTop: 13,
                  paddingBottom: 13,
                  paddingLeft: 10,
                  fontSize: 16
                }}
                >Filial: {branch}</h1>

                <select style={brand == 'Marca' ? { backgroundColor: 'transparent' } : { backgroundColor: '#312783', color: '#fff' }} name="Marca" onChange={(event) => setBrand(event.target.value)} >
                  <option value="Marca">Marca</option>
                  {uniqueMarcaList.map(item => {
                    if (item !== 'AMET PELICULAS')
                      return (
                        <option key={item} value={item}>{item}</option>
                      )
                  })}
                </select>

                <select style={product == 'Modelo' ? { backgroundColor: 'transparent' } : { backgroundColor: '#312783', color: '#fff' }} name="Modelo" onChange={(event) => setProduct(event.target.value)} >
                  <option value="Modelo">Modelo</option>
                  {handleProductBrand(json, brand).map(item => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>

                <select style={color == 'Cor' ? { backgroundColor: 'transparent' } : { backgroundColor: '#312783', color: '#fff' }} name="Cor" onChange={(event) => setColor(event.target.value)} >
                  <option value="Cor">Cor</option>
                  {handleProductColor(json, product).map(item => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>

                <select style={voltagem == 'Voltagem' ? { backgroundColor: 'transparent' } : { backgroundColor: '#312783', color: '#fff' }} name="Voltagem" onChange={(event) => setVoltagem(event.target.value)} >
                  <option value="Voltagem">Voltagem</option>
                  {handleProductVolt(json, product).map(item => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>

                {brand == 'Marca' || product == 'Modelo' || color == 'Cor' || voltagem == 'Voltagem' ? (null) : (
                  <button onClick={() => setFiltro(false)} type="button">Filtrar</button>
                )}
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <video autoPlay muted loop className={styles.video}>
            <source src="gazin.mp4" type="video/mp4" />
          </video>

          <div className={styles.header}>
            <h1>Seja Bem Vindo à Gazin</h1>
          </div>

          {brand == 'Marca' || product == 'Modelo' || color == 'Cor' || voltagem == 'Voltagem' ? (null) : (
            <div className={styles.contentInfo}>
              <div className={styles.boxInfo}>
                <h1>{product} - {color}</h1>
                {HandleLowestPrice(json, 'A Vista') && (
                  <label key={HandleLowestPrice(json, 'A Vista').idproduto + '4'}>{HandleLowestPrice(json, 'A Vista').idproduto}</label>
                )}
              </div>

              <div className={styles.boxInfo}>
                {HandleLowestPrice(json, 'A Vista') && (
                  <p key={HandleLowestPrice(json, 'A Vista').idproduto + '1'}><text style={{ color: '#312783', fontSize: 30 }}>{mask(HandleLowestPrice(json, 'A Vista').precopartida)}</text> (A Vista)</p>
                )}
              </div>

              <div className={styles.boxInfo}>
                {HandleLowestPrice(json, 'Cartão') && (
                  <p key={HandleLowestPrice(json, 'Cartão').idproduto + '2'}><text style={{ color: '#312783', fontSize: 30 }}>{mask(HandleLowestPrice(json, 'Cartão').precoaprazo)}</text>  Parcelas em até<text style={{ color: '#6d057d', fontSize: 24 }}> {HandleLowestPrice(json, 'Cartão').prazofinal}x </text>no cartão.</p>
                )}
              </div>

              <div className={styles.boxInfo}>
                {HandleLowestPrice(json, 'Carteira') && (
                  <p key={HandleLowestPrice(json, 'Carteira').idproduto + '2'}><text style={{ color: '#312783', fontSize: 30 }}>{mask(HandleLowestPrice(json, 'Carteira').precoaprazo)}</text>  Parcelas em até<text style={{ color: '#6d057d', fontSize: 24 }}> {HandleLowestPrice(json, 'Carteira').prazofinal}x </text>no carne.</p>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </main>
  )
}