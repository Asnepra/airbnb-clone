import { NextResponse } from "next/server";


import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface listingProps{
    listingId?: string;
}
export async function DELETE(
  request: Request, 
  {params}: {params:listingProps}
) {
    const currentUser = await getCurrentUser();
    //If there is no current user then return the error
    if (!currentUser){
        return NextResponse.error();
    }
    //Extract the body
    const {listingId} = params;
    if(!listingId || typeof listingId!=='string'){
        throw new Error("Invalid listing ID provided");
    }
   //Only the user of the lsiting is able to delete its properties
    const listings = await prisma.listing.deleteMany({
        where:{
            id: listingId,
            userId: currentUser.id
        }
    });

    return NextResponse.json(listings);

}
