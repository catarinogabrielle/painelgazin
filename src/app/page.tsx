"use client"

import styles from './styles.module.scss'
import Image from 'next/image'
import { useState } from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { MdError } from "react-icons/md"
import Footer from '../components/Footer'
import Dashboard from '../components/Dashboard/page'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [dashboard, setDashboard] = useState(false)

  return (
    <>
      {dashboard ? (
        <Dashboard />
      ) : (
        <>
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

              {error && (
                <div className={styles.error}>
                  <MdError className={styles.iconError} />
                  <label>Usuário ou Senha inválida</label>
                </div>
              )}

              <div className={styles.content_input}>
                <input value={user} onChange={(event) => setUser(event.target.value)} className={styles.input} placeholder='Digite seu usuário' type="text" name="email" />
                <input value={password} onChange={(event) => setPassword(event.target.value)} className={styles.input} placeholder='Digite sua senha' type="text" name="password" />
              </div>

              <div style={{ display: 'flex', width: '100%' }}>
                <button onClick={() => {
                  if (user !== 'USER_GAZIN_ADMIN' || password !== '@gazin24_BR00') {
                    setError(true)
                    setUser('')
                    setPassword('')
                  } else {
                    setLoading(true)
                    setDashboard(true)
                  }
                }} className={styles.button}>
                  {loading ?
                    <AiOutlineLoading3Quarters className={styles.icon} color="#F4F4F4" size={20} /> : <text>Continuar</text>
                  }
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  )
}
