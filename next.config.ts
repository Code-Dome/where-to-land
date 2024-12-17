import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        POSTHOG_API_KEY: process.env.POSTHOG_API_KEY,
    }
};

export default nextConfig;
