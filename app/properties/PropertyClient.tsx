'use client'
import React, { useCallback, useState } from 'react'
import { SafeListing, SafeUser } from '../types'
import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listingscard/ListingCard';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';

interface PropertyClientProps{
 listing: SafeListing[];
 currentUser?:SafeUser | null;
}
const PropertyClient:React.FC<PropertyClientProps> = ({
    listing,
    currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');
  const onCancel = useCallback((id:string) => {
    setDeletingId(id);
    axios.delete(`/api/listings/${id}`).then(() => {
      toast.success("Listigs Deleted Successfully");
      router.refresh();
    }).catch ( (error) => {
      toast.error("Something went wrong, Try again later,");
    }).finally(()=>{
      setDeletingId("");
    });
  },[router]);
  return (
    <Container>
      <Heading title='Properties'
      subtitle='List of Yoou Properties'></Heading>
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-8'>
        {listing.map(listingItem=>(
          <ListingCard key={listingItem.id}
          data={listingItem}
          actionId={listingItem.id}
          onAction={onCancel}
          disabled={deletingId === listingItem.id}
          actionLabel="Delete Property"
          currentUser={currentUser}></ListingCard>
        ))
      }
      </div>
    </Container>
  )
}

export default PropertyClient