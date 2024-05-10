import './globals.css'

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
      <body>
        {children}
      </body>
    </html>
  )
}
