"use client"

import styles from './styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai"

export default function Login() {
  const [loading, setLoading] = useState(true)

  return (
    <div className={styles.container}>
      <Image
        src="/logogazin.png"
        alt="Gazin Logo"
        className={styles.logo}
        width={200}
        height={100}
        priority
      />

      <div className={styles.content}>
        <h1>Login</h1>
        <h2>Bem vindo ao painel da gazin</h2>

        <div className={styles.content_input}>
          <input className={styles.input} placeholder='Digite seu usuário' type="text" name="email" />
          <input className={styles.input} placeholder='Digite sua senha' type="password" name="password" />
        </div>

        <Link style={{ display: 'flex', width: '100%' }} href={'/Home'}>
          <button className={styles.button}>{loading ? <AiOutlineLoading3Quarters className={styles.icon} color="#F4F4F4" size={20} /> : <text>Continuar</text>}</button>
        </Link>
      </div>
    </div>
  )
}
