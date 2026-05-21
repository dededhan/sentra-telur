import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
    // Menghindari error pooler Supabase (EMAXCONNSESSION) saat static prerender
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
