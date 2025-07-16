import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import { db } from "./db"

export const initialProfile = async () => {
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if(!user || !user.id ){
        return redirect('/')
    } 
    const profile = await db.profile.findUnique({
            where: {
                userId: user.id
            }
    })

    if(profile){
        return profile
    }

    const newProfile = await db.profile.create({
        data: {
            userId: user.id,
            name: `${user.given_name || ''} ${user.family_name || ''}`.trim() || user.email || 'Unknown User',
            imageUrl: user.picture || '',
            email: user.email || ''

        }


    })
    console.log("Running initialProfile...")
    console.log("User from Kinde:", user)
        return newProfile
}