'use client'
import React from 'react'
import ClientOnly from '../components/ClientOnly'
import EmptyState from '../components/EmptyState'
import getFavoriteListings from '../actions/getFavorites'
import getCurrentUser from '../actions/getCurrentUser'
import ClientFavorite from './ClientFavorite'

const Favoritespage = async() => {
    const favoriteListings = await getFavoriteListings();
    const currentUser = await getCurrentUser();
    if(favoriteListings.length=== 0){
        return (
            <ClientOnly>
                <EmptyState title='No Favorites Found'
                subtitle='Looks like you have no Favorite Listings'></EmptyState>
            </ClientOnly>
        )
    }
    return (<ClientOnly>
        <ClientFavorite listings={favoriteListings}
        currentUser={currentUser}></ClientFavorite>
    </ClientOnly>)
}

export default Favoritespage