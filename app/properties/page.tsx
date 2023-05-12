import React from 'react'
import getCurrentUser from '../actions/getCurrentUser';
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import TripsClient from './PropertyClient';
import getListings from '../actions/getListings';
import PropertyClient from './PropertyClient';

const Propertiespage = async () => {
    const currentUser= await getCurrentUser();

    if(!currentUser){
        return (
        <ClientOnly>
            <EmptyState title='Unauthorised Access'
            subtitle='Please Login'></EmptyState>
        </ClientOnly>
        )
    }

    const listings = await getListings({userId: currentUser.id});

    //If this user has not made any reservations, handle here
    if(listings.length ===0){
        return(
            <ClientOnly>
                <EmptyState title='No Properties found'
                subtitle='Looks like you have no Properties'></EmptyState>
            </ClientOnly>
        )
    }
    //If there are trips just display them here
  return (
    <ClientOnly>
        <PropertyClient
        listing={listings}
        currentUser={currentUser}/>
    </ClientOnly>
  )
}

export default Propertiespage;