/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "blob.vercel-storage.com",
      "ocyqcbwvf3y0d9mm.public.blob.vercel-storage.com", // ✅ YOUR BLOB DOMAIN
    ],
  },
};

export default nextConfig;