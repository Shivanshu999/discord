import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NavigationAction } from "./navigation-action";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import NavigationItem from "./navigation-item";
import { ModeToggle } from "../Mode-Toggle";
import Image from "next/image";
import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const NavigationSidebar = async () => {
      const { getUser } = getKindeServerSession();
  const user = await getUser();

    const profile = await currentProfile()

    if(!profile){
        return redirect("/")
    }

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })
  return <div className="flex flex-col justify-between h-full w-full bg-[#E3E5E8] dark:bg-[#1E1F22] text-primary py-3">

  {/* Top: Nav actions + servers */}
  <div className="space-y-4 flex flex-col items-center w-full">
    <NavigationAction />
    <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
    <ScrollArea className="w-full">
      {servers.map((server) => (
        <div key={server.id} className="mb-4">
          <NavigationItem
            id={server.id}
            name={server.name}
            imageUrl={server.imageUrl}
          />
        </div>
      ))}
    </ScrollArea>
  </div>

  {/* Bottom: pinned theme toggle + profile/auth */}
  <div className="flex flex-col items-center gap-y-4 p-4 w-full">
  <ModeToggle />

  {user ? (
    <LogoutLink>
      {user.picture ? (
        <Image
          src={user.picture}
          alt="User avatar"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover cursor-pointer hover:opacity-80 transition"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm text-foreground">
          U
        </div>
      )}
    </LogoutLink>
  ) : (
    <div className="flex flex-col gap-y-2 w-full">
      <LoginLink className="w-full bg-transparent text-foreground border border-border rounded px-3 py-2 text-sm font-medium hover:bg-muted transition-colors text-center block">
        Sign In
      </LoginLink>
      <RegisterLink className="w-full bg-primary text-primary-foreground rounded px-3 py-2 text-sm font-medium hover:bg-primary/90 transition-colors text-center block">
        Sign Up
      </RegisterLink>
    </div>
  )}
</div>

</div>
};

export default NavigationSidebar;
