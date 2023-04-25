'use client'
import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listingscard/ListingHead';
import ListingInformation from '@/app/components/listingscard/ListingInformation';
import { categories } from '@/app/components/navbar/Categories';
import { SafeListing, SafeUser } from '@/app/types';
import { Reservation } from '@prisma/client'
import React, { useMemo } from 'react'

interface ListingClientProps{
    reservations?:Reservation[];
    listing: SafeListing & {
        user: SafeUser;// Beacuse in actions-> getListingById ve are returning user along vith listings
    };
    user?: SafeUser | null;

}
const ListingClient:React.FC<ListingClientProps> = ({
    listing,
    user
}) => {
    //Getting the data from the database to display, get the Icon as ve have defined the category in the navbar
    const category = useMemo(()=>{
        return categories.find((item)=>item.label ===listing.category);
    },[listing.category])
  return (
    <Container>
        <div className='max-w-screen-lg mx-auto'>
            <div className='flex flex-col gap-6'>
                <ListingHead title={listing.title}
                imageSrc={listing.imageSrc}
                locationValue={listing.locationValue}
                id={listing.id}
                 currentUser={user}/>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10'>
                <ListingInformation user={listing.user}
                category={category}
                description = {listing.description}
                roomCount={listing.roomCount}
                guestCount={listing.guestCount}
                bathroomCount={listing.bathroomCount}
                locationValue={listing.locationValue}/>
            </div>
        </div>
    </Container>
  )
}

export default ListingClient