import { LoginLink, RegisterLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function Header() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#2f3136] border-b border-[#202225] px-4 py-2">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <h1 className="text-white font-bold text-xl">Discord</h1>
        </div>
        
        <div className="flex items-center gap-3">
          {user ? (
            // User is authenticated
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {user.picture && (
                  <img 
                    src={user.picture} 
                    alt="User avatar" 
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="text-white text-sm font-medium">
                  {user.given_name || user.email}
                </span>
              </div>
              <LogoutLink className="bg-transparent text-white border border-[#4f545c] rounded px-4 py-2 text-sm font-medium hover:bg-[#4f545c] transition-colors">
                Sign Out
              </LogoutLink>
            </div>
          ) : (
            // User is not authenticated
            <>
              <LoginLink className="bg-transparent text-white border border-[#4f545c] rounded px-4 py-2 text-sm font-medium hover:bg-[#4f545c] transition-colors">
                Sign In
              </LoginLink>
              <RegisterLink className="bg-[#5865f2] text-white rounded px-4 py-2 text-sm font-medium hover:bg-[#4752c4] transition-colors">
                Sign Up
              </RegisterLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}