import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // <--- Tambahkan baris ini
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
};

export default nextConfig;