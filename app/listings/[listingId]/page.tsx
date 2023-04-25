/** I have created a listings folder having [listingsid] as the slug capture and inside that page.tsx that is going to display the details fo the lsitings based on the listing slug id */

/**Going to use the getListingsById from the app->actions->getListingsById. It is direct communication from server component to database */
/**Can not use hooks inside server component, but can access the parameters i.e. urls */

import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById'; 
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import React from 'react'
import ListingClient from './ListingClient';

interface listingPageProps{
    listingId?: string;
}

const ListingPage = async (
    {params}:{params:listingPageProps}
) => {
    const listings = await getListingById(params);
    const currentUser = await getCurrentUser();

    //There might be the case in which there is no listings for a id and might receive null in params So diplay empty state page
    if(!listings) {
        return (
            <ClientOnly>
                <EmptyState/>
            </ClientOnly>
        )
    }
  return (
    <ClientOnly>
        <ListingClient user={currentUser} listing={listings}/>
    </ClientOnly>
  )
}

export default ListingPage;