'use client'
import useCountrySelectProperty from '@/app/hooks/useCountrySelectProperty';
import { SafeUser } from '@/app/types'
import React from 'react'
import { IconType } from 'react-icons';
import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';
import dynamic from 'next/dynamic';
import MapPropertylocation from '../MapPropertylocation';

//Importing Map

const Map = dynamic(()=>import('../MapPropertylocation'),{
    ssr:false
});

interface ListingInformationProps{
    user:SafeUser;
    description:string;
    guestCount:number;
    roomCount:number;
    bathroomCount:number;
    category:{
        icon:IconType;
        label:string;
        description:string;
    } | undefined;

    locationValue:string;
}

const ListingInformation:React.FC<ListingInformationProps> = ({
    user,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    category,
    locationValue
}) => {
    const {getByValue} = useCountrySelectProperty();
    //get the coordinates of the location
    const coordinates = getByValue(locationValue)?.latlng;
  return (
    
    <div className='p-2 col-span-4 flex flex-col gap-8'>
        <div className='flex flex-col gap-2 '>
            <div className=' text-xl font-semibold flex flex-row items-center gap-2'>
                <div >
                    Posted By {user?.name}
                </div>
                <Avatar avatarImageUrl={user?.image}/>
            </div>
            <div className='flex flex-row items-center gap-2 font-light text-slate-700'>
                <div> {guestCount} Guests</div>
                <div> {roomCount} Rooms</div>
                <div> {bathroomCount} Bathrooms</div>
            </div>
        </div>
        <hr/>
        {category && (
            <ListingCategory icon={category.icon}
            label={category.label}
            description={category.description} />
        )}
        <hr/>
        <div className='text-lg font-light text-slate-700 '>
            {/**This is property descritpiton */}
            {description}
            
        </div>
        <MapPropertylocation center={coordinates}/>
    </div>
  )
}


export default ListingInformation