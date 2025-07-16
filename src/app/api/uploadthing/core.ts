import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = async () => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      throw new UploadThingError("Unauthorized");
    }

    return { userId: user.id };
  } catch {
    throw new UploadThingError("Authentication failed");
  }
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
        .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
    }),
  messageFile: f(["image", "pdf"])
    .middleware(() => handleAuth())
        .onUploadComplete(async ({file }) => {
      // Handle file processing here
      console.log("Message file uploaded:", file.name);
    }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
