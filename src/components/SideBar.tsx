import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import { ModeToggle } from "./Mode-Toggle";

export async function SideBar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <aside className="fixed top-0 left-0 h-full w-64 z-50 bg-white dark:bg-[#313338] border-r border-border flex flex-col">
      {/* Header Section */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <h1 className="text-foreground font-bold text-xl">Discord</h1>
        </div>
      </div>

      {/* Main Content - Grows to fill space */}
      <div className="flex-1 p-4">
        {/* You can add navigation items, channels, etc. here */}
        <div className="space-y-2">
          {/* Example navigation items */}

          <div className="space-y-1">

          </div>
        </div>
      </div>

      {/* Bottom Section - Authentication & Theme Toggle */}
      <div className="p-4 border-t border-border">
        <div className="space-y-3">
          {user ? (
            // User is authenticated
            <>
              <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
                <div className="flex items-center gap-2 flex-1">
                  {user.picture && (
                    <Image
                      src={user.picture}
                      alt="User avatar"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span className="text-foreground text-sm font-medium truncate">
                    {user.given_name || user.email}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <LogoutLink className="flex-1 bg-transparent text-foreground border border-border rounded px-3 py-2 text-sm font-medium hover:bg-muted transition-colors text-center">
                  Sign Out
                </LogoutLink>
                <ModeToggle />
              </div>
            </>
          ) : (
            // User is not authenticated
            <div className="space-y-2">
              <LoginLink className="w-full bg-transparent text-foreground border border-border rounded px-3 py-2 text-sm font-medium hover:bg-muted transition-colors text-center block">
                Sign In
              </LoginLink>
              <RegisterLink className="w-full bg-primary text-primary-foreground rounded px-3 py-2 text-sm font-medium hover:bg-primary/90 transition-colors text-center block">
                Sign Up
              </RegisterLink>
              <div className="flex justify-center pt-2">
                <ModeToggle />
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}