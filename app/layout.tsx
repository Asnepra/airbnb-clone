import ToasterProvider from './Provider/ToasterProvider'
import ClientOnly from './components/ClientOnly'
import LoginModal from './components/modals/LoginModal'
import Modal from './components/modals/Modal'
import RegisterModal from './components/modals/RegisterModal'
import Navbar from './components/navbar/Navbar'
import './globals.css'

export const metadata = {
  title: 'Air Bnb',
  description: 'Air Bnb Clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientOnly>
          <ToasterProvider/>
          <Navbar/>
          <LoginModal/>
          <RegisterModal/>
          {children}
        </ClientOnly>
        </body>
    </html>
  )
}
