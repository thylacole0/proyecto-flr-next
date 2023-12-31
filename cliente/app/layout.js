import { AuthProvider } from './Providers'
import './globals.css'
import { Inter } from 'next/font/google'
import styles from './residentes/residentes.module.css'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Proyecto FLR',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className='bg-gray-200'>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
