
import { NextResponse } from "next/server";


import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface ReservationIdProps{
    reservationId?: string;
}
export async function DELETE (
    request : Request,
    {params}: {params: ReservationIdProps}
){
    const currentUser = await getCurrentUser();
     //If there is no current user then return the error
     if (!currentUser){
        return NextResponse.error();
    }


    //Extract the values from the   body
    const{
        reservationId
    } = params;
    //If there is no listingId or no startDate or endDate then return error
    if(!reservationId || typeof reservationId !=="string") {
    throw new Error("Invalid reservation ID");
    }
    //create a new listing reservation for the user
    

    const deleteReservation = await prisma.reservation.deleteMany({
        //Make sure that only the user that has made the reservations or the creator of the listing basically ovner of the property
        where : {
            id: reservationId,
            OR:[
                {userId:currentUser.id},
                {listing:{
                    userId:currentUser.id
                }}
            ]
        }
    });

    return NextResponse.json(deleteReservation);
}


