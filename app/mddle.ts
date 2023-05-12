
export {default} from "next-auth/middleware"

export const config = {
    //Protect all routes

    matcher:[
        "/trips",
        "/reservations",
        "/properties",
        "/favorites"
    ]
}