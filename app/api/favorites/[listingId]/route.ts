import { NextResponse } from "next/server";


import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { Prisma } from "@prisma/client";

interface IParams{
    listingId?: string;
}

export async function POST(
  request: Request, 
  {params}:{params: IParams}
) {
    const currentUser = await getCurrentUser();
    //If there is no current user then return the error
    if (!currentUser){
        return NextResponse.error();
    }
    //Extract the listing Id
    const {listingId} = params;
    //Check type of Listing Id

    if(!listingId || typeof listingId!=='string'){
        throw new Error ('Invalid Listing Id');
    }

    //Create favorite Listing Id array

    let favoriteListingIds = [...(currentUser.favoriteIds || [])];
    //Add the Favorite to the favoriteListingIds

    favoriteListingIds.push(listingId);

    //Update the user

    const   user = await prisma.user.update({
        where:{
            id: currentUser.id
        },
        data:{
            favoriteIds: favoriteListingIds
        }
    })

    return NextResponse.json(user);

}

//Delete the Favorite from the favoriteListingIds 

export async function DELETE(
    request: Request,
    {params} : {params: IParams}
){
    const currentUser = await getCurrentUser();
    //If there is no current user then return the error
    if (!currentUser){
        return NextResponse.error();
    }
    //Extract the listing Id for deletion
    const {listingId} = params;
    //Check type of Listing Id

    if(!listingId || typeof listingId!=='string'){
        throw new Error ('Invalid Listing Id');
    }

    //Create new favorite Listing Id array

    let favoriteListingIds = [...(currentUser.favoriteIds || [])];
    //Add the Favorite to the favoriteListingIds
 
    favoriteListingIds = favoriteListingIds.filter((id)=> id!==listingId);

    //Update the user

    const   user = await prisma.user.update({
        where:{
            id: currentUser.id
        },
        data:{
            favoriteIds: favoriteListingIds
        }
    })

    return NextResponse.json(user);

}
 