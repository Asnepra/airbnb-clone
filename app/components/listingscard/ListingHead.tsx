import useCountrySelectProperty from '@/app/hooks/useCountrySelectProperty';
import { SafeUser } from '@/app/types';
import React from 'react'
import Heading from '../Heading';
import Image from 'next/image';
import HeartButton from '../HeartButton';

interface ListingHeadProps{
    title: string;
    imageSrc: string;
    locationValue:string;
    id:string;
    currentUser?:SafeUser | null;
}
const ListingHead:React.FC<ListingHeadProps> = ({
    title,
    imageSrc,
    locationValue,
    id,
    currentUser
}) => {
    //get full location using the location value
    const {getByValue} = useCountrySelectProperty();
    const fullLocation =getByValue(locationValue);
  return (
    <>
    <Heading title={title} subtitle={` ${fullLocation?.region}, ${fullLocation?.label}`}/>
    <div className='h-[60vh] w-full overflow-hidden rounded-xl relative'>
        <Image src={imageSrc} alt={title} fill className='object-cover w-full'/>
        <div className='absolute top-4 right-5 '>
            <HeartButton listingId={id} currentUser={currentUser}/>
        </div>
    </div>
    </>
  )
}

export default ListingHead