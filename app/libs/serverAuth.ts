import prisma from "@/app/libs/prismadb"
import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

const serverAuth =async (req:NextApiRequest) => {
    const session = await getSession({req});
    if (!session?.user?.email) {
        console.log("Session User not logged in");
        throw new Error("Not logged in");
    }

    const currentUser = await prisma.user.findUnique({
        where:{
            email: session.user.email
        }
    })

    if(!currentUser) {
        console.log("User not found");
        throw new Error("User not found");
    }

    return {currentUser}; 
}

export default serverAuth;