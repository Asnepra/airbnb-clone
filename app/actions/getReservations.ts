import prisma from '@/app/libs/prismadb';

//This is to update the calendar after resevrations, and this is going to be used on many pages like My Trips form hamburger and others places

interface ReservationProps{
    listingId?:string;
    userId?:string;
    authorId?:string;
}

export default async function getReservations(
    params: ReservationProps
){

    try{
        const {
            listingId,
            userId,
            authorId
        } = params;

        //Query

        const query:any = {};

        //If there is listingId then update the query with listingId

        if(listingId)
        {
            query.listingId = listingId;//If ve are quering by listing Id then gonna query for all the Dates for this plarticular listing

        } 
        if(userId){
            query.userId =  userId;// if userId is passed then query for all the trips for this particular user

        } 
        if(authorId){
            query.listing = {userId: authorId}; //Used for quering by author that had made the resevrations
        }   
        //reservations fetch function according to the query
        const  reservations = await prisma.reservation.findMany({
            where:query,
            include:{
                listing:true,
            },
            orderBy:{
                createdAt:'desc'
            }
        }); 

        //Get the safeReservations

        const safeReservations= reservations.map((reservation) => ({
            ...reservation,
            createdAt:reservation.createdAt.toISOString(),
            startDate:reservation.startDate.toISOString(),
            endDate :reservation.endDate.toISOString(),
            listing:{
                ...reservation.listing,
                createdAt:reservation.listing.createdAt.toISOString()

            } 
        }));

        return safeReservations;
    }catch(error:any){
        throw new Error(error);
    }
}
