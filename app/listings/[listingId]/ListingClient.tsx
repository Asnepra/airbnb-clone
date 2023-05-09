'use client'
import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listingscard/ListingHead';
import ListingInformation from '@/app/components/listingscard/ListingInformation';
import ListingReservations from '@/app/components/listingscard/ListingReservations';
import { categories } from '@/app/components/navbar/Categories';
import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeListing, SafeUser } from '@/app/types';
import { Reservation } from '@prisma/client'
import axios from 'axios';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Range } from 'react-date-range';
import toast from 'react-hot-toast';

const initialDateRange={
    startDate: new Date(),
    endDate: new Date(),
    key:'selection'
}
interface ListingClientProps{
    reservations?:Reservation[];
    listing: SafeListing & {
        user: SafeUser;// Beacuse in actions-> getListingById ve are returning user along vith listings
    };
    user?: SafeUser | null;

}
const ListingClient:React.FC<ListingClientProps> = ({
    listing,
    user,
    reservations = []
}) => {
    //Login Modal going to be used if user try to resver the property

    const loginMoadl = useLoginModal();
    const router = useRouter();
    //dsibaled dates to use if property is already registered for that duration
    const disabledDates = useMemo(()=>{
        //check if the property has been resevered for a particular dates, if yes then diabled the date reange in calender.

        let dates:Date[] = [];//declaring empty dates array

        reservations.forEach((reservation)=>{
            const range = eachDayOfInterval({
                start:new Date(reservation.startDate),
                end:new Date(reservation.endDate)
            });
            dates = [...dates, ...range];//update the dates array

            return dates;

        })
    },[reservations])
    //Getting the data from the database to display, get the Icon as ve have defined the category in the navbar
    const category = useMemo(()=>{
        return categories.find((item)=>item.label ===listing.category);
    },[listing.category])

    //Function to create actual reservations

    const [isLoading, setIsLoading] = useState(false);

    const [totalPrice, setToatalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const onCreateReservations = useCallback(()=>{
        //If there is no current user, then loginModal
        if(!user){
            return loginMoadl.onOpen();
        }
        //setisLoading to true, as reservation process has begun
        setIsLoading(true);
        //Make post call to database

        axios.post('/api/reservations',{
            //Data to send to server
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId:listing?.id,
        }).then(()=>{
            toast.success("Congratulations You reservation is successfull");
            setDateRange(initialDateRange);
            //redirect the user to tips page
            router.refresh();
        }).catch(()=>{
            toast.error("Something went wrong, Try again");
        }).finally(()=>{
            setIsLoading(false);
        })
    },[totalPrice, dateRange,listing?.id, router,user, loginMoadl]);

    //Use effect for changing the total price of the property, depending on the number of days for the rent by change in the calender

    useEffect(()=>{
        if(dateRange.startDate && dateRange.endDate){
            //count the number of days for the guven range
            const daysCount = differenceInCalendarDays(dateRange.endDate,dateRange.startDate);
            if(daysCount && listing.price){
                setToatalPrice(daysCount*listing.price);

            }
            else{
                setToatalPrice(listing.price);
            }
        }

    },[dateRange, listing.price])
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
                <div className='p-4 order-first mb-10 md:order-last md:col-span-3'>
                    <ListingReservations price={listing.price} totalPrice={totalPrice}
                    onChangeDate = {(value)=>setDateRange(value)}
                    dateRange={dateRange}
                    onSubmit={onCreateReservations}
                    disabled ={isLoading}
                    disabledDates={disabledDates}/>
                </div>
            </div>
        </div>
    </Container>
  )
}

export default ListingClient