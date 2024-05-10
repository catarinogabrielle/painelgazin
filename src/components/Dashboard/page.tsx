"use client"

import { useState } from 'react'
import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { BsPhone, BsLaptop, BsCloudDownload } from "react-icons/bs"
import Footer from '../Footer'
import Devices from '../Devices/page'

export default function Dashboard() {
  const [devices, setDevices] = useState(false)

  return (
    <>
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.content_header}>
            <div className={styles.logo_header}>
              <Image
                src="/logogazin.png"
                alt="Gazin Logo"
                className={styles.logo}
                width={200}
                height={100}
                priority
              />
              <text>Seja Bem Vindo (a)</text>
            </div>
            {devices && (
              <nav className={styles.navigation_header}>
                <text><div onClick={() => setDevices(false)} style={{ textDecoration: 'none', color: '#fff' }}>Dashboar</div></text>
              </nav>
            )}
          </div>
        </header>
        {devices ? (
          <>
            <Devices />
          </>
        ) : (
          <div className={styles.content}>
            <div onClick={() => setDevices(true)} className={styles.card}>
              <BsPhone className={styles.icon} />
              <text>Aparelhos conectados</text>
            </div>

            <Link href={'/Application'} style={{ textDecoration: 'none' }}>
              <div className={styles.card}>
                <BsLaptop className={styles.icon} />
                <text>App Notebooks</text>
              </div>
            </Link>

            <a href="/logogazin.png" download className={styles.card}>
              <BsCloudDownload className={styles.icon} />
              <text>Baixar APK</text>
            </a>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
