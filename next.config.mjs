const nextConfig = {
    reactStrictMode: false,
    async headers() {
        return [
            {
                source: "/api/:path*", // Matching all API routes
                headers: [
                    { key: "Access-Control-Allow-Origin", value: "*" }, // Allow requests from all origins
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" }, // Allow these HTTP methods
                    { key: "Access-Control-Allow-Headers", value: "*" }, // Allow all headers
                ],
            },
            {
                source: "/api/special-data",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "false" },
                    { key: "Access-Control-Allow-Origin", value: "https://example.com" },
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date" },
                ],
            },
        ];
    },
};

export default nextConfig;
