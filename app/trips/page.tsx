import React from 'react'
import getCurrentUser from '../actions/getCurrentUser';
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import getReservations from '../actions/getReservations';
import TripsClient from './TripsClient';

const Tripspage = async () => {
    const currentUser= await getCurrentUser();

    if(!currentUser){
        return (
        <ClientOnly>
            <EmptyState title='Unauthorised Access'
            subtitle='Please Login'></EmptyState>
        </ClientOnly>
        )
    }

    const reservation = await getReservations({userId: currentUser.id});

    //If this user has not made any reservations, handle here
    if(reservation.length ===0){
        return(
            <ClientOnly>
                <EmptyState title='There is no Trips found'
                subtitle='Looks like you have not made any reservations'></EmptyState>
            </ClientOnly>
        )
    }
    //If there are trips just display them here
  return (
    <ClientOnly>
        <TripsClient reservation={reservation}
        currentUser={currentUser}></TripsClient>
    </ClientOnly>
  )
}

export default Tripspage;