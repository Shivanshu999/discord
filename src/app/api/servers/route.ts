import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name, imageUrl } = await req.json();
    
    // Mock server creation for testing
    const mockServer = {
      id: "test-server-id",
      name,
      imageUrl,
      profileId: user.id,
      inviteCode: "test-invite-code",
      createdAt: new Date().toISOString(),
    };

    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(mockServer);
  } catch (error) {
    console.error("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}