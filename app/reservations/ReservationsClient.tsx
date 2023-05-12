'use client'
import React, { useCallback, useState } from 'react'
import { SafeReservation, SafeUser } from '../types'
import Container from '../components/Container';
import Heading from '../components/Heading';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import ListingCard from '../components/listingscard/ListingCard';

interface MyReservationsClientPageProps{
    reservations:SafeReservation[];
    currentUser?:SafeUser | null;
}
const ReservationsClient:React.FC<MyReservationsClientPageProps> = ({
  reservations,
  currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback((id:string) =>{
    setDeletingId(id);
    axios.delete(`/api/reservations/${id}`).then(() =>{
      toast.success("Reservations cancelled successfully");
      router.refresh(); 
    }).catch(() => {
      toast.error("Something   went wrong, Try again later");
      router.refresh();
     }).finally(() => {
      setDeletingId("");
     });
  },[router]);

  return (
    <Container>
        <Heading title='Reservations'
        subtitle='Bookings on your properties'/>
        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {reservations.map(reservation=>(
          <ListingCard key={reservation.id}
          data={reservation.listing}
          reservations={reservation}
          actionId={reservation.id}
          onAction={onCancel}
          disabled={deletingId === reservation.id}
          actionLabel="Cancel Guest Reservation"
          currentUser={currentUser}></ListingCard>
            ))
          }
          </div>
    </Container>
  )
}

export default ReservationsClient;