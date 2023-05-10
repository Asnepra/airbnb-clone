'use client'
import React, { useCallback, useState } from 'react'
import { SafeReservation, SafeUser } from '../types'
import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listingscard/ListingCard';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';

interface TripsClientProps{
 reservation: SafeReservation[];
 currentUser?:SafeUser | null;
}
const TripsClient:React.FC<TripsClientProps> = ({
    reservation,
    currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');
  const onCancel = useCallback((id:string) => {
    setDeletingId(id);
    axios.delete(`/api/reservations/${id}`).then(() => {
      toast.success("Reservations cancelled successfully");
      router.refresh();
    }).catch ( (error) => {
      toast.error("Something went wrong, Try again later,");
    }).finally(()=>{
      setDeletingId("");
    });
  },[router]);
  return (
    <Container>
      <Heading title='Trips'
      subtitle='Your destinations'></Heading>
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-8'>
        {reservation.map(reservation=>(
          <ListingCard key={reservation.id}
          data={reservation.listing}
          reservations={reservation}
          actionId={reservation.id}
          onAction={onCancel}
          disabled={deletingId === reservation.id}
          actionLabel="Cancel Reservation"
          currentUser={currentUser}></ListingCard>
        ))
      }
      </div>
    </Container>
  )
}

export default TripsClient