import type { NextConfig } from "next"

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: `avatars.githubusercontent.com`,
      },
    ],
  },
  compiler: {
    // removeConsole: true,
  },
}

export default config
