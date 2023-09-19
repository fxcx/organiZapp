
import NavBar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers.jsx'



const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <Providers>
      <NavBar></NavBar>
      {children}
      <Footer></Footer>
        </Providers>
        </body>
    </html>
  )
}
