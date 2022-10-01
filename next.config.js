/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  i18n: {
    locales: ["en", "pt", "tl" /*"es", "cn"*/],
    defaultLocale: "en",
    localeDetection: false,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

const withTM = require("next-transpile-modules")([
  "@mui/material",
  "@mui/system",
]);

module.exports = withTM({
  ...nextConfig,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@mui/styled-engine": "@mui/styled-engine-sc",
    };

    return config;
  },
});
