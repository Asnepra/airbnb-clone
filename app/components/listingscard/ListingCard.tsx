
'use client'
import useCountrySelectProperty from '@/app/hooks/useCountrySelectProperty';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import { Listing, Reservation } from '@prisma/client'
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react'
import HeartButton from '../HeartButton';
import Button from '../Button';

//Gonna be used in fvorites, reservations, properties and trips from userMenu
interface ListingCardProps{
    //Listing data from prisma

    data:SafeListing;
    reservations?:SafeReservation;// Optional reservations data from prisma
    onAction?: (id:string) => void;// Optional function onAction that takes id as string and returns void
    disabled?: boolean;
    actionLabel?:string;
    actionId?:string;
    currentUser?:SafeUser |null;



}
const ListingCard:React.FC<ListingCardProps> = ({
    data,
    reservations,
    onAction,
    disabled,
    actionLabel,
    actionId="",
    currentUser
}) => {
    const router = useRouter();
    const {getByValue} = useCountrySelectProperty();
    //Since ve have saved only location and not lat and longs
    const location = getByValue(data.locationValue);

    //Since this is going to be used for making reservations and cancellating, so handle those cases too

    const handleCancelled = useCallback(
        //Setting an event that is type of React.MouseEvent that access HTMLButtonElement
    (event: React.MouseEvent<HTMLButtonElement>) =>{
        event.stopPropagation();
        //if current Card is disabled then just break and return from the function

        if(disabled) return;

        //if no then execute onAction

        onAction?.(actionId);
    },[onAction,disabled,actionId]);

    //Function for price
    const priceFunction= useMemo(()=>{
        //IF there is reservation then return the reservation price
        if(reservations){
            return reservations.totalPrice;
        }

        return data.price;
    },[reservations,data.price]);

    //For displaying the to and from date.
    const reservationsDate = useMemo(()=>{
        if(!reservations){
            return null;
        }
        const startDate = new Date(reservations.startDate);
        const endDate = new Date(reservations.endDate);
        return `${
            format(startDate,'PP')} - ${format(endDate,'PP')
        }`
    },[reservations]); 


  return (
    <div onClick={()=> router.push(`/listings/${data.id}`)} className='col-span-1 cursor-pointer group'>
        <div className='flex flex-col gap-2 w-full'>
            <div className='aspect-square w-full relative overflow-hidden rounded-xl'>
                <Image fill src={data.imageSrc} alt={data.title}
                className='object-cover h-full w-full group-hover:scale-110 transition'/>
                {/**Adding heart icon on top right of the image */}
                <div className='absolute top-3 right-3'>
                    <HeartButton listingId={data.id}
                    currentUser={currentUser}/>
                </div>
            </div>
            <div className='font-semibold text-base md:text-lg'>
                {location?.label},  {location?.region}
            </div>
            <div className='font-light text-slate-800 text-base md:text-lg'>
               Category -  {reservationsDate || data.category}
            </div>
            <div className='flex flex-row items-center gap-1 text-base md:text-lg'>
               <div className='font-semibold'>
                ${priceFunction}
               </div>
               {/**Conditionalm it is not visible if already booked */}
               {!reservations && (
                <div className='font-light'>
                    /night
                </div>
               )}
            </div>
            {/**Conditional Action label */}
            {onAction && actionLabel &&(
                <Button disabled={disabled}
                small label={actionLabel} 
                onClick={handleCancelled}></Button>
            )}
        </div>
    </div>
  )
}

export default ListingCard