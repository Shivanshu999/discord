import InitialModal from "@/components/modals/initial-modal"
import { db } from "@/lib/db"
import { initialProfile } from "@/lib/initial-Profile"
import { redirect } from "next/navigation"

export const SetupPage = async ()=> {
    const profile = await initialProfile()

    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if(server){
        redirect(`/servers/${server.id}`)
    }
    console.log('setup page also')
    return <InitialModal />
}