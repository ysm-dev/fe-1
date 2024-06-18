import type { NextConfig } from "next"

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: `avatars.githubusercontent.com`,
      },
      {
        hostname: `picsum.photos`,
      },
    ],
  },
  compiler: {
    // removeConsole: true,
  },
}

export default config
