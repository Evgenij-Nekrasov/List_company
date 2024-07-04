/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "res.cloudinary.com",
            port: "",
            pathname:
               "/speedwares/image/upload/v1659284687/windframe-logo-main_daes7r.png",
         },
         {
            protocol: "https",
            hostname: "static01.nyt.com",
            port: "",
            pathname:
               "/images/2019/11/08/world/08quebec/08quebec-superJumbo.jpg",
         },
      ],
   },
};

export default nextConfig;
