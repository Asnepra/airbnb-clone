import Image from 'next/image'
import { Inter } from 'next/font/google'
import Container from './components/Container'
import ClientOnly from './components/ClientOnly'
import { is } from 'date-fns/locale'
import EmptyState from './components/EmptyState'
import getListings from './actions/getListings'
import ListingCard from './components/listingscard/ListingCard'
import getCurrentUser from './actions/getCurrentUser'

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
  //get listings data

  const listings =  await getListings();
  //Get current user for custom listings are available according to the user

  const currentUser = await getCurrentUser();
  //Not gonna show the error even if the user is loogged in or not as other users can see the property that are available for rent.
  //if there is no listing that meets the user filter and user requirement present vith empty state
  if(listings.length === 0){
    <ClientOnly>
      <EmptyState showReset/>
    </ClientOnly>

  }
  return (
    <ClientOnly>
      <Container>
        <div className='pt-24 grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-8'>
          {listings.map((item)=>{
            return (
              <ListingCard currentUser={currentUser} key={item.id}
              data={item}/>
            )
          })}
        </div>
        
      </Container>
    </ClientOnly>
  )
}





/**
 * Beautiful gloving background
 * <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
 */