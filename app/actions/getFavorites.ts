
import prisma from '@/app/libs/prismadb'
import getCurrentUser from './getCurrentUser';

export default async function getFavoriteListings() {
    try{
        const currentUser= getCurrentUser();
        if(!currentUser){
            return [];// return empty array as there are no favorites
        }
        //Fetch the Favoritelistings from here, this is servercomponent, you can call database directly, so no need of api calls
        const favorites = await prisma.listing.findMany({
            where:{
                id:{
                    in:[...(currentUser.favoriteIds || [])]
                }
            }
        });
        const safeFavorites = favorites.map((favorite)=>({
            ...favorite,
            createdAt: favorite.createdAt.toISOString(),
        }));

        return safeFavorites;
    }catch(error : any){
        throw new Error(error);
    }
}
