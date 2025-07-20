import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { db } from "./db";

export const currentProfile = async () => {
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if(!user || !user.id){
        return null;
    } 

    const profile = await db.profile.findUnique({
        where: {
            userId: user.id
        }
})

return profile
}