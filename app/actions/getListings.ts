
import prisma from '@/app/libs/prismadb'

export interface GetListingParamsProps{
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?:string;
    locationValue?: string;
    category?: string;

}
export default async function getListings(
    params:GetListingParamsProps
) {
    try{
        //Extract userId from the params
        const {userId, guestCount,roomCount,bathroomCount,startDate,endDate,locationValue,category} = params;

        //Use query to find the listings

        let query:any= {};
        if(userId){
            query.userId = userId;
        }
        if(category){
            query.category = category;
        }
        if(roomCount){
            query.roomCount = {
                gte: +roomCount, //Goint to transfor the string to number
            }
        }
        if(bathroomCount){
            query.bathroomCount = {
                gte: +bathroomCount,
            }
        }
        if(guestCount){
            query.guestCount = {
                gte: +guestCount,
            }
        }
        if(locationValue){
            query.locationValue = locationValue
        }
        //Add the date filter
        if(startDate && endDate){
            query.NOT={
                reservations:{
                    some:{
                        OR:[
                            {endDate :{gte: startDate},
                            startDate: {  lte: startDate}
                        },
                        {
                            startDate :{lte: endDate},
                            endDate: {  gte: endDate}
                        }
                        ]
                    }
                }
            }
        }
        //Fetch the listings from here, this is servercomponent, you can call database directly, so no need of api calls
        const listings = await prisma?.listing.findMany({
            where:  query,
            orderBy:{
                createdAt:'desc'
            }
        });
        const safeListings = listings.map((item:any)=>({
            ...item,
            createdAt: item.createdAt.toISOString(),
        }));
        return safeListings;
        
    }catch(error : any){
        throw new Error(error);
    }
}
