'use client'
import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import getReservations from '../actions/getReservations';
import ReservationsClient from './ReservationsClient';


const MyReservationsPage = async () => {
    const currentUser= getCurrentUser();
    if(!currentUser){
        return (
        <ClientOnly>
            <EmptyState title='Unauthorised Access'
            subtitle='Please Login'></EmptyState>
        </ClientOnly>
        )
    } 
    //To display all the reservations from other people on my property
    const allReservations = await getReservations({
        authorId: currentUser.id
    });

    if(allReservations.length === 0){
        if(!currentUser){
            return (
            <ClientOnly>
                <EmptyState title='No Reservations Found'
                subtitle='Looks like there are no Reservations on your property'></EmptyState>
            </ClientOnly>
            )
        }        
    }
  return (
    <ClientOnly>
        <ReservationsClient reservations={allReservations}
        currentUser={currentUser}/>
    </ClientOnly>
  )
}

export default MyReservationsPage