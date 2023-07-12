import './globals.css'
import { Roboto } from 'next/font/google'

import Footer from '../components/Footer'
import Header from '../components/Header'

const roboto = Roboto({
  subsets: ['latin'],
  weight: '300'
})

export const metadata = {
  title: 'Painel Gazin',
  description: 'Painel Gazin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={roboto.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
