
import { NextResponse } from "next/server";


import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";


export async function POST (
    request : Request,
){
    const currentUser = await getCurrentUser();
     //If there is no current user then return the error
     if (!currentUser){
        return NextResponse.error();
    }

    //Get the body of the request
    const body = await request.json();
    //Extract the values from the   body
    const{
        listingId,
        startDate,
        endDate,
        totalPrice
    } = body;
    //If there is no listingId or no startDate or endDate then return error
    if(!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
    }
    //create a new listing reservation for the user
    

    const listingAndReservation = await prisma.listing.update({
        where : {
            id: listingId
        },
        data : {
            reservations:{
                create:{
                    userId: currentUser.id,
                     startDate,
                     endDate,
                     totalPrice
                }
            }
        }
    });

    return NextResponse.json(listingAndReservation);
}


