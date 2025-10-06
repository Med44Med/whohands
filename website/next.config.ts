import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "local-origin.dev",
    "192.168.1.22",
    "127.0.0.1"
  ],
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
