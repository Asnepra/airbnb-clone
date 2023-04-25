
import prisma from '@/app/libs/prismadb'

interface ListingParams{
    listingId?: string;

}

export default async function getListingById(
    params:ListingParams
) {
    try{
        //Fetch the listingId from the param from here, this is servercomponent, you can call database directly, so no need of api calls
        const {listingId} = params;
        const listings = await prisma.listing.findUnique({
            where:{
                id: listingId
            },
            include:{
                user: true //using this to load the user details that has created the listings
            }
        });
        //If there is no listings return null

        if(!listings){
            return null;
        }
        //Santizing the date objects, include previous data and for createdAt change to string

        return {
            ...listings,
            createdAt: listings.createdAt.toISOString(),
            user:{
                //Sanitizing the user createdAt, field
                ...listings.user,
                createdAt: listings.user.createdAt.toISOString(),
                updatedAt: listings.user.updatedAt.toISOString(),
                emailVerified: listings.user.emailVerified?.toISOString() || null,
                
            }
        }
        
    }catch(error : any){
        throw new Error(error);
    }
}
