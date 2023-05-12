import ToasterProvider from './Provider/ToasterProvider'
import getCurrentUser from './actions/getCurrentUser'
import ClientOnly from './components/ClientOnly'
import LoginModal from './components/modals/LoginModal'
import Modal from './components/modals/Modal'
import RegisterModal from './components/modals/RegisterModal'
import RentModal from './components/modals/RentModal'
import SearchModal from './components/modals/SeachModal'
import Navbar from './components/navbar/Navbar'
import './globals.css'

export const metadata = {
  title: 'Air Bnb',
  description: 'Air Bnb Clone',
}

//Layout.tsx is the server component

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser= await getCurrentUser();
  return (
    <html lang="en">
      <body>
        <ClientOnly>
          <ToasterProvider/>
          <SearchModal/>
          <RentModal/>
          <Navbar currentUser={currentUser}/>
          <LoginModal/>
          <RegisterModal/>
        </ClientOnly>
        <div className='pb-20 pt-28'>
          {children}
        </div>
        </body>
    </html>
  )
}
