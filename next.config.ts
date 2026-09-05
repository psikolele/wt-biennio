import type { NextConfig } from "next";

const cdnBase = process.env.NEXT_PUBLIC_RESOURCES_BASE_URL;

const nextConfig: NextConfig = {
  async redirects() {
    if (!cdnBase) return [];
    return [
      {
        source: "/resources/:year/settimana-:week/:filename",
        destination: `${cdnBase}/:filename`,
        permanent: false,
      },
      {
        source: "/resources/docenti/:filename",
        destination: `${cdnBase}/:filename`,
        permanent: false,
      },
      {
        source: "/slides/:anno/:filename",
        destination: `${cdnBase}/:filename`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

